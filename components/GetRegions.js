'use client'
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { supabase } from './supabaseClient';

export default function GetRegions({ sourceTable, columnSelected, columnName, selectedRegions, setSelectedRegions }) {
    const [options, setOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        // Charger les régions initiales si nécessaire
        if (selectedRegions.length > 0 && options.length === 0) {
            setOptions(selectedRegions.map(region => ({
                value: region,
                label: region
            })));
        }
    }, [selectedRegions]);

    const loadOptions = async (inputValue) => {
        if (inputValue.length < 2) return;

        const { data, error } = await supabase.rpc('search_data', {
            search_column: columnName,
            search_table: sourceTable,
            search_text: inputValue
        });

        if (error) {
            console.error('Error fetching suggestions:', error);
        } else {
            setOptions(data.map(item => ({
                value: item.value,
                label: item.label
            })));
        }
    };

    const handleInputChange = (newValue) => {
        setInputValue(newValue);
        loadOptions(newValue);
    };

    const handleRegionChange = (selectedOptions) => {
        const selectedNames = selectedOptions.map(option => option.value);
        setSelectedRegions(selectedNames);
    };

    return (
        <>
            <Select
                options={options}
                isMulti
                onChange={handleRegionChange}
                onInputChange={handleInputChange}
                value={selectedRegions.map(region => ({ value: region, label: region }))}
                placeholder="Tapez au moins 3 lettres pour rechercher une région..."
                noOptionsMessage={() => "Aucune région trouvée"}
                styles={{
                    option: (provided) => ({
                        ...provided,
                        color: '#1181C8',
                    }),
                    multiValue: (provided) => ({
                        ...provided,
                        color: '#1181C8',
                    }),
                    singleValue: (provided) => ({
                        ...provided,
                        color: '#1181C8',
                    }),
                    placeholder: (provided) => ({
                        ...provided,
                        color: '#1181C8',
                    }),
                    input: (provided) => ({
                        ...provided,
                        color: '#1181C8',
                    }),
                }}
            />
            <h3>Vos choix : </h3>
            <ul style={{
                columns: '3',
                listStyle: 'none',
                padding: 0,
                margin: 0,
                color: 'red'
            }}>
                {selectedRegions.map((regionName) => (
                    <li key={regionName}>{regionName}</li>
                ))}
            </ul>
        </>
    );
}