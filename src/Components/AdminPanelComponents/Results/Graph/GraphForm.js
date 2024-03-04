import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const GraphForm = () => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleDropdownChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleLinkClick = () => {
        // Add logic to determine the route based on the selected option
        switch (selectedOption) {
            case 'Test Zwinności':
                return '/ClickTestGraph';
            case 'Test Stroopa':
                return '/StroopTestGraph';
            case 'Test Reitana':
                return "/ReitanTestGraph"
            case 'Test Zmiennej Ścieżki':
                return "/SwitchTestGraph";
            case 'Test Skanu pamięci (łatwy)':
                return "/MS4Graph";
            case 'Test Skanu pamięci (średni)':
                return "/MS6Graph";
            case 'Test Skanu pamięci (trudny)':
                return "/MS10Graph";
            case 'Test szyfrowania (łatwy)':
                return "/SUB10Graph";
            case 'Test szyfrowania (średni)':
                return "/SUB20Graph";
            case 'Test szyfrowania (trudny)':
                return "/SUB30Graph";
            case 'Test anulowania liter (łatwy) (punkty)':
                return "/LC5SGraph";
            case 'Test anulowania liter (łatwy) (czas)':
                return "/LC5TGraph";
            case 'Test anulowania liter (łatwy) (złożenie)':
                return "/LC5BGraph";
            case 'Test anulowania liter (średni) (punkty)':
                return "/LC8SGraph";
            case 'Test anulowania liter (średni) (czas)':
                return "/LC8TGraph";
            case 'Test anulowania liter (średni) (złożenie)':
                return "/LC8BGraph";
            case 'Test anulowania liter (trudny) (punkty)':
                return "/LC10SGraph";
            case 'Test anulowania liter (trudny) (czas)':
                return "/LC10TGraph";
            case 'Test anulowania liter (trudny) (złożenie)':
                return "/LC10BGraph";
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
                <Link to={handleLinkClick()}>
                    <button type="button">Submit</button>
                </Link>
            </div>
        </form>
    );
};

export default GraphForm;
