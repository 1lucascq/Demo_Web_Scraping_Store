import React, { useContext } from 'react'
import context from '../../context/Context'
import Card from './Card'

const Cards = () => {
    const { activeData, mlData, setActiveData, filters } = useContext(context)

    return (
        <section className="productCards">
            {activeData.length ? activeData.map(({id, price, title, thumbnail}) => (
                <Card
                    id={id}
                    price={price}
                    title={title}
                    thumbnail={thumbnail}
                    key={id}
                />
            ))
            : <div className='loader'></div>
        }
        </section>
    )
}

export default Cards
