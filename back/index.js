import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import config from './config.js';

console.clear();

const app = express()
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  return res.status(200).json({ message: "hello" });
})

import Event from './Event.js'
import EventCategory from './EventCategory.js';
app.get("/events", async (req, res) => {
  
  let events
  try {
    events = await Event.find({}) ?? [];    
  } catch ( e ) {
    console.error( e );
    return res.status(400).json({ error: "Ошибка при получении списка мероприятий из базы данных" });
  } 

  let eventCategories
  try {
    eventCategories = await EventCategory.find({}) ?? []; 
  } catch ( e ) {
    console.error( e );
    return res.status(400).json({ error: "Ошибка при получении списка категорий событий из базы данных" });
  } 
  
  return res.status(200).json({ events, eventCategories });
})

app.post("/event-participate", async (req, res) => {

  let { event, member } = req?.body;

  const valid = event && event?._id && member && member?.email;

  if(! valid) {
    return res.status(400).json({ error: "Недостаточно параметров" });
  }

  event = await Event.findById( event._id );

  if(! event) {
    return res.status(400).json({ error: "События с таким id не найдено" });
  }

  const members = event.members ?? [];
  if( event.members.find( v => v.email == member.email )) {
    return res.status(400).json({ error: "Вы уже в списке участников события" });
  }

  event.members.push({ email: member.email })  

  try {
    await event.save();
  } catch ( e ) {
    console.error( e );
    return res.status(400).json({ error: "Ошибка при сохранении статуса участия в базе данных " });
  } 
  
  return res.status(200).json({ message: "Вы успешно записались в участники мероприятия" });
})


import Product from './Product.js';
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({}) ?? [];
    return res.status(200).json({ products });
  } catch ( e ) {
    console.error( e );
    return res.status(400).json({ error: "Ошибка при получении каталога товаров из базы данных" });
  }  
})


import Client from './Client.js';
app.get("/clients", async (req, res) => {
  try {
    const clients = await Client.find({}) ?? [];
    return res.status(200).json({ clients });
  } catch ( e ) {
    console.error( e );
    return res.status(400).json({ error: "Ошибка при получении отзывов из базы данных" });
  }  
})

app.post("/clients", async (req, res) => {

  const { name, text } = req?.body;

  const valid = name && text;
  if( ! valid ) {
    return res.status(400).json({ error: "Все поля должны быть заполнены" });
  }
  const client = new Client({ name, text });
  try {
    await client.save();
    return res.status(200).json({ 
      client,
      message: "Отзыв успешно отправлен"
     });
  } catch ( e ) {
    console.error( e );
    return res.status(400).json({ error: "Ошибка при сохранении отзыва в базе данных" });
  }
})

import Feedback from './Feedback.js';
app.post("/feedback", async (req, res) => {

  const { name, email, text } = req?.body;

  const valid = name && email && text;
  if( ! valid ) {
    return res.status(400).json({ error: "Все поля должны быть заполнены" });
  }
  const feedback = new Feedback({ name, email, text });
  try {
    await feedback.save();
    return res.status(200).json({ message: "Сообщение успешно отправлено" });
  } catch ( e ) {
    console.error( e );
    return res.status(400).json({ error: "Ошибка при сохранении сообщения в базе данных" });
  }

})

import Order from './Order.js';
app.post("/order", async (req, res) => {  

  const { datetime, qty, name, phone } = req?.body;

  const valid = datetime && qty && name && phone;
  if( ! valid ) {
    return res.status(400).json({ error: "Все поля должны быть заполнены" });
  }
  const order = new Order({ datetime, qty, name, phone });
  try {
    await order.save();
    return res.status(200).json({ message: "Заказ на бронирование успешно оформлен" });
  } catch ( e ) {
    console.error( e );
    return res.status(400).json({ error: "Ошибка при сохранении заказа на бронирование в базе данных" });
  }

})


const main = async () => {
  console.log('start mongoose on', config.db);
  await mongoose.connect( config.db );
  console.log("ok");  
  console.log('start express on', config.port);
  app.listen( config.port );
  console.log("ok");
}

main().catch( e => { console.error( e )});