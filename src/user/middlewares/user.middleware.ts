import { NextFunction, Request, Response } from "express";
import { UserDTO } from "../dto/user.dto";
import { validate } from "class-validator";
import { HttpResponse } from "../../shared/response/http.response";

export class UserMiddleware {
    constructor(private readonly httpResponse : HttpResponse = new HttpResponse()){

    }
  UserValidator(req: Request, res: Response, next: NextFunction) {
    
    const {
      username,
      name,
      lastname,
      city,
      Department,
      email,
      password,
      role,
    } = req.body;
    const valid = new UserDTO();
    valid.name = name;
    valid.lastname = lastname;
    valid.username = username;
    valid.Department = Department;
    valid.city = city;
    valid.email = email;
    valid.password = password;
    valid.role = role;
    validate(valid).then((error) => {
      if (error.length >0 ) {
        return this.httpResponse.InternalServerError(res,error)
      } else{
        next()
      }
    }
    )
  }
}
