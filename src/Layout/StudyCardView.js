import React from "react";

function StudyCardView(props){
    const {cards, cardId, id, side, setSide, nextCard} = props    
    
    if (side==="front"){
        return(
            <div>
                <h3>Card {id} of {cards.length}</h3>
                <p>{cards[cardId].front}</p>
                <button onClick={()=>setSide("back")}>Flip</button>
            </div>
        )
    }else{
        return(
            <div>
                <h3>Card {id} of {cards.length}</h3>
                <p>{cards[cardId].back}</p>
                <button onClick={()=>setSide("front")}>Flip</button>
                <button onClick={nextCard}>Next Card</button>
            </div>
        )
    }
}

export default StudyCardView