import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

function DeckCardView(props){
  const {deckId} = useParams();
  const location = useNavigate();
  const {card} = props
  const toEdit=()=>location(`/decks/${deckId}/cards/${card.id}/edit`)
  return(
    <div>
      <p>{card.front}</p>
      <p>{card.back}</p>
      <button onClick={toEdit}>Edit</button>
      <button onClick={props.delete}>Delete</button>
      </div>
  )
}

export default DeckCardView