import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private mailerService: MailerService,
    @InjectRepository(Users) private userPerository: Repository<Users>,
  ) {}

  async sendmagicLink(email: string) {
    const token = this.jwtService.sign({ email }, { expiresIn: '15m' });
    const magicLink = `http://localhost:3000/auth/verify-magic-link/?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Regiatrate With Only email',
      text: `Click here to registarte: ${magicLink}`,
      html: `<a href="${magicLink}">Login</a>`,
    });

    return { message: 'magic link send' };
  }

  async verifyMagicLink(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const existing_user = this.userPerository.findOneBy({
        email: payload.email,
      });
      if (!existing_user) {
        const new_user = this.userPerository.create({
          email: payload.email,
          username: 'new user',
          password: this.jwtService.sign({ text: 'newuser' }),
        });

        await this.userPerository.save(new_user);

        return this.jwtService.sign(new_user);
      } else {
        return this.jwtService.sign(existing_user);
      }
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  async getYourProfile(token: string) {
    try {
      const profile = this.jwtService.verify(token);
      return profile;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}
