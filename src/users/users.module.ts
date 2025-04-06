import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
    CommonModule,
  ],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
