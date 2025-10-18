import { useEffect } from "react";
import { useState } from "react";
import api_fetch from "@/api_fetch.js";
import Slider from '@/page/Slider.jsx';
import { NavLink } from "react-router";

const Form = ({ setClient }) => {
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
    const { name, text } = input;
    const valid = name && text;
    if(! valid ) {
      alert("Все поля должны быть заполнены");
      return;
    }
    const data = { name, text };
    const resp = await api_fetch("/clients", "POST", data);
    const error = resp?.error;    
    if( error ) {
      alert( error );
      return;
    }    
    setInput({})
    if( resp?.client ) setClient( resp.client );
    alert( resp?.message || "Отзыв успешно опубликован");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-w-[40ch] space-y-2">
      <input name="name" type="text" placeholder="Ваше имя" value={input?.name ?? ""} onInput={ handleInput } />
      <textarea name="text" placeholder="Текст отзыва" value={input?.text ?? ""} onInput={ handleInput } />
      <button>Отправить</button>
    </form>
  )
}


const Page = () => {

  const [clients, setClients] = useState([]);

  useEffect( () => {
    const fetchClients = async () => {
      const resp = await api_fetch("/clients");
      const error = resp?.error;
      if( error) return;      
      setClients ( resp?.clients ?? [] );
    }
    fetchClients();      
  }, [])

  const setClient = ( client ) => {        
    const ns = [...clients];
    const index =  ns.findIndex( v => v._id === client?._id );
    if(index >= 0) {
      ns[index] = client;
    } else {
      ns.push( client );
    }
    setClients( ns );
  }

  return (
    <>
    <h1>Главная</h1>    
    <div>
    <p>Наша кофейня — это гармоничное пространство, где каждый гость может погрузиться в мир любимых книг за чашечкой ароматного кофе, наслаждаясь атмосферой спокойствия и умиротворения.</p>
    <p>Уютные кресла, тщательно подобранная коллекция литературы и безупречный кофе создают особую атмосферу, где время словно замедляется, позволяя отвлечься от суеты и погрузиться в чтение.</p>
    <p>Мы создали идеальное место для тех, кто ценит интеллектуальный досуг: здесь можно не только насладиться великолепным кофе, но и провести время с пользой, листая страницы любимых книг в комфортной обстановке.</p>
    </div>
    <h2>Слайдер</h2>
    <Slider />
  
    <div className="flex flex-row flex-wrap -mx-2 justify-center">
      <NavLink className="w-full md:w-4/12 p-2" to="/products"><button className="w-full">Посмотреть меню</button></NavLink>
      <NavLink className="w-full md:w-4/12 p-2" to="/order"><button className="w-full">Забронировать столик</button></NavLink>
      <NavLink className="w-full md:w-4/12 p-2" to="/contacts"><button className="w-full">Контакты</button></NavLink>
    </div>

    <h2>Отзывы клиентов</h2>      
    { clients.map( v => {
      return (
        <div className="space-y-2" key={ v._id } >
          <h6>{ v.name ?? "" }</h6>
          <p>{ v.text ?? "" }</p>
        </div>
      )
    }) }

    <h2>Форма отправки отзыва</h2>      
    <Form setClient={setClient}/>
    </>
  )
}

export default Page;