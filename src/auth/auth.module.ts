import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from 'src/mailers/mailer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/database/entities/user.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: 'coder-test-np924uhbfrc09837fg',
    }),
    EmailModule,
    TypeOrmModule.forFeature([Users])
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
