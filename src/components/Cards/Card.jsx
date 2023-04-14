import React from 'react'
import PropTypes from 'prop-types'

const Card = ({ id, price, title, thumbnail }) => {
    return (
        <div className="productCard" id={id}>
            <div className='gridElement productImage'>
                <img src={thumbnail} alt="" />
            </div>
            <div className='gridElement productData'>
                <h2 className='productName'>{title}</h2>
                <p className='productDescription'>Descrição do produto</p>
                <p className='productPrice'>{price}</p>
            </div>
            <div className='gridElement actionButton'>
                <button className='buyButton' type='button'>Ir a página</button>
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
