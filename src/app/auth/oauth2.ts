import passport from 'passport';
import { Strategy as OAuth2Strategy } from 'passport-oauth2';
import dotenv from 'dotenv';

dotenv.config();
console.log('here in oauth.ts')
passport.use('servicenow', new OAuth2Strategy({
  authorizationURL: process.env.SERVICENOW_AUTH_URL!,
  tokenURL: process.env.SERVICENOW_TOKEN_URL!,
  clientID: process.env.SERVICENOW_CLIENT_ID!,
  clientSecret: process.env.SERVICENOW_CLIENT_SECRET!,
  callbackURL: process.env.SERVICENOW_CALLBACK_URL!,
}, (accessToken:any, refreshToken: any, profile: any, done: any) => {
  console.log(accessToken)
  return done(null, { accessToken, profile });
}));

passport.serializeUser((accessToken, done) => {
  console.log(accessToken)
  done(null, accessToken);
});

passport.deserializeUser((accessToken: any, done) => {
  done(null, accessToken);
});
