import React, {useState, useEffect} from "react";
import {useNavigate, Link, useParams} from "react-router-dom";
import {readDeck, updateDeck} from "./../utils/api/index"

function EditDeck({decks}){
  const {deckId} = useParams();  
  const location = useNavigate();
  const initialState= {
    id: "",
    name: "",
    description: "",
  }
  const [deck, setDeck] = useState(initialState);
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
  }, [deckId]);
  const handleChange = ({target}) =>{
    setDeck({
      ...deck,
      [target.name]: target.value,
    })
  }
  async function submitCreate(event) {
    event.preventDefault();
    const abortController = new AbortController();
    const response = await updateDeck( deck, abortController.signal);
    location(`/decks/${deckId}`);
    return response;
}
  return(
    <div>
      <p><Link to="/">Home</Link> / <Link to={`/decks/${deckId}`}>{deck.name}</Link> / Edit Deck</p>
    <h1>Edit Deck</h1>
    <form onSubmit={submitCreate}>
      <label htmlFor="name">
        Name
        <br />
        <input  
          id="name"
          type="text"
          name="name"
          onChange={handleChange}
          value={deck.name}
          placeholder="Deck Name"
          />
      </label>
      <br />
      <label htmlFor="description">
        Description
        <br />
        <textarea
          id="description"
          type="textarea"
          name="description"
          onChange={handleChange}
          value={deck.description}
          placeholder="Brief Description of the deck"
          />
      </label>
      <br />
      <button onClick={()=>location(`/decks/${deckId}`)}>Cancel</button>
      <button id="submit" type="submit">Submit</button>
      </form>
      </div>
  )
}

export default EditDeck;