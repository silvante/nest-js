import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        sourse: false,
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      defaults: {
        from: '"Nuna" 82mailer@gmail.com',
      },
    }),
  ],
  exports: [MailerModule],
})
export class EmailModule {}
