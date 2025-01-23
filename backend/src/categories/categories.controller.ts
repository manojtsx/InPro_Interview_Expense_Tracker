import { Controller, Get, Post, Body, Param, Put, Delete, Req } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './schemas/category.schema';

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
  async findAll(@Req() req) : Promise<Category[] | { message: string }> {
    try{
      const userId = req.user.sub;
      console.log("User Id : ",userId)
      return await this.categoriesService.findAll(userId);
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
      const result = await this.categoriesService.update(id, updateCategoryDto);
      if(!result) throw new Error("Category not found");
      return { message: 'Category Updated Successfully.' };
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
