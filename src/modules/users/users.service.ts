import { AuthService } from '@/auth/auth.service';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../../schemas/user.schema';
import { CreateUserInput, LoginResult } from './dto/users-inputs.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly config: ConfigService,
    @InjectRepository(Users) private userModel: Repository<Users>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService
  ) {}

  async create(createUserInput: CreateUserInput): Promise<LoginResult> {
    try {
      const user = new Users();
      user.email = createUserInput.email;
      user.password = createUserInput.password;
      user.wallet = createUserInput.wallet;

      await this.userModel.save(user);
      const token = await this.authService.createJwt(user);

      return { user, token: token.token };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOneByEmail(email: string): Promise<Users | undefined> {
    const user = await this.userModel.findOne({
      where: { email: email.toLowerCase() },
    });

    if (user) return user;
    return undefined;
  }

  async deleteAllUsers(): Promise<void> {
    await this.userModel.delete({});
  }
}
