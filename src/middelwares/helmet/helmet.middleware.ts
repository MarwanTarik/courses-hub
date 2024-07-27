import { Injectable, NestMiddleware } from '@nestjs/common';
import helmet from 'helmet';

@Injectable()
export class HelmetMiddleware implements NestMiddleware {
  use(_req: any, _res: any, next: () => void) {
    helmet();
    next();
  }
}
