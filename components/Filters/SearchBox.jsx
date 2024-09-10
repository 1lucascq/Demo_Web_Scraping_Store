'use client';
import React, { useContext } from 'react'
import context from '../../app/context/Context';

const SearchBox = () => {
    const { activeData, setActiveFilteredData } = useContext(context);

    const searchFunction = ({ value }) => {
        const filteredData = activeData.filter(({ title, name }) => {
            if (title) {
                return title.toLowerCase().includes(value.toLowerCase());
            }
            if (name) {
                return name.toLowerCase().includes(value.toLowerCase());
            }
        });

        setActiveFilteredData(filteredData);
    }

    return (
        <form action="" className='flex items-center space-x-2'>
            <input
                type="text"
                className="searchInput w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Estou buscando..."
                onChange={({ target }) => searchFunction(target)}
            />
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
                Buscar
            </button>
        </form>
    )
}

export default SearchBox;
