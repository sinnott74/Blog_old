import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import * as jwt from "jsonwebtoken";
import * as moment from "moment";
// const TransactionInfo from './TransactionInfo');
import AuthenticationError from "../exception/AuthenticationException";
import { User, Credential } from "../Entity";
import { JsonWebTokenError } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const SECRET = process.env.JWT_SECRET || "SECRET_SSSHHHHHHH";

/**
 * Responsible for Appliction Authentication
 */
class Auth {
  /**
   * Initializes application authenication
   */
  static initialize() {
    passport.use("jwt", Auth._getStrategy());
    return passport.initialize();
  }

  /**
   * Authorization Middleware.
   * Sets the user onto the Transaction under 'user' upon successful authentication.
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static middleware(req: Request, res: Response, next: NextFunction) {
    Auth._authenticate((err: Error, user, info) => {
      if (err || !user) {
        console.log(err);
        return next(new AuthenticationError());
      }
      // TransactionInfo.set("user", user);
      next();
    })(req, res, next);
  }

  /**
   *
   * @param {*} username
   * @param {*} password
   */
  static async login(username: string, password: string) {
    try {
      let authenticated = await Credential.authenticate(username, password);

      if (authenticated) {
        return Auth._getToken(username);
      } else {
        throw new AuthenticationError();
      }
    } catch (err) {
      throw err;
    }
  }

  /**
   * Gets the Passport JWT strategy to use to authenticate
   */
  static _getStrategy() {
    const strategyConfig = {
      secretOrKey: SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
      passReqToCallback: true
    };

    return new JWTStrategy(
      strategyConfig,
      (req: Request, payload, done: Function) => {
        User.readByUsername(payload.username)
          .then(user => {
            done(null, user);
          })
          .catch(err => {
            done(err, false, { message: "Authentication error" });
          });
      }
    );
  }

  /**
   * Wraps Passports authenticate function
   *
   * @param {Function} cb Callback function
   */
  static _authenticate(cb: any) {
    return passport.authenticate(
      "jwt",
      {
        session: false,
        failWithError: true
      },
      cb
    );
  }

  /**
   * Generates a JWT token for a given user
   * @param {*} user
   * @returns {Promise} contains a token, time of expiration & the username
   */
  static async _getToken(username: string) {
    let expires = moment
      .utc()
      .add({ days: 7 })
      .unix();

    let user = await User.readByUsername(username);
    return new Promise((resolve, reject) => {
      try {
        jwt.sign(
          {
            exp: expires,
            username: username
          },
          SECRET,
          {},
          (err: Error, token: string) => {
            if (err) {
              reject(err);
            }
            resolve({
              token: "JWT " + token,
              expires: moment.unix(expires).format(),
              ...user.toJSON()
            });
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default Auth;
