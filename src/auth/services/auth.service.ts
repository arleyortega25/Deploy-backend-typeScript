import { ConfigServer } from "../../config/config";
import { UserService } from "../../user/services/user.service";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserEntity } from "../../user/entities/user.entity";
import { PayloadToken } from "../interfaces/auth.interface";

export class AuthService extends ConfigServer {
  constructor(
    private readonly userService: UserService = new UserService(),
    private readonly jwtInstance = jwt
  ) {
    
    super();
  }
  public async validateUser(
    userName: string,
    password: string
  ): Promise<UserEntity | null> {
    const userByEmail = await this.userService.findUserWithEmail(userName);
    const userByUsername = await this.userService.findUserByUsername(userName);
    if (userByUsername) {
      const match = await bcrypt.compare(password, userByUsername.password);
      if (match) return userByUsername;
    }
    if (userByEmail) {
      const match = await bcrypt.compare(password, userByEmail.password);
      if(match) return userByEmail;
    }
    return null;
  }
  public sign(payload: jwt.JwtPayload, secret: any) {
    return this.jwtInstance.sign(payload, secret);
  }
  public async genJWT(
    user: UserEntity
  ): Promise<{ accessToken: string; user: UserEntity }> {
    const userConsult = await this.userService.findUserWithROle(
      user.id,
      user.role
    );
    const payload: PayloadToken = {
      role: userConsult!.role,
      sub: userConsult!.id,
    };
    if (userConsult) {
      user.password = "not permission";
    }
    return {
      accessToken: this.sign(payload, this.getEnvironment("SECRET")),
      user,
    };
  }
}
