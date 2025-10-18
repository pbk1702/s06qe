import { useState } from "react";
import api_fetch from "@/api_fetch.js";

const Page = () => {
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
    const { datetime, qty, name, phone } = input;
    const valid = datetime && qty && name && phone;
    if(! valid ) {
      alert("Все поля должны быть заполнены");
      return;
    }
    const data = { datetime, qty, name, phone };
    const resp = await api_fetch("/order", "POST", data);
    const error = resp?.error;    
    if( error ) {
      alert( error );
      return;
    }
    setInput({})    
    alert( resp?.message || "Заказ на бронирование успешно отправлен");
  }

  return (
    <>
    <h1>Бронировние столиков</h1>
    <form onSubmit={handleSubmit} className="flex flex-col max-w-[40ch] space-y-2">
      <input name="datetime" type="datetime-local" placeholder="Дата и время" value={input?.datetime ?? ""} onInput={ handleInput } />
      <input name="qty" type="number" min="1" max="10" placeholder="Количество гостей" value={input?.qty ?? ""} onInput={ handleInput } />
      <input name="name" type="text" placeholder="Ваше имя" value={input?.name ?? ""} onInput={ handleInput } />
      <input name="phone" type="phone" placeholder="Контактный телефон" value={input?.phone ?? ""} onInput={ handleInput } />      
      <button>Отправить</button>
      <button onClick={ (e) => { e.preventDefault(); setInput({}); }}>Сброс</button>
    </form>
    </>
  )
}

export default Page;