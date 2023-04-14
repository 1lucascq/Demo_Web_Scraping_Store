import React, { useContext } from 'react'
import context from '../../context/Context'
import Card from './Card'

const Cards = () => {
    const { activeData, mlData, setActiveData, filters } = useContext(context)
    console.log('activeData')
    console.log(activeData)

    // if (mlData && filters) {
    //     const selectedCategory = filters.category;
    //     setActiveData(mlData[selectedCategory])
    // }

    return (
        <section className="productCards">
            <div>oi</div>
            {activeData ? activeData.map(({id, price, title, thumbnail}) => {
                <Card
                    id={id}
                    price={price}
                    title={title}
                    thumbnail={thumbnail}
                    key={id}
                />
            })
            : <div>tokinao</div>
        }
            <div>tchau</div>
        </section>
    )
}

export default Cards
