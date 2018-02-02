const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const moment = require('moment');
const TransactionInfo = require('./TransactionInfo');
const UserDAO = require('../DAO/UserDAO');
const CredentialDAO = require('../DAO/CredentialDAO');
const AuthenticationError = require('../exception/AuthenticationException');

const SECRET = process.env.JWT_SECRET || "SECRET_SSSHHHHHHH";

/**
 * Responsible for Appliction Authentication
 */
class Auth {

  /**
   * Initializes application authenication
   */
  static initialize() {
    passport.use('jwt', Auth._getStrategy());
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
  static middleware(req, res, next) {
    Auth._authenticate((err, user, info) => {
      if(err || !user) {
        console.log(err);
        return next(new AuthenticationError());
      }
      TransactionInfo.set('user', user);
      next();
    })(req, res, next);
  }

  /**
   *
   * @param {*} username
   * @param {*} password
   */
  static async login(username, password) {
    try{
      let authenticated = await new CredentialDAO().authenticate(username, password)

      if(authenticated){
        return Auth._getToken(username);
      } else {
        throw new AuthenticationError();
      }
    } catch(err) {
      throw err;
    }
  }

  /**
   * Gets the Passport JWT strategy to use to authenticate
   */
  static _getStrategy() {

    const strategyConfig = {
      secretOrKey : SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
      passReqToCallback: true
    }

    return new JWTStrategy(strategyConfig, (req, payload, done) => {
      new UserDAO().readByUserName(payload.username + 'a')
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(null, false, {message: "Authentication error"});
      })
    })
  }

  /**
   * Wraps Passports authenticate function
   *
   * @param {*} cb Callback function
   */
  static _authenticate(cb) {
    return passport.authenticate('jwt', {
      session: false,
      failWithError: true,
    }, cb)
  }

  /**
   * Generates a JWT token for a given user
   * @param {*} user
   * @returns {Promise} contains a token, time of expiration & the username
   */
  static async _getToken(username) {
    let expires = moment().utc().add({days: 7}).unix();

    let user = await new UserDAO().readByUserName(username);
    return new Promise((resolve, reject) => {
      try{
        jwt.sign({
          exp: expires,
          username: username
        }, SECRET, {}, (err, token) => {
          if(err){ reject(err); }
          resolve({
            token: "JWT " + token,
            expires: moment.unix(expires).format(),
            ...user
          });
        });
      } catch(err) {
        reject(err);
      }
    });
  }
}

module.exports = Auth;
