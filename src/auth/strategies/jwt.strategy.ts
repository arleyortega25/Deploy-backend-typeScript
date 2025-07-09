import { PayloadToken } from "../interfaces/auth.interface";
import { AuthService } from "../services/auth.service";
import {
  Strategy as jwtStrat,
  StrategyOptions,
  ExtractJwt,
} from "passport-jwt";
import { PassportUse } from "../utils/passport.use";

type JwtVerifyFunction = (
  payload: PayloadToken,
  done: any
) => Promise<PayloadToken>;

export class JwtStrategy extends AuthService {
  constructor() {
    super();
  }
  async validate(payload: PayloadToken, done: any) {
    return done(null, payload);
  }
  get use() {
    return PassportUse<jwtStrat, StrategyOptions, JwtVerifyFunction>(
      "jwt",
      jwtStrat,
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: this.getEnvironment("SECRET"),
      },
      this.validate
    );
  }
}
