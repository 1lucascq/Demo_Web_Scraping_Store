import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import context from '../../context/Context';

const Select = ({ name, id, options }) => {
    const { filters, setFilters } = useContext(context);

    const updateFilters = (target) => {
        if (name === 'categories') {
            setFilters({api: filters.api, category: target.value })
            return;
        }
        setFilters({api: target.value, category: filters.category })
    }

    return (
        <div className="selector">
            <select
                name={name}
                id={id}
                onChange={({ target }) => updateFilters(target)}
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
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
}

export default Select
