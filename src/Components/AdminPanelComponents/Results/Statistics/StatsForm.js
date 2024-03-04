import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const StatsForm = () => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleDropdownChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleLinkClick = () => {
        // Add logic to determine the route based on the selected option
        switch (selectedOption) {
            case 'Srednia':
                return '/admin/stats/średnia';
            case 'Test t Studenta powiązane':
                return '/';
            case 'Test t Studenta niepowiązane':
                return '/';
            case 'Test Manna-Whitneya':
                return '/';
            case 'Test Willcoxona':
                return '/';
            case 'Test ANOVA':
                return '/';
            case 'Test Kruskall-Wallis':
                return '/';
            default:
                toast.error('Wybierz jeden z wyborów');
        }
    };

    const dropdownOptions = [
        'Srednia',
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

export default StatsForm;
