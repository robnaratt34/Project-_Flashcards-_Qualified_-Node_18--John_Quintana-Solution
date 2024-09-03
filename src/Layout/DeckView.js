import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

function DeckView(props){
  const params = useParams();
  const navigate = useNavigate()
  const {deck} = props
  const deckId = params.deckId
  const toEdit= ()=> navigate(`/decks/${deckId}/edit`)
  const toStudyView = ()=> navigate(`/decks/${deck.id}/study`);
  
  return(
    <div id={deck.id}>
      <h3>{deck.name}</h3> 
      <p>{deck.description}</p>
      <button onClick={toEdit} >Edit</button>
      <button onClick={toStudyView}>Study</button>  
      <button onClick={props.delete}>Delete</button>
    </div>
  )
}

export default DeckView