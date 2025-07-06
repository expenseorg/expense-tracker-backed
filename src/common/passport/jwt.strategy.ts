/**
 * @file holds the passport middleware for jwt token based strategy
 */

import { PassportStatic } from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import User from '../../models/User.model';

import dotenv from 'dotenv';

// configure .env
dotenv.config();

// passport middleware for jwt
export default (passport: PassportStatic) => {
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET || 'super-secret',
      },
      async (jwtPayload, done) => {
        try {
          // find user by id
          const user = await User.findById(jwtPayload.id);
          if (!user) return done(null, false);
          // in no error return the user
          return done(null, user);
        } catch (err) {
          return done(err, false);
        }
      }
    )
  );
};
