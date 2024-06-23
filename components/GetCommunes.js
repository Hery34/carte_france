'use client';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import { supabase } from './supabaseClient';
import SumsCommunes from './sums_communes';

export default function GetCommunes({ onSelectedOptionsChange }) {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selected, setSelected] = useState([]);


    useEffect(() => {
        const updateSuggestions = async () => {
            const { data, error } = await supabase.rpc('search_data', {
                search_text: inputValue,
                search_table: 'france_population',
                search_column: 'nom_commune',
            });
            if (error) {
                console.error(error);
            } else {
                setSuggestions(data);
            }
        };
        if (inputValue.length > 2) {
            updateSuggestions();
        } else {
            setSuggestions([]);
        }
    }, [inputValue]);

    const handleSelectChange = (selectedOptions) => {
        console.log('Selected options:', selectedOptions);
        if (selectedOptions.length > 30) {
            alert('Vous ne pouvez sélectionner que 30 communes au maximum');
        } else {
            setSelected(selectedOptions);
            onSelectedOptionsChange(selectedOptions)
        }
    };

    return (
        <div>
            <h3>{`Vous pouvez sélectionner jusqu'à 30 communes`}</h3>
            <Select
                isMulti
                options={suggestions}
                value={selected}
                onChange={handleSelectChange}
                onInputChange={setInputValue}
                color
                placeholder="Tapez au moins 3 lettres pour rechercher..."
                noOptionsMessage={() => "Aucune commune trouvée"}
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
            <h3>Communes sélectionnées :</h3>
            <ul style={{
                columns: '7',
                listStyle: 'none',
                padding: 0,
                margin: 0,
                color: 'red'
            }}>
                {selected.map((option, index) => (
                    <li key={index}>{option.value}</li>
                ))}
            </ul>
            <SumsCommunes
                table="france_population"
                choiceFilter={selected.map(option => option.value)}
                filterVariable="departement" />
        </div>
    );
}