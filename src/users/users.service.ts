import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ErrorHandlerService } from '../common/error-handler.service';
import { executeWithTransaction } from 'src/common/utils/query-runner.util';
import { EncoderService } from 'src/common/encoder.service';
import { ActivateUserDto } from './dto/activate-user.dto';
import { ValidRoles } from './interfaces/valid-roles';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  constructor(
    private readonly errorHandlerService: ErrorHandlerService,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly dataSource: DataSource,
    private encoderService: EncoderService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await executeWithTransaction(
        this.dataSource,
        async (queryRunner) => {
          const user = await this.prepareUserForTransaction(createUserDto);
          user.roles = [ValidRoles.user];
          await queryRunner.manager.save(user);
          return user;
        },
      );
    } catch (error) {
      this.errorHandlerService.handleDBException(error);
    }
  }

  async prepareUserForTransaction(createUserDto: CreateUserDto): Promise<User> {
    const findUser = await this.finOneByEmail(createUserDto.email);
    if (findUser) {
      throw new BadRequestException('Email already in use');
    }
    const { password, ...rest } = createUserDto;
    const user = this.usersRepository.create({
      ...rest,
      password: bcrypt.hashSync(password, 10),
    });
    user.activationToken = await this.encoderService.generateToken();

    return user;
  }

  async finOneByEmail(email: string): Promise<User> {
    const user: User = await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
    return user;
  }

  async findOneById(id: string): Promise<User> {
    return this.usersRepository.findOneOrFail({ where: { id } });
  }

  async findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username });
  }

  async activateUser(activateUserDto: ActivateUserDto) {
    const { activationToken } = activateUserDto;
    const user = await this.usersRepository.findOneBy({ activationToken });

    if (!user) {
      throw new BadRequestException('Invalid or expired token');
    }

    user.is_active = true;
    user.activationToken = null;
    await this.usersRepository.save(user);

    return {
      message: 'Account actived successfully',
    };
  }

  async getUserById(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    console.log(user);
    return user;
  }

  async updateUser(updateUserDto: UpdateUserDto, id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    await this.usersRepository.update(id, updateUserDto);
    return {
      message: 'User updated successfully',
    };
  }
}
