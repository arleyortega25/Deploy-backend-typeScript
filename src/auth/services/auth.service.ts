import { ConfigServer } from "../../config/config";
import { UserService } from "../../user/services/user.service";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export class AuthService extends ConfigServer {
  constructor(private readonly userService: UserService = new UserService(),
private readonly jwtInstance = jwt) {
    super();    
  }
}
