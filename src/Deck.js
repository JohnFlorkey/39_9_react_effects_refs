import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';

function Deck() {
	const API_URL = 'http://deckofcardsapi.com/api/deck';
	
	const [deck, setDeck] = useState({
		"success": "",
		"deck_id": "",
		"shuffled": false,
		"remaining": 0,
		"drawnCards": []
	})

	/** This draws ONE card at a time from a previously created deck */
	const drawCard = async () => {
		try {
			if (deck.remaining === 0) {
				return alert("Error: no cards remaining!");
			}
			const response = await axios.get(`${API_URL}/${deck.deck_id}/draw/`);
			if (response.status !== 200) {
				throw new Error("error response getting next card from Deck of Cards API");
			}
			const newCard = response.data.cards[0];
			setDeck(oldDeck => ({
				success: oldDeck.success,
				deck_id: oldDeck.deck_id,
				shuffled: oldDeck.shuffled,
				remaining: response.data.remaining,
				drawnCards: [...oldDeck.drawnCards, {
					image: newCard.image,
					value: newCard.value,
					suit: newCard.suit,
					code: newCard.code
				}]
			}));
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		const getNewDeck = async() => {
			try {
				const response = await axios.get(`${API_URL}/new/shuffle`);
				if (response.status !== 200) {
					throw new Error("error response getting new deckfrom Deck of Cards API");
				}
				setDeck(oldDeck => ({
					"success": response.data.success,
					"deck_id": response.data.deck_id,
					"shuffled": response.data.shuffled,
					"remaining": response.data.remaining,
					"drawnCards": []
				}));
			} catch (err) {
				console.log(err);
			}
		}
		getNewDeck();
	}, []);

	return (
		<div className="Deck">
			<button onClick={drawCard}>Draw a Card</button>
			{deck.drawnCards.map(c => (<Card key={c.code} imageUrl={c.image} value={c.value} suit={c.suit} />))}
		</div>
	)
}

export default Deck;