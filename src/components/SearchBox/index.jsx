import React, { useContext } from 'react'
import context from '../../context/Context';

const SearchBox = () => {
    const { activeData, setActiveFilteredData } = useContext(context);

    const searchFunction = ({value}) => {
        const filteredData = activeData.filter(({ title, name }) => {
            if (title) {
                return title.toLocaleLowerCase().includes(value.toLocaleLowerCase());
            }
            if (name) {
                return name.toLocaleLowerCase().includes(value.toLocaleLowerCase());
            }
        });

        setActiveFilteredData(filteredData);
    }

    return (
        <form action="" className='searchBoxForm'>
            <input
                type="text"
                className="searchInput"
                placeholder="Estou buscando..."
                onChange={({ target }) => searchFunction(target)}

            />
            <button>Buscar</button>
        </form>
    )
}

export default SearchBox
