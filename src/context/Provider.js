import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Context from './Context'
import { fetchBuscapeData, fetchMlData } from '../services/APICalls'

const DEFAULT_FILTERS = {
    api: 'ml',
    category: 'geladeira',
}

function Provider({ children }) {
    const [mlData, setMlData] = useState({});
    const [buscapeData, setBuscapeData] = useState({});
    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    const [activeData, setActiveData] = useState([]);

    useEffect(() => {
        async function getData() {
            setActiveData(undefined);

            if(filters.api === 'ml') {
                const filteredData = await fetchMlData[filters.category]()

                setActiveData(filteredData);
                return
            }

            if(filters.api === 'buscape') {
                try {
                    const filteredData = await fetchBuscapeData[filters.category]();
                    setActiveData(filteredData);
                } catch (error) {
                    console.error('~~ERROR~~');
                    console.error(error);
                }
                return;
            }

            if(filters.api === 'all') {
                const mlData = await fetchMlData[filters.category]()
                setActiveData(...mlData);
                console.log('oi')
                try {
                    console.log('ola')
                    const buscapeData = await fetchBuscapeData[filters.category]();
                    setActiveData(...activeData, ...buscapeData);
                    console.log('tchau')
                } catch (error) {
                    const filteredData = [...mlData]
                    setActiveData(filteredData);
                    console.error('~~ERROR~~');
                    console.error(error);
                }
                return;
            }

        }
        getData()
    }, [filters]);

    return (
        <Context.Provider
            value={{
                mlData,
                setMlData,
                buscapeData,
                setBuscapeData,
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
