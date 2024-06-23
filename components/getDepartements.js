'use client';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import { supabase } from './supabaseClient';

export default function GetDepartement({ sourceTable, columnSelected, columnName, selectedDepartements, setSelectedDepartements, inheritedDepartements = [] }) {
    const [options, setOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        // Charger les départements initiaux (hérités ou déjà sélectionnés)
        const initialDepartements = [...new Set([...selectedDepartements, ...inheritedDepartements])];
        if (initialDepartements.length > 0) {
            setOptions(initialDepartements.map(dept => ({
                value: dept,
                label: dept
            })));
        }
    }, [selectedDepartements, inheritedDepartements]);

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

    const handleDepartementChange = (selectedOptions) => {
        const selectedNames = [...new Set(selectedOptions.map(option => option.value))];
        setSelectedDepartements(selectedNames);
    };

    return (
        <>
            <div>
                <Select
                    options={options}
                    isMulti
                    onChange={handleDepartementChange}
                    onInputChange={handleInputChange}
                    value={selectedDepartements.map(dept => ({ value: dept, label: dept }))}
                    placeholder="Tapez pour rechercher un département..."
                    noOptionsMessage={() => "Aucun département trouvé"}
                />
                <h3>Vos choix : </h3>
                <ul style={{
                    columns: '4',
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                }}>
                    {selectedDepartements.map((departementName) => (
                        <li key={departementName}>{departementName}</li>
                    ))}
                </ul>
            </div>
        </>
    );
}