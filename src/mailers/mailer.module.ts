import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: 'menemarket.main@gmail.com',
          pass: 'hbjh jyjj tkcb ddcy',
        },
      },
    }),
  ],
  exports: [MailerModule],
})

export class EmailModule {}
