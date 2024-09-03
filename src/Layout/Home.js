import React,{useState,useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import HomeDeck from "./HomeDeck"
import {listDecks, deleteDeck} from "./../utils/api/index"
//import DeckView from "./DeckView"

function Home({}){
  const [decks, setDecks] = useState([]);
  const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const abortController = new AbortController();
            try {
                const deckResponse = await listDecks(abortController.signal);
                setDecks(deckResponse);
            } catch (error) {
                console.error("Something went wrong", error);
            }
            return () => {
                abortController.abort();
            };
        }
        fetchData();
    }, []); 
    const handleDeleteDeck = async (deck) => {
      if (
          window.confirm(
              `Delete this deck? You will not be able to recover it`
          )
      ) {
          const abortController = new AbortController();
          try {
              navigate(0);
              return await deleteDeck(deck.id, abortController.signal);
          } catch (error) {
              console.error("Something went wrong", error);
          }
          navigate(0);
          return () => {
              abortController.abort();
          };
      }
  }
  
  const toCreate = () => navigate('/decks/new');
  return(
    <div>
      <button id="createDeck" onClick={toCreate} >Create Deck</button>
      {decks.map((deck)=> <HomeDeck deck={deck} delete={()=>handleDeleteDeck(deck)}/>)}
      </div> 
  )
}

export default Home;