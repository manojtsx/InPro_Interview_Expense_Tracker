import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try{
      console.log("Received Data : ",CreateUserDto)
     await this.usersService.create(createUserDto);
     return {message : "User Created Successfully."}
    }catch(error){
      return {message : error.message}
    }
  }

  @Get()
  async findAll() {
    try{
      return await this.usersService.findAll();
    }catch(error){
      return {message : error.message}
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try{

      return await this.usersService.findOne(id);
    }catch(error){
      return {message : error.message}
    }
  }

  @Delete(':id')
  async delete(@Param('id') id:string){
    try{
      await this.usersService.delete(id);
      return {message : 'User Deleted Successfully'}
    }catch(error){
      return {message : error.message}
    }
  }

}
