'use client';

import NavBar from "@/components/Navbar";
import GetRegions from "@/components/GetRegions";
import { useState, useEffect } from 'react';
import MapRegions from "@/components/MapRegions";
import GetDepartement from "@/components/getDepartements";
import MapDepartement from "@/components/MapDepartements";
import GetCommunes from "@/components/GetCommunes";
import { supabase } from "@/components/supabaseClient";
import Sums from '@/components/sums';
import MyFooter from "@/components/MyFooter";
import MyHeader from "@/components/MyHeader";

export default function Carte() {
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [data, setData] = useState([]);
  const [selectedDepartements, setSelectedDepartements] = useState([]);
  const [value, setValue] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showDiv1, setShowDiv1] = useState(false);
  const [showDiv2, setShowDiv2] = useState(false);


  const handleChange = (event) => {
    setValue(event.target.value);
    if (event.target.value === '0') {
      setShowDiv1(true);
      setShowDiv2(false);
    } else if (event.target.value === '2') {
      setShowDiv1(false);
      setShowDiv2(true);
    } else {
      setShowDiv1(false);
      setShowDiv2(false);
    }
  };
  useEffect(() => {
    if (selectedRegions.length > 0) {
      getDepartementsFromRegions(selectedRegions).then((departements) => {
        setSelectedDepartements(prevDepartements => {
          return [...new Set([...prevDepartements, ...departements])];
        });
      });
    } else {
      setSelectedDepartements([]);
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

  const handleSelectedOptionsChange = (newSelectedOptions) => {
    setSelectedOptions(newSelectedOptions)
  }


  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <MyHeader></MyHeader>
      <div style={{ display: 'flex', justifyContent: 'center' }} >
        <label style={{ marginRight: '10px' }} className='font-bold'>Sélectionner par Régions et Départements</label>
        <input
          type="range"
          min="0"
          max="2"
          value={value}
          onChange={handleChange}
          style={{
            appearance: 'none',
            width: '100px',
            height: '25px',
            backgroundColor: '#FF0000',
            outline: 'none',
            borderRadius: '25px',
            border: 'none',
          }}
          className='mb-8'
        />
        <label style={{ marginLeft: '10px' }} className='font-bold'>
          Sélectionner par Code Postal
        </label>
      </div>
      {showDiv1 && (
        <><div className="RegionsDepartements">
          <div style={{ display: 'flex' }} className="regions">
            <div style={{ width: '50%' }}>
              <GetRegions
                sourceTable="france_population"
                columnSelected="*"
                columnName="region"
                selectedRegions={selectedRegions}
                setSelectedRegions={setSelectedRegions} />
            </div>
            <div style={{ width: '50%' }}>
              <MapRegions
                selectedRegions={selectedRegions}
                setSelectedRegions={setSelectedRegions} />
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
                inheritedDepartements={selectedDepartements}
                setData={setData}
              />
            </div>
            <div style={{ width: '50%' }}>
              <MapDepartement
                selectedDepartements={selectedDepartements}
                setSelectedDepartements={setSelectedDepartements} />
            </div>
          </div>
        </div>
          <Sums
            table="france_population"
            choiceFilter={selectedDepartements}
            filterVariable="departement" /></>
      )}
      {showDiv2 && (
        <div className="CP">
          <GetCommunes
            selectedOptions={selectedOptions}
            onSelectedOptionsChange={handleSelectedOptionsChange}
          />
        </div>

      )}
      <div className="flex justify-center"></div>
      <MyFooter></MyFooter>
    </div>

  );
}
