import React, {useState, useEffect} from "react";
import {useNavigate, useParams, Link} from "react-router-dom";

function StudyTooFew({count}){
    const {deckId} = useParams();
    const navigate = useNavigate();
    const toAdd = ()=>navigate(`/decks/${deckId}/cards/new`)
    return(
        <div>
            <h2>Not Enough Cards</h2>
            <p>You need at least 3 cards to study. There are {count}  cards in this deck.</p>
            <button onClick={toAdd}>Add Card</button>
        </div>
    )
}

export default StudyTooFew