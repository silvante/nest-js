import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465, // Use 465 for SSL or 587 for TLS
        secure: true, // Use `true` for SSL
        auth: {
          user: process.env.SMTP_EMAIL, // Use env variable
          pass: process.env.SMTP_PASSWORD, // Use env variable
        },
      },
    }),
  ],
  exports: [MailerModule], // This is correct
})
export class EmailModule {}
