import {Schema, model} from 'mongoose'

const DogSchema = new Schema({
    name: String,
    age: Number
});

export const DogModel = model('Dogs', DogSchema)