import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try{
      console.log("Received Data : ",createCategoryDto)
      await this.categoriesService.create(createCategoryDto);
      return { message: 'Category Created Successfully.' };
    }catch(error){
      return { message: error.message}
      }
  }

  @Get()
  async findAll() {
    try{
      return await this.categoriesService.findAll();
    }catch(error){
      return { message: error.message}
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try{
      return await this.categoriesService.findOne(id);
    }catch(error){
      return { message: error.message}
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    try{
      return await this.categoriesService.update(id, updateCategoryDto);
    }catch(error){
      return { message: error.message}
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try{
      await this.categoriesService.delete(id);
      return {message : "Category Deleted Successfully"}
    }catch(error){
      return { message: error.message}
    }
  }
}
