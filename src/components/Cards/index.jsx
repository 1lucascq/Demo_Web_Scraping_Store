import React, { useContext } from 'react'
import context from '../../context/Context'
import Card from './Card'

const Cards = () => {
    const { activeData } = useContext(context)

    return (
        <section className="productCards">
            {activeData && activeData.length ? activeData.map(({id, price, title, name, image, thumbnail, store}) => (
                <Card
                    id={id}
                    price={price}
                    title={title || name}
                    thumbnail={thumbnail || image}
                    key={id}
                    store={store || undefined}
                />
            ))
            : <div className='loader'></div>
        }
        </section>
    )
}

export default Cards
