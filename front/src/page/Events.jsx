import { useEffect } from "react";
import api_fetch from "@/api_fetch.js";
import { useState } from "react";

import FormParticipate from '@/page/FormParticipate.jsx';


const Page = () => {
  
  const [events, setEvents] = useState([]);

  useEffect ( () => {
    const fetchEvents = async () => {
      const resp = await api_fetch("/events", "GET");
      const error = resp?.error;
      if( error ) {
        return;
      }
      let events = resp?.events ?? [];
      events.forEach( v => { 
        v.datetime = new Date ( v.datetime ?? "" );
      })
      setEvents( events );
    }
    fetchEvents();    
  })

  return (
    <>
    <h1>Блог / Мероприятия</h1>    
    <h2>Анонсы событий</h2>
    <div className="flex flex-row flex-wrap space-y-8">
    { events.map( v => { 
      return (
        <div key={ v._id } className="flex flex-col w-full">          
          <h3>{v.name ?? ""}</h3>
          <div>Дата: {String( v.datetime )}</div>
          <div>{v.cat ?? ""}</div>
          <div dangerouslySetInnerHTML={{ __html: v.text ?? "" }} />
          <h3>Запись на участие</h3>
          <FormParticipate event={v} />
        </div>
      )
    }) }
    </div>    
    <h2>Архив прошедших событий</h2>
    </>
  )
}

export default Page;

/*

	Анонсы событий (встречи с авторами, книжные клубы, мастер-классы).
	Возможность регистрации на мероприятие.
	Архив прошедших событий с фотоотчётами.

*/