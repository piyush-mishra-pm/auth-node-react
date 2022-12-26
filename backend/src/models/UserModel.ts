import {Document, Schema, model} from 'mongoose';

export interface UserDocument extends Document{
    first_name: string;
    last_name:string;
    email: string;
    password: string;
};

const UserSchema = new Schema<UserDocument>({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: false,
    },
    email:{
        type: String,
        unique:true,
        required: true,
    },
    password:{
        type: String,
        required: true
    }
});

export const UserModel = model<UserDocument>('user',UserSchema);

