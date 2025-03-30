import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Nest JS!';
  }

  getGoodJoke() : string {
    return "html developers think that thay can hack NASA :)"
  }
}
