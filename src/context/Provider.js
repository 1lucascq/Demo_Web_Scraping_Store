import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Context from './Context'
import fetchMlData from '../services/mercadoLivreAPI'

const DEFAULT_FILTERS = {
    api: 'all',
    category: 'fridges',
}

function Provider({ children }) {
    const [mlData, setMlData] = useState({});
    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    const [activeData, setActiveData] = useState([]);

    useEffect(() => {
        async function getCategories() {
            const mlItems = {
                fridges: (await fetchMlData.fridges()).results,
                tvs: (await fetchMlData.tvs()).results,
                smartphones: (await fetchMlData.smartphones()).results,
            }

            setMlData(mlItems)
        }

        getCategories()
        setActiveData(mlData.fridges);
    }, []);



    return (
        <Context.Provider
            value={{
                mlData,
                setMlData,
                filters,
                setFilters,
                activeData,
                setActiveData
            }}
        >
            {children}
        </Context.Provider>
    )
}

export default Provider

Provider.propTypes = {
    children: PropTypes.node.isRequired,
}
