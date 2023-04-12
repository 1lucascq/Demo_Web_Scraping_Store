import React from 'react'

const Select = ({label, name, id, options }) => {
    return (
        <div className="selector">
            {/* <label htmlFor={id}>{label}</label> */}
            <select name={name} id={id}>
                {options.map((option, i) => {
                    return (
                        <option key={i} value={option.value}>{option.name}</option>
                    )
                })}
            </select>
        </div>
    )
}

export default Select
