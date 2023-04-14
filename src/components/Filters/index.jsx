import React from 'react'
import Select from './Select'
import { webOptions, categories } from '../../mockedData'

const Filters = () => {
    return (
        <section className="filters">
            <Select
                name={'web'}
                label={'Web'}
                id={'web'}
                options={webOptions}
            >
            </Select>
            <Select
                name={'categories'}
                label={'Categorias'}
                id={'categories'}
                options={categories}
            >
            </Select>

        </section>
    )
}

export default Filters
