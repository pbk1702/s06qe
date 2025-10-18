import { useState } from "react";
import api_fetch from "@/api_fetch.js";

const Form = ({ event }) => {
  const [input, setInput] = useState({ });
    
  const handleInput = ( e ) => {
    let { name, value, type, checked } = e.target;

    const n = Object.assign( {}, input );

    if( type === "checkbox" ) value = checked;
    if( value ) {
      n[ name ] = value;
    } else {
      delete n[ name ];
    }

    setInput(n)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email } = input;
    const valid = email;
    if(! valid ) {
      alert("Все поля должны быть заполнены");
      return;
    }
    const data = {
      event: { _id: event._id },
      member: { email },      
    };
    const resp = await api_fetch("/event-participate", "POST", data);
    const error = resp?.error;    
    if( error ) {
      alert( error );
      return;
    }
    setInput({})    
    alert( resp?.message || "Вы записались на участие в событии");
  }


  return (
    <form onSubmit={ handleSubmit } className="flex flex-row flex-wrap">
      <input type="email" name="email" placeholder="ваш адрес эл. почты" onInput={ handleInput } value={ input?.email ?? "" } />
      <button>Участвовать</button>
      <button onClick={(e) => { e.preventDefault(); setInput({}) }}>Сброс</button>
    </form>
  )

}

export default Form;