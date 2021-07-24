import React from 'react';

function Card({imageUrl, value, suit}) {
	return (
		<div className="Card">
			<img src={imageUrl} className="Card-image" alt={`${value} of ${suit}`}></img>
		</div>
	)
}

export default Card;