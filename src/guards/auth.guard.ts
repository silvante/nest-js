import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from 'src/decorators/roles.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const allowed_roles = this.reflector.get(Roles, context.getHandler());
    console.log(allowed_roles);
    const request = context.switchToHttp().getRequest();

    return true;
  }
}
