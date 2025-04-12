import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Users } from 'src/database/entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
// import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private mailerService: MailerService,
    private prisma: PrismaService,
  ) {}

  async sendmagicLink(email: string) {
    const token = this.jwtService.sign({ email }, { expiresIn: '15m' });
    const magicLink = `http://localhost:${process.env.PORT}/auth/verify-magic-link/?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Regiatrate With Only email',
      text: `Click here to register: ${magicLink}`,
      html: `<a href="${magicLink}">Login</a>`,
    });

    return { message: 'magic link send' };
  }

  async verifyMagicLink(token: string) {
    const payload = this.jwtService.verify(token);

    const existing_user = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });
    console.log('Existing User:', existing_user);

    if (!existing_user) {
      const new_user = await this.prisma.user.create({
        data: {
          email: payload.email,
          username: 'new user',
        },
      });

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
