import React, {useState, useEffect} from "react";
import {useNavigate, useParams, Link} from "react-router-dom";
import {readDeck} from "./../utils/api/index"
import StudyCardView from "./StudyCardView"
import StudyTooFew from "./StudyTooFew";

function Study(){
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
     }, []);

  return(
    <div>
        <p><Link to="/">Home</Link> / <Link to={`/decks/${deckId}`}>{deck.name}</Link> / Study</p>
        <h1>{deck.name}: Study</h1>
        {cards.length>2 ? <StudyCardView cards={cards}/> : <StudyTooFew count={cards.length} />  }
    </div>
  )
}

export default Study;