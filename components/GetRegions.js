'use client'
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { supabase } from './supabaseClient';

export default function GetRegions({ sourceTable, columnSelected, columnName, selectedRegions, setSelectedRegions }) {
    const [data, setData] = useState([]);
    const [regions, setRegions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let { data, error } = await supabase
                .from(sourceTable)
                .select(columnSelected);
            if (error) {
            } else {
                setData(data);
                const regions = [...new Set(data.map(item => item[columnName]))];
                setRegions(regions);
                setOptions(regions.map(region => ({
                    value: region,
                    label: region
                })));
            }
        }

        fetchData();
    }, []);

    const handleRegionChange = (selectedOptions) => {
        const selectedNames = selectedOptions.map(option => option.value);
        setSelectedRegions(selectedNames);
    };
    const selectedOptions = selectedRegions.map(regionName => ({
        value: regionName,
        label: regionName,
    }));

    return (
        <>
            <Select
                options={options}
                isMulti
                onChange={handleRegionChange}
                value={selectedOptions}
            />
            <h3>Vos choix : </h3>
            <ul style={{
                columns: '3',
                listStyle: 'none',
                padding: 0,
                margin: 0,
            }}>
                {selectedRegions.map((regionName) => (
                    <li key={regionName}>{regionName}</li>
                ))}
            </ul>
        </>
    );
}

