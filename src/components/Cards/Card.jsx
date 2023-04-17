import React from 'react'
import PropTypes from 'prop-types'

const Card = ({ id, price, title, thumbnail }) => {
    const getPrice = (price) => {
        if (typeof price === 'number') {
            const priceInReais = `R$ ${price.toFixed(2).replace('.', ',')}`;
            return priceInReais;
        }
        return price;
    }

    return (
        <div className="cardWrapper">
            <div className="productCard" id={id}>
                <div className="gridElement productImage">
                    <img src={thumbnail} alt="" />
                </div>
                <div className="gridElement productData">
                    <h2 className="productName">{title}</h2>
                    <p className="productPrice">{getPrice(price)}</p>
                    <div className='buttonWrapper'>
                        <button className="buyButton" type="button">
                            Ir a página
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

Card.propTypes = {
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
}

export default Card
