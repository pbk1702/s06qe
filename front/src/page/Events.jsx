import { useEffect } from "react";
import api_fetch from "@/api_fetch.js";

const Page = () => {
  useEffect ( () => {
    const fetchEvents = async () => {
      const resp = await api_fetch("/events", "GET");
      const error = resp?.error;
      if( error ) {
        return;
      }
      const events = resp?.events ?? [];
      
    }
  })

  return (
    <>
    <h1>Блог / Мероприятия</h1>    
    <h2>Анонсы событий</h2>

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