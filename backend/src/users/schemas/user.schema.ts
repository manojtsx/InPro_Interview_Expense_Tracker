import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as bcrypt from 'bcrypt'

@Schema({timestamps : true})
export class User extends Document{
    @Prop({required: true})
    name :string;

    @Prop({required :true})
    email :string;

    @Prop({required : true})
    password : string;

    @Prop({required :  true})
    currency : string;

    @Prop({default : Date.now()})
    createdAt : Date;

    @Prop({default : Date.now})
    updatedAt : Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }

    //Hash the password
    const salt = 10;
    this.password = await bcrypt.hash(this.password, salt);
    next();
})