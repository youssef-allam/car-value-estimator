import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { UsersService } from "../users.service";

@Injectable()
export class currentUserInterceptor implements NestInterceptor{
    constructor(private readonly userService:UsersService){}

    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest();
        const {userId} = req.session;

        if(userId){
            const user = await this.userService.findOne(userId);
            req.currentUser = user;
        }

        return  next.handle();
    }
}