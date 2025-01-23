import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    console.log(createCategoryDto)
    const newCategory = new this.categoryModel(createCategoryDto);
    const result = await newCategory.save();
    if(!result){
      throw new Error("Couldnot create category");
    }
    return result;
  }

  async findAll(userId : string): Promise<Category[]> {
    const result = await this.categoryModel.find({userId}).populate('userId','name email').exec();
    if(!result){
      throw new Error("No categories found");
    }
    return result;
  }

  async findOne(id: string): Promise<Category | null> {
    const result = await this.categoryModel.findById(id).populate('userId').exec();
    if(!result){
      throw new Error("No category found");
    }
    return result;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category | null> {
    const result = await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true }).exec();
    if(!result){
      throw new Error("Category not found");
    }
    return result;
  }

  async delete(id: string): Promise<Category | null> {
    return this.categoryModel.findByIdAndDelete(id).exec();
  }
}
