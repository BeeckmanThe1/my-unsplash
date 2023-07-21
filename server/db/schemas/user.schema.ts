import {Schema, model} from 'mongoose'

export type UserType = {
    username: string,
    pwd: string,
}

const UserSchema = new Schema<UserType>({
    username: String,
    pwd: String
});

export const User = model('Users', UserSchema)