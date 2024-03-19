import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Authetification.css';

function Farm() {
    const [suggestions, setSuggestions] = useState([]);
    const [value, setValue] = useState('');
    const [farmName, setFarmName] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const getSuggestions = async (value) => {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${value}&format=json`);
        const data = await response.json();
        setSuggestions(data.map((item) => item.display_name));
    };

    const onSuggestionsFetchRequested = ({ value }) => {
        getSuggestions(value);
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const onSuggestionSelected = (_, { suggestionValue }) => {
        setValue(suggestionValue);
    };

    function handleFarmData(e) {
        e.preventDefault();
        fetch('/farmer-details', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                location: value,
                farm_name: farmName
            })
        })
        .then((r) => r.json())
        .then((data) => {
            setSuccess(data.message);
            toast.success('Farm details submitted successfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate('/');
        });
    }

    const inputProps = {
        placeholder: 'Enter Location',
        value,
        onChange: (_, { newValue }) => setValue(newValue)
    };

    const renderSuggestion = (suggestion) => <div>{suggestion}</div>;

    return (
        <>
            <div className="center-screen">
                <div className="email-verification-page">
                    <div>{success}</div>
                    <h2>Enter Farm details</h2>
                    <form onSubmit={handleFarmData}>
                        <label htmlFor="farmName">Farm Name</label>
                        <input
                            type="text"
                            id="farmName"
                            name="farmName"
                            value={farmName}
                            onChange={(e) => setFarmName(e.target.value)}
                            required
                        />
                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={onSuggestionsClearRequested}
                            onSuggestionSelected={onSuggestionSelected}
                            getSuggestionValue={(suggestion) => suggestion}
                            renderSuggestion={renderSuggestion}
                            inputProps={inputProps}
                        />
                        <button type="submit">Enter</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default Farm;
