import React, {useState, useEffect} from "react";
import {useNavigate, useParams, Link} from "react-router-dom";
import {readDeck} from "./../utils/api/index"
import StudyCardView from "./StudyCardView"
import StudyTooFew from "./StudyTooFew";

function Study(){
    const navigate = useNavigate();
    const {deckId} = useParams();
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    const [side, setSide] = useState("front")
    const [id, setId] = useState(1)
    const [cardId, setCardId] = useState(0)
    
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

    

     const nextCard = ()=>{
        if (id>=cards.length){
            if(
                window.confirm(
                    `Restart Cards? \n\n Click 'cancel' to return home` 
                )
            ){
                setId(1)
                setCardId(0)
                setSide("front")
            }else{
                navigate('/')
            }
        }else{
            setId((id)=>id+1)
            setCardId(id)
            setSide("front")
        }
    }

  return(
    <div>
        <p><Link to="/">Home</Link> / <Link to={`/decks/${deckId}`}>{deck.name}</Link> / Study</p>
        <h1>{deck.name}: Study</h1>
        {cards.length>2 ? <StudyCardView cards={cards} nextCard={nextCard} side={side} setSide={setSide} cardId={cardId} id={id}/> : <StudyTooFew count={cards.length} />  }
    </div>
  )
}

export default Study;