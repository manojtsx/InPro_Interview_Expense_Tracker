import { Injectable, Post,Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel: Model<User>){}

    async create(createUserDto: CreateUserDto): Promise<User> {
        // check whether email is unique or not
        const user = await this.userModel.findOne({email : createUserDto.email}).exec();
        if(user){
          throw new Error("Email already exists")
        }
        const createdUser = new this.userModel(createUserDto);
        const result = await createdUser.save();
        if(!result){
          throw new Error("Couldnot create user");
        }
        return result;
      }
    
      async findAll(): Promise<User[]> {
        const users = await this.userModel.find().exec();
        if(users.length === 0){
          throw new Error("No Users Found")
        }
        return users;
      }
    
      async findOne(id: string): Promise<User | null> {
        const user = await this.userModel.findById(id).exec();
        if(!user){
          throw new Error("No User Found")
        }
        return user;
      }

      async findByEmail(email : string): Promise<User | null>{
        const user = await this.userModel.findOne({email}).exec();
        if(!user){
          throw new Error("No User Found")
        }
        return user;
      }
      async delete(id: string): Promise<User | null> {
        const result =  await this.userModel.findByIdAndDelete(id).exec();
        if(!result){
          throw new Error('User not found')
        }
        return result;
      }

      async update(id: string, createUserDto: CreateUserDto): Promise<User | null> {
        const result = await this.userModel.findByIdAndUpdate(id, createUserDto, {new: true}).exec();
        if(!result){
          throw new Error('User not found')
        }
        return result;
      }
}
