import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SredniaForm = () => {
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    const [selectedOption, setSelectedOption] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleDropdownChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleStartTimeChange = (event) => {
        setStartTime(event.target.value);
    };

    const handleEndTimeChange = (event) => {
        setEndTime(event.target.value);
    };

    const handleButtonClick = () => {
        // Add logic to determine the route based on the selected option
        switch (selectedOption) {
            case 'Test Zwinności':
                navigate(`/średniaClick?startTime=${startTime}&endTime=${endTime}&collectionName=CircleClickerTest`);
                break;
            case 'Test Stroopa':
                navigate(`/średniaStroop?startTime=${startTime}&endTime=${endTime}&collectionName=scoresStroopTest`);
                break;
            case 'Test Reitana':
                navigate(`/średniaReitan?startTime=${startTime}&endTime=${endTime}&collectionName=ReitanTest`);
                break;
            case 'Test Zmiennej Ścieżki':
                navigate(`/średniaSwitch?startTime=${startTime}&endTime=${endTime}&collectionName=SwitchTrailTest`);
                break;
            case 'Test szyfrowania (łatwy)':
                navigate(`/średniaSUB10?startTime=${startTime}&endTime=${endTime}&collectionName=DigitalSub10`);
                break;
            case 'Test szyfrowania (średni)':
                navigate(`/średniaSUB20?startTime=${startTime}&endTime=${endTime}&collectionName=DigitalSub20`);
                break;
            case 'Test szyfrowania (trudny)':
                navigate(`/średniaSUB30?startTime=${startTime}&endTime=${endTime}&collectionName=DigitalSub30`);
                break;
            case 'Test anulowania liter (łatwy) (czas)':
                navigate(`/średniaLCT5?startTime=${startTime}&endTime=${endTime}&collectionName=LetterCancel5Score`);
                break;
            case 'Test anulowania liter (średni) (czas)':
                navigate(`/średniaLCT8?startTime=${startTime}&endTime=${endTime}&collectionName=LetterCancel8Score`);
                break;
            case 'Test anulowania liter (trudny) (czas)':
                navigate(`/średniaLCT10?startTime=${startTime}&endTime=${endTime}&collectionName=LetterCancel10Score`);
                break;
            case 'Test Skanu pamięci (łatwy)':
                navigate(`/średniaMS4?startTime=${startTime}&endTime=${endTime}&collectionName=MemoryScan4`);
                break;
            case 'Test Skanu pamięci (średni)':
                navigate(`/średniaMS6?startTime=${startTime}&endTime=${endTime}&collectionName=MemoryScan6`);
                break;
            case 'Test Skanu pamięci (trudny)':
                navigate(`/średniaMS10?startTime=${startTime}&endTime=${endTime}&collectionName=MemoryScan10`);
                break;
            case 'Test anulowania liter (łatwy) (punkty)':
                navigate(`/średniaLCS5?startTime=${startTime}&endTime=${endTime}&collectionName=LetterCancel5Score`);
                break;
            case 'Test anulowania liter (średni) (punkty)':
                navigate(`/średniaLCS8?startTime=${startTime}&endTime=${endTime}&collectionName=LetterCancel8Score`);
                break;
            case 'Test anulowania liter (trudny) (punkty)':
                navigate(`/średniaLCS10?startTime=${startTime}&endTime=${endTime}&collectionName=LetterCancel10Score`);
                break;
            case 'Test anulowania liter (łatwy) (złożenie)':
                navigate(`/średniaLCB5?startTime=${startTime}&endTime=${endTime}&collectionName=LetterCancel5Score`);
                break;
            case 'Test anulowania liter (średni) (złożenie)':
                navigate(`/średniaLCB8?startTime=${startTime}&endTime=${endTime}&collectionName=LetterCancel8Score`);
                break;
            case 'Test anulowania liter (trudny) (złożenie)':
                navigate(`/średniaLCB10?startTime=${startTime}&endTime=${endTime}&collectionName=LetterCancel10Score`);
                break;
            default:
                toast.error('Wybierz jeden z wyborów');
        }
    };

    const dropdownOptions = [
        'Test Zwinności',
        'Test Stroopa',
        'Test Reitana',
        'Test Zmiennej Ścieżki',
        'Test Skanu pamięci (łatwy)',
        'Test Skanu pamięci (średni)',
        'Test Skanu pamięci (trudny)',
        'Test szyfrowania (łatwy)',
        'Test szyfrowania (średni)',
        'Test szyfrowania (trudny)',
        'Test anulowania liter (łatwy) (punkty)',
        'Test anulowania liter (średni) (punkty)',
        'Test anulowania liter (trudny) (punkty)',
        'Test anulowania liter (łatwy) (czas)',
        'Test anulowania liter (średni) (czas)',
        'Test anulowania liter (trudny) (czas)',
        'Test anulowania liter (łatwy) (złożenie)',
        'Test anulowania liter (średni) (złożenie)',
        'Test anulowania liter (trudny) (złożenie)',
    ];

    return (
        <form>
            <div>
                <label>
                    Select an option:
                    <select value={selectedOption} onChange={handleDropdownChange}>
                        <option value="">Select an option</option>
                        {dropdownOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div>
                <label>
                    Select start time:
                    <input type="datetime-local" value={startTime} onChange={handleStartTimeChange} />
                </label>
            </div>

            <div>
                <label>
                    Select end time:
                    <input type="datetime-local" value={endTime} onChange={handleEndTimeChange} />
                </label>
            </div>

            <div>
                {/* Use a button and handle navigation on button click */}
                <button type="button" onClick={handleButtonClick}>
                    Submit
                </button>
            </div>
        </form>
    );
};

export default SredniaForm;
