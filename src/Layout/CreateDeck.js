import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {createDeck, listDecks} from "./../utils/api/index"

function CreateDeck(){
  const location = useNavigate();
  const initialState= {
    name: "",
    description: "",
  }
  const [formData, setFormData] = useState({ ...initialState});
  const handleChange = ({target}) =>{
    setFormData({
      ...formData,
      [target.name]: target.value,
    })
  }
  const submitCreate= async (event) =>{
    event.preventDefault();
    const abortController = new AbortController();
    const response = await createDeck(
        formData,
        abortController.signal
    );
    const decks = await listDecks();
    const newDeckId = Math.max(...decks.map(deck => deck.id));
    location(`/decks/${newDeckId}`);
    return response;
}
  return(
    <div>
    <h1>Create Deck</h1>
    <form onSubmit={submitCreate}>
      <label htmlFor="name">
        Name
        <br />
        <input  
          id="name"
          type="text"
          name="name"
          onChange={handleChange}
          value={formData.name}
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
          value={formData.description}
          placeholder="Brief Description of the deck"
          />
      </label>
      <br />
      <button onClick={()=>location('/')}>Cancel</button>
      <button id="submit" type="submit">Submit</button>
      </form>
      </div>
  )
}

export default CreateDeck;