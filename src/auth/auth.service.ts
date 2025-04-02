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
    const magicLink = `http://localhost:${process.env.PORT}/auth/verify-magic-link/?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Regiatrate With Only email',
      text: `Click here to registarte: ${magicLink}`,
      html: `<a href="${magicLink}">Login</a>`,
    });

    return { message: 'magic link send' };
  }

  async verifyMagicLink(token: string) {
    const payload = this.jwtService.verify(token);
    console.log('Decoded Payload:', payload);

    const existing_user = await this.userPerository.findOneBy({
      email: payload.email,
    });
    console.log('Existing User:', existing_user);

    if (!existing_user) {
      const new_user = this.userPerository.create({
        email: payload.email,
        username: 'new user',
        password: 'hashedpasswordhere', // Use a real hash function
        created_at: new Date(),
      });

      await this.userPerository.save(new_user);
      return this.jwtService.sign({ id: new_user.id, email: new_user.email });
    } else {
      return this.jwtService.sign({
        id: existing_user.id,
        email: existing_user.email,
      });
    }
  }

  async getYourProfile(token: string) {
    try {
      const profile = this.jwtService.verify(token);
      return profile;
    } catch (error) {
      throw new Error(error);
    }
  }
}
