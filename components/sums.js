import { useState, useEffect } from 'react';
import { supabase } from '@/components/supabaseClient';

export default function Sum({ table, choiceFilter, filterVariable }) {
    const [totalPopulation, setTotalPopulation] = useState(0);

    useEffect(() => {
        const fetchTotalPopulation = async () => {
            const { data, error } = await supabase.rpc('get_sums', {
                selecteddepartements: choiceFilter
            });

            if (error) {
                console.error('Error fetching total population:', error);
                setTotalPopulation(0);
            } else {
                // Assuming data returns an array of rows with the `population` column
                setTotalPopulation(data[0]?.population || 0);
            }
        };

        if (choiceFilter.length > 0) {
            fetchTotalPopulation();
        } else {
            setTotalPopulation(0); // Reset if no departments are selected
        }
    }, [choiceFilter]);

    return (
        <div style={{ border: '1px solid orange', padding: '10px', margin: '20px' }}>
            <h2 className="text-center text-rose_violet text-3xl font-bold">
                Découvrez le nombre d'habitants de votre séléction
            </h2>
            <h3 className='text-center text-2xl font-bold'>
                {`Il y'a exactement :`} {totalPopulation.toLocaleString('fr-FR')} habitants dans votre séléction
            </h3>
        </div>
    );
}
