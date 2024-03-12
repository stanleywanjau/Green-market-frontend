import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import {  useNavigate } from "react-router-dom";

function Farm() {
    const [suggestions, setSuggestions] = useState([]);
    const [value, setValue] = useState('');
    const [contact, setContact] = useState('');
    const [farmName, setFarmName] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate()

    const getSuggestions = async (value) => {
        const controller = new AbortController();
        const signal = controller.signal;
    
        const response = await fetch(https://nominatim.openstreetmap.org/search?q=${value}&format=json, { signal });
        const data = await response.json();
        if (!signal.aborted) {
            setSuggestions(data.map((item) => item.display_name));
        }
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
        // Handle sending location data to the backend
        fetch('/farmer-details', {
            method: 'POST',
            headers: {
                'Authorization': Bearer ${localStorage.getItem('jwt')},
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                location: value,
                farm_name: farmName,
                contact
            }),
        })
        .then(r => r.json())
        .then(data => {
            setSuccess(data.message);
            navigate('/')
        });
    }

    const inputProps = {
        placeholder: 'Enter Location',
        value,
        onChange: (_, { newValue }) => setValue(newValue)
    };

    const renderSuggestion = (suggestion) => (
        <div>
            {suggestion}
        </div>
    );

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
                        <label htmlFor="contact">Contact</label>
                        <input
                            type="text"
                            id="contact"
                            name="contact"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            required
                        />
                        <button type="submit">Enter</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Farm;