import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
    getAllCats() : string {
        return "returns list of cats";
    }
}
