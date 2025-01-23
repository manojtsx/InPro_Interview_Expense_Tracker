import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async validateUser(loginDto: LoginDto) {
    try{

      const { email, password } = loginDto;
      
      // Find the user by email
      const user: User | null = await this.usersService.findByEmail(email);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
    }

    // Compare the provided password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    // Generate and return JWT
    const payload = { sub: user._id, email: user.email };
    const token = this.jwtService.sign(payload);
    // Return a response or token
    return { message: 'Login successful', accessToken: token, userId : user._id };
  }catch(error){
    return {message : error.message}
  }
  }
}
