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