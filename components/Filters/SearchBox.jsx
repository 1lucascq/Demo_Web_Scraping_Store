'use client';
import React, { useContext } from 'react'
import context from '../../app/context/Context';

const SearchBox = () => {
    const { setQuery } = useContext(context);

    return (
        <form action="" className='flex items-center space-x-2'>
            <input
                type="text"
                className="searchInput w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Estou buscando..."
                onChange={({ target }) => setQuery(target.value)}
            />
            <button
                className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition duration-200"
            >
                Buscar
            </button>
        </form>
    )
}

export default SearchBox;
