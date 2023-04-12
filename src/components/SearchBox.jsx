import React from 'react'

const SearchBox = () => {
    return (
        <form action="" className='searchBoxForm'>
            <input
                type="text"
                className="searchInput"
                placeholder="Estou buscando..."
                onChange={() => console.log('oi')}
            />
            <button>Buscar</button>
        </form>
    )
}

export default SearchBox
