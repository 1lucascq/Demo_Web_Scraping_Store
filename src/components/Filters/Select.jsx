import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import context from '../../context/Context';

const Select = ({ label, name, id, options }) => {
    const { mlData, setMlData, filters, setFilters } = useContext(context);
    // const [filter, setFilter] = useState();

    return (
        <div className="selector">
            {/* <label htmlFor={id}>{label}</label> */}
            <select
                name={name}
                id={id}
                onChange={({ target }) => setFilters({api: filters.api, category: target.name})}
            >
                {options.map((option, i) => {
                    return (
                        <option key={i} value={option.value}>
                            {option.name}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

Select.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
}

export default Select
