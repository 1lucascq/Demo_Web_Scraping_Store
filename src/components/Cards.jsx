import React from 'react'

const Cards = () => {
    return (
        <section className="productCard">
            <div className='gridElement productImage'>
                <img src="https://http2.mlstatic.com/D_NQ_NP_649419-MLA51326162761_082022-O.webp" alt="" />
            </div>
            <div className='gridElement productData'>
                <h2 className='productName'>Nome do produto</h2>
                <p className='productDescription'>descrição do produto</p>
                <p className='productPrice'>R$99,99</p>
            </div>
            <div className='gridElement actionButton'>
                <button className='buyButton'>Ir a página</button>
            </div>
        </section>
    )
}

export default Cards
