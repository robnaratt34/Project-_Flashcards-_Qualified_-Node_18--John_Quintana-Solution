import React, {useState,useEffect} from "react";
import {useNavigate, useParams, Link} from "react-router-dom";
import DeckView from "./DeckView"
import DeckCardView from "./DeckCardView"
import {readDeck,deleteDeck,deleteCard} from "./../utils/api/index"

function Deck(){
  const navigate = useNavigate()
  const {deckId} = useParams();
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
      async function fetchData() {
          const abortController = new AbortController();
          try {
              const deckResponse = await readDeck(
                  deckId,
                  abortController.signal
              );
              setDeck(deckResponse);
              setCards(deckResponse.cards);
          } catch (error) {
              console.error("Something went wrong", error);
          }
          return () => {
              abortController.abort();
          };
      }
      fetchData();
  }, [deckId]);
  const handleDeleteDeck = async (deck) => {
      if (
          window.confirm(
              `Delete this deck? You will not be able to recover it`
          )
      ) {
          const abortController = new AbortController();
          try {
              navigate("/");
              return await deleteDeck(deck.id, abortController.signal);
          } catch (error) {
              console.error("Something went wrong", error);
          }
          return () => {
              abortController.abort();
          };
      }
  }

  const handleDeleteCard= async (card) =>{
      if (
          window.confirm(
              `Delete this card? You will not be able to recover it`
          )
      ) {
          const abortController = new AbortController();
          try {
              navigate(0);
              return await deleteCard(card.id, abortController.signal);
          } catch (error) {
              console.error("Something went wrong", error);
          }
          navigate(0);
          return () => {
              abortController.abort();
          };
          
      }
  }
  
  return(
    <div>
      <p><Link to="/">Home</Link> / {deck.name}</p>
      <DeckView deck={deck} delete={()=>handleDeleteDeck(deck)} />
      <h2>Cards</h2>
      {cards.map((card)=> <DeckCardView card={card} delete={()=>handleDeleteCard(card)}/>)}
      
      </div>
  )
}

export default Deck