import React from 'react';

const Header = () => {
	return (
		<header className='shadow-md'>
			<div className='container mx-auto flex justify-between items-center py-4 px-6'>
				<img
					src='https://live-lexart-corp-site.pantheonsite.io/wp-content/uploads/2022/12/lex-white.svg'
					alt='company logo'
					className='h-10'
				/>
			</div>
		</header>
	);
};

export default Header;
