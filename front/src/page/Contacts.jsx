import { useState } from "react";
import api_fetch from "@/api_fetch.js";

const Form = () => {
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
    const { name, email, text } = input;
    const valid = name && text;
    if(! valid ) {
      alert("Все поля должны быть заполнены");
      return;
    }
    const data = { name, email, text };
    const resp = await api_fetch("/feedback", "POST", data);
    const error = resp?.error;    
    if( error ) {
      alert( error );
      return;
    }    
    setInput({})    
    alert( resp?.message || "Сообщение успешно отправлено");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-w-[40ch] space-y-2">
      <input name="name" type="text" placeholder="Ваше имя" value={input?.name ?? ""} onInput={ handleInput } />
      <input name="email" type="email" placeholder="Адрес эл. почты" value={input?.email ?? ""} onInput={ handleInput } />
      <textarea name="text" placeholder="Сообщение" value={input?.text ?? ""} onInput={ handleInput } />
      <button>Отправить</button>
      <button onClick={ (e) => { e.preventDefault(); setInput({}); }}>Сброс</button>
    </form>
  )
}

const Page = () => {
  return (
    <>
    <h1>Контакты</h1>            
    <h2>Карта с расположением кофейни</h2>
    <img src="/map.png" alt="Карта" className="max-w-[40ch] mb-8"/>
    <h2>Форма обратной связи</h2>
    <Form />
    <h2>График работы</h2>    
    <p>пн, вт, ср, чт, пт: 8:00 - 19:00</p>
    <p>сб,  вс: 8:00 - 16:00</p>    

    </>
  )
}

export default Page;