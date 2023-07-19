import {Schema, model} from 'mongoose'

const SessionSchema = new Schema({
    userId: String,
});

export const Session = model('Dogs', SessionSchema)