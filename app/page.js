'use client';

import NavBar from "@/components/Navbar";
import GetRegions from "@/components/GetRegions";
import { useState, useEffect } from 'react';
import MapRegions from "@/components/MapRegions";
import GetDepartement from "@/components/getDepartements";
import MapDepartement from "@/components/MapDepartements";
import { supabase } from "@/components/supabaseClient";
import Sum from '@/components/sums';

export default function Index() {
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [data, setData] = useState([]);
  const [selectedDepartements, setSelectedDepartements] = useState([]);

  useEffect(() => {
    if (selectedRegions.length > 0) {
      getDepartementsFromRegions(selectedRegions).then((departements) => {
        setSelectedDepartements(departements);
      });
    } else {
      setSelectedDepartements([]); // Réinitialise les départements sélectionnés si aucune région n'est sélectionnée
    }
  }, [selectedRegions]);

  const getDepartementsFromRegions = async (regions) => {
    const regionNames = regions.join(',');
    const { data, error } = await supabase.rpc('get_departements_from_regions', { region_names: regionNames });
    if (error) {
      console.error('Error fetching departements:', error);
      return [];
    } else {
      const departements = [...new Set(data.map((row) => row.departement))];
      return departements;
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <NavBar />
      <div className="RegionsDepartements">
        <div style={{ display: 'flex' }} className="regions">
          <div style={{ width: '50%' }}>
            <GetRegions
              sourceTable="france_population"
              columnSelected="*"
              columnName="region"
              selectedRegions={selectedRegions}
              setSelectedRegions={setSelectedRegions}
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
              sourceTable="france_population"
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

      <Sum
        table="france_population"
        choiceFilter={selectedDepartements}
        filterVariable="departement"
      />
    </div>
  );
}
