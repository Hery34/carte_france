
'use client';

import NavBar from "@/components/Navbar";
import GetRegions from "@/components/GetRegions";
import { useState, useEffect } from 'react';
import MapRegions from "@/components/MapRegions";
import GetDepartement from "@/components/getDepartements";
import MapDepartement from "@/components/MapDepartements";
import { supabase } from "@/components/supabaseClient";


export default async function Carte() {
    const [selectedRegions, setSelectedRegions] = useState([]);
    const [data, setData] = useState([]);
    const [selectedDepartements, setSelectedDepartements] = useState([]);

    useEffect(() => {
        getDepartementsFromRegions(selectedRegions).then((departements) => {
            setSelectedDepartements(departements);
        });
    }, [selectedRegions]);


    const getDepartementsFromRegions = async (regions) => {
        const regionNames = regions.join(',');
        let { data, error } = await supabase.rpc('get_departements_from_regions', { region_names: regionNames, });
        console.log('Data', data);
        console.log('Error', error);
        if (error) {
            console.log("erreur niveau code")
        } else {
            const departements = data.map((row) => row.departement);
            console.log(departements)
            return departements;
        }
    };
    return (



        <div className="flex-1 w-full flex flex-col gap-20 items-center">

            <NavBar></NavBar>

            <div className="RegionsDepartements">


                <div style={{ display: 'flex' }} className="regions">
                    <div style={{ width: '50%' }}>
                        <GetRegions
                            sourceTable="french_population"
                            columnSelected="*"
                            columnName="region"
                            selectedRegions={selectedRegions}
                            setSelectedRegions={setSelectedRegions}
                            setData={setData}
                        />
                    </div>
                    <div style={{ width: '50%' }}>
                        <MapRegions
                            selectedRegions={selectedRegions}
                            setSelectedRegions={setSelectedRegions}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex' }} className="departements">
                    <div style={{ width: '50%' }}>
                        <GetDepartement
                            sourceTable="french_population"
                            columnSelected="*"
                            columnName="departement"
                            selectedDepartements={selectedDepartements}
                            setSelectedDepartements={setSelectedDepartements}
                            setData={setData}
                        />
                    </div>
                    <div style={{ width: '50%' }}>
                        <MapDepartement
                            selectedDepartements={selectedDepartements}
                            setSelectedDepartements={setSelectedDepartements}
                        />
                    </div>
                </div>

            </div>

        </div>
    );
}
