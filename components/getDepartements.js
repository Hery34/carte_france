'use client';
import { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import { supabase } from './supabaseClient';




export default function GetDepartement({ sourceTable, columnSelected, columnName, selectedDepartements, setSelectedDepartements }) {

    const [Departements, setDepartements] = useState([]);
    const [options, setOptions] = useState([]);
    const [data, setData] = useState([]);


    useEffect(() => {
        async function fetchData() {
            let { data, error } = await supabase
                .from(sourceTable)
                .select(columnSelected);
            if (error) {
            } else {
                setData(data);
                console.log(data);
                const Departements = [...new Set(data.map(item => item[columnName]))];
                setDepartements(Departements);
                setOptions(Departements.map(Departement => ({
                    value: Departement,
                    label: Departement
                })));
            }
        }

        fetchData();
    }, [sourceTable, columnSelected, columnName]);
    const handleDepartementChange = (selectedOptions) => {
        const selectedNames = [...new Set(selectedOptions.map(option => option.value))];
        setSelectedDepartements(selectedNames);
    };
    const selectedOptions = selectedDepartements.map(DepartementName => ({
        value: DepartementName,
        label: DepartementName,
    }));

    return (
        <>
            <div>
                <Select
                    options={options}
                    isMulti
                    onChange={handleDepartementChange}
                    value={selectedOptions}
                />
                <h3>Vos choix : </h3>
                <ul style={{
                    columns: '4',
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                }}>
                    {selectedDepartements.map((DepartementName) => (
                        <li key={DepartementName}>{DepartementName}</li>
                    ))}
                </ul>

            </div>
        </>
    );
}