import React, { useState, useRef, useEffect } from 'react';

const DrawShapeGame = () => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [drawingPath, setDrawingPath] = useState(new Path2D());
    const [targetPath, setTargetPath] = useState(new Path2D());
    const [startTime, setStartTime] = useState(0);
    const [timeTaken, setTimeTaken] = useState(0);
    const [similarityScore, setSimilarityScore] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const shapePath = new Path2D();
        shapePath.rect(300, 150, 200, 300); // (x, y, width, height)


        setTargetPath(shapePath);

        const handleMouseDown = () => {
            setIsDrawing(true);
            setDrawingPath(new Path2D());
            setStartTime(performance.now());
            setSimilarityScore(0);
            context.clearRect(0, 0, canvas.width, canvas.height);
        };

        const handleMouseUp = () => {
            setIsDrawing(false);
            calculateSimilarityScore();
        };

        const handleMouseMove = (event) => {
            if (!isDrawing) return;

            const currentTime = performance.now();
            setTimeTaken(currentTime - startTime);

            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const newPath = new Path2D(drawingPath);
            newPath.lineTo(x, y);
            setDrawingPath(newPath);

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.stroke(targetPath);
            context.stroke(newPath);
        };

        context.stroke(targetPath);

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('mousemove', handleMouseMove);

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isDrawing, drawingPath, startTime, targetPath]);

    const calculateSimilarityScore = () => {
        const drawingPathBounds = calculatePathBounds(drawingPath);
        const targetPathBounds = calculatePathBounds(targetPath);

        const intersectionRect = new Path2D();
        intersectionRect.rect(
            Math.max(drawingPathBounds.x, targetPathBounds.x),
            Math.max(drawingPathBounds.y, targetPathBounds.y),
            Math.min(drawingPathBounds.width, targetPathBounds.width),
            Math.min(drawingPathBounds.height, targetPathBounds.height)
        );

        const intersectionArea = calculatePathArea(intersectionRect);
        const drawingArea = calculatePathArea(drawingPath);

        const similarity = intersectionArea / drawingArea;
        setSimilarityScore(similarity * 100); // Convert to percentage
    };


    const calculatePathBounds = (path) => {
        const commands = path.toString().split(/[A-Za-z]/);
        const xValues = [];
        const yValues = [];

        for (let command of commands) {
            const coordinates = command.split(',').map(parseFloat);
            for (let i = 0; i < coordinates.length; i += 2) {
                xValues.push(coordinates[i]);
                yValues.push(coordinates[i + 1]);
            }
        }

        const minX = Math.min(...xValues);
        const minY = Math.min(...yValues);
        const maxX = Math.max(...xValues);
        const maxY = Math.max(...yValues);

        return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
    };

    const calculatePathArea = (path) => {
        const context = canvasRef.current.getContext('2d');
        context.save();
        context.fillStyle = 'red'; // Choose a color to fill the path
        context.fill(path);

        const imageData = context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
        let filledPixels = 0;
        for (let i = 0; i < imageData.data.length; i += 4) {
            if (imageData.data[i] !== 0) {
                filledPixels++;
            }
        }

        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        context.restore();

        return filledPixels;
    };

    return (
        <div>
            <canvas
                ref={canvasRef}
                width={800}
                height={600}
                style={{ border: '1px solid black', cursor: 'crosshair' }}
            />
            <p>Time Taken: {(timeTaken / 1000).toFixed(2)} seconds</p>
            <p>Similarity Score: {similarityScore.toFixed(2)}%</p>
        </div>
    );
};

export default DrawShapeGame;
