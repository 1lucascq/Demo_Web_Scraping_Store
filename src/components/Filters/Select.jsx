'use client';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import context from '../../app/context/Context';

const Select = ({ name, id, options }) => {
    const { filters, setFilters } = useContext(context);

    const updateFilters = (target) => {
        if (name === 'categories') {
            setFilters({ api: filters.api, category: target.value });
            return;
        }
        setFilters({ api: target.value, category: filters.category });
    };

    return (
        <div className="mb-4">
            <select
                name={name}
                id={id}
                onChange={({ target }) => updateFilters(target)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {options.map((option, i) => (
                    <option key={i} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

Select.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
};

export default Select;
