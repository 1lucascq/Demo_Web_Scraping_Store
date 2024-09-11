'use client';
import React, { useContext } from 'react';
import context from '../../app/context/Context';
import Card from './Card';

const Cards = () => {
	const { activeData, activeFilteredData } = useContext(context);

    return (
        <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 p-4 max-w-screen-lg'>
            {activeFilteredData && activeFilteredData.length ? (
                activeFilteredData.map(({ id, price, title, name, image, thumbnail, store }) => (
                    <Card id={id} price={price} title={title || name} thumbnail={thumbnail || image} key={id || name} store={store || undefined} />
                ))
            ) : activeData && activeData.length ? (
                activeData.map(({ id, price, title, name, image, thumbnail, store }) => (
                    <Card id={id} price={price} title={title || name} thumbnail={thumbnail || image} key={id || name} store={store || undefined} />
                ))
            ) : (
                <div className='loader' />
            )}
        </section>
    );
};

export default Cards;
