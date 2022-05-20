import { Controller, Get } from '@nestjs/common';
import {Public} from "../shared/decorators/public.decorator";

@Controller()
export class AppController {

  @Public()
  @Get('health')
  getHello(): string {
    return 'Exemple API is up and running!';
  }
}
