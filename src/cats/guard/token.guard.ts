import { CanActivate, ExecutionContext } from '@nestjs/common';
import { CatsService } from '../cats.service';
import { Injectable } from '@nestjs/common/decorators';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private catService: CatsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.token;
    const cat = await this.catService.findOne(request.params.id);
    return cat.code === token;
  }
}