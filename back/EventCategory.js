import mongoose, { mongo } from "mongoose";

const schema = new mongoose.Schema({  
  id: { type: Number },
  name: { type: String },  
  text: { type: String },   
});

export default mongoose.model("EventCategory", schema);

/*

1
# Анонсы культурных событий
## Встречи с авторами

2
# Мастер-классы
## Творческие мастерские

3
# Литературные мероприятия
## Книжный клуб и презентации

*/