import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../response/http.response";
import passport from 'passport'
import { UserEntity } from "../../user/entities/user.entity";
import { RoleType } from "../../user/dto/user.dto";

export class SharedMiddleware {
    constructor(public httpResponse:HttpResponse= new HttpResponse())
    {

    }
    passAuth(type: string){
        return passport.authenticate(type,{session:false})
    }
    checkAdmin(req:Request,res:Response,next:NextFunction):void{
        const user= req.user as UserEntity
        if (user.role !== RoleType.ADMIN) {
             this.httpResponse.Unauthorized(res,'unauthorized')
             return;
        }
        return next()
    }
}