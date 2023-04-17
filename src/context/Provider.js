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
        console.log('useEffect')
        async function getCategories() {
            const fridges = (await fetchMlData.fridges()).results
            const tvs = (await fetchMlData.tvs()).results
            const smartphones = (await fetchMlData.smartphones()).results

            const mlItems = {
                fridges,
                tvs,
                smartphones
            }

            setMlData(mlItems)
            setActiveData(mlItems.fridges);
        }

        getCategories()
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
