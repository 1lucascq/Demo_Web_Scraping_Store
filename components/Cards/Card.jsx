'use client';
import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

const Card = ({ id, price, title, thumbnail, store }) => {
	const getPrice = (price) => {
		if (typeof price === 'number') {
			const priceInReais = `R$ ${price.toFixed(2).replace('.', ',')}`;
			return priceInReais;
		}
		return price;
	};

	return (
		<div className='cardWrapper'>
			<div className='productCard' id={id}>
				<div className='gridElement productImage'>
					<Image src={thumbnail} alt='' width={440} height={860} />
				</div>
				<div className='gridElement productData'>
					<h2 className='productName'>{title}</h2>
					<p className='productStore'>Loja: {store ? store : 'Mercado Livre'}</p>
					<p className='productPrice'>{getPrice(price)}</p>
					<div className='buttonWrapper'>
						<button className='buyButton' type='button'>
							Ir a página
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
