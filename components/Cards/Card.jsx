'use client';
import React from 'react';
import Image from 'next/image';

const Card = ({ price, title, thumbnail, store, link }) => {
	const getPrice = (price) => {
		if (typeof price === 'number') {
			const priceInReais = `R$ ${price.toFixed(2).replace('.', ',')}`;
			return priceInReais;
		}
		return price;
	};

	return (
		<div className='border border-gray-200 rounded-lg shadow-md overflow-hidden transition-transform transform hover:-translate-y-1'>
			<div className='flex flex-col h-full'>
				<div className="p-4">
					<div className='relative w-full pb-9/16 h-[300px]'>
						<Image
							src={thumbnail}
							alt={title}
							fill
							sizes='(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw'
							style={{ objectFit: 'cover' }}
							className='absolute inset-0 w-full h-full'
						/>
					</div>
				</div>
				<div className='p-4 flex flex-col justify-between flex-grow'>
					<h2 className='text-lg font-semibold mb-2'>{title}</h2>
					<p className='text-sm text-gray-500 mb-2'>Loja: {store ? store : 'Mercado Livre'}</p>
					<p className='text-xl text-orange-500 mb-4'>{getPrice(price)}</p>
					<div className='text-center'>
						<a
							className='bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-700 transition-colors'
							href={link}
							target='_blank'
						>
							Ir a página
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
