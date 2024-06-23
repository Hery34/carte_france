import { useState, useEffect } from 'react';
import { supabase } from '@/components/supabaseClient';

export default function SumsCommunes({ table, choiceFilter, filterVariable }) {
    const [totalPopulation, setTotalPopulation] = useState(0);

    useEffect(() => {
        const fetchTotalPopulation = async () => {
            const { data, error } = await supabase.rpc('get_sums_communes', {
                selectedcommunes: choiceFilter
            });

            if (error) {
                console.error('Error fetching total population:', error);
                setTotalPopulation(0);
            } else {

                setTotalPopulation(data[0]?.population || 0);
            }
        };

        if (choiceFilter.length > 0) {
            fetchTotalPopulation();
        } else {
            setTotalPopulation(0);
        }
    }, [choiceFilter]);

    return (
        <div style={{ border: '1px solid blue', padding: '10px', margin: '20px' }}>
            <h2 className="text-center text-rose_violet text-3xl font-bold">
                Le 1er janvier 2022,
            </h2>
            <h3 className='text-center text-2xl font-bold'>
                {`Il y avait exactement `} {totalPopulation.toLocaleString('fr-FR')} habitants dans votre sélection
            </h3>
        </div>
    );
}
