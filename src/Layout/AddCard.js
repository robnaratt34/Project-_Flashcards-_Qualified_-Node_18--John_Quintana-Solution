import React, {useState, useEffect} from "react";
import {useNavigate, useParams, Link} from "react-router-dom";
import {readDeck, createCard} from "./../utils/api/index"

function AddCard(){
    const location = useNavigate();
  const initialState= {
    front: "",
    back: "",
  }
  const [formData, setFormData] = useState({ ...initialState});
  const {deckId} = useParams();
  const [deck, setDeck] = useState({});

    useEffect(() => {
        async function fetchData() {
             const abortController = new AbortController();
                try {
                    const response = await readDeck(deckId, abortController.signal);
                    setDeck(response);
                } catch (error) {
                    console.error("Something went wrong", error);
                }
            return () => {
                abortController.abort();
                };
        }
        fetchData();
    }, []);
  const handleChange = ({target}) =>{
    setFormData({
      ...formData,
      [target.name]: target.value,
    })
  }
  async function submitCreate(event) {
    event.preventDefault();
    const abortController = new AbortController();
    const response = await createCard(
        deckId,
        { ...formData },
        abortController.signal
    );
    location(0);
    setFormData(...initialState);
    return response;
}

  return(
    <div>
        <p><Link to="/">Home</Link> / <Link to={`/decks/${deckId}`}>{deck.name}</Link>  Add Card</p>
        <p>Add Card</p>
    <h1>{deck.name}: Add Card</h1>
    <form onSubmit={submitCreate}>
      <label htmlFor="front">
        Front Side
        <br />
        <textarea  
          id="front"
          type="textarea"
          name="front"
          onChange={handleChange}
          value={formData.front}
          placeholder="Front Side of Card"
          />
      </label>
      <br />
      <label htmlFor="back">
        Back Side
        <br />
        <textarea
          id="back"
          type="textarea"
          name="back"
          onChange={handleChange}
          value={formData.back}
          placeholder="Back side of card"
          />
      </label>
      <br />
      <button onClick={()=>location(`/decks/${deckId}`)}>Done</button>
      <button id="submit" type="submit">Save</button>
      </form>
      </div>
  )
}

export default AddCard