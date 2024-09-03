import React from "react";
import { useNavigate } from "react-router-dom";

function HomeDeck(props) {
  const navigate = useNavigate();
  const {deck} = props
  const toDeckView = ()=> navigate(`/decks/${deck.id}`);
  const toStudyView = ()=> navigate(`/decks/${deck.id}/study`);
  return(
    <div id={deck.id}>
      <h3>{deck.name}</h3> 
      <p>{deck.cards.length} cards</p>
      <p>{deck.description}</p>
      <button onClick={toDeckView}>View</button>
      <button onClick={toStudyView}>Study</button>
      <button onClick={props.delete}>Delete</button>
      </div>
  )
}

export default HomeDeck;