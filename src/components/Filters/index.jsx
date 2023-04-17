import React from 'react'
import Select from './Select'
import { webOptions, categories } from '../../options'

const Filters = () => {
    return (
        <section className="filters">
            <Select
                name={'api'}
                label={'Api'}
                id={'api'}
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
