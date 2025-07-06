import passport from 'passport';
import initJWT from './jwt.strategy';

// initialize all the strategies
initJWT(passport);

export default passport;
