import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

function StudyCardView({cards}){
    const navigate = useNavigate();
    const [side, setSide] = useState("front")
    const [id, setId] = useState(1)
    const [currentCard, setCurrentCard] = useState(cards[id-1])
    const nextCard = ()=>{
        if (id>=cards.length){
            if(
                window.confirm(
                    `Restart Cards? \n\n Click 'cancel' to return home` 
                )
            ){
                setId(1)
                setCurrentCard(cards[0])
                setSide("front")
            }else{
                navigate('/')
            }
        }else{
            setId((id)=>id+1)
            setCurrentCard(cards[id])
            setSide("front")
        }
    }
    if (side==="front"){
        return(
            <div>
                <h3>Card {id} of {cards.length}</h3>
                <p>{currentCard.front}</p>
                <button onClick={()=>setSide("back")}>Flip</button>
            </div>
        )
    }else{
        return(
            <div>
                <h3>Card {id} of {cards.length}</h3>
                <p>{currentCard.back}</p>
                <button onClick={()=>setSide("front")}>Flip</button>
                <button onClick={nextCard}>Next Card</button>
            </div>
        )
    }
}

export default StudyCardView