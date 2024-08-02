import passport from 'passport';
import { Strategy as OAuth2Strategy } from 'passport-oauth2';
import dotenv from 'dotenv';

dotenv.config();

// ServiceNow Strategy
passport.use('servicenow', new OAuth2Strategy({
  authorizationURL: process.env.SERVICENOW_AUTH_URL!,
  tokenURL: process.env.SERVICENOW_TOKEN_URL!,
  clientID: process.env.SERVICENOW_CLIENT_ID!,
  clientSecret: process.env.SERVICENOW_CLIENT_SECRET!,
  callbackURL: process.env.SERVICENOW_CALLBACK_URL!,
}, (accessToken:any, refreshToken: any, profile: any, done: any) => {
  return done(null, { accessToken, profile });
}));

console.log("--------here in oauth")
// Salesforce Strategy
passport.use('salesforce', new OAuth2Strategy({
  authorizationURL: process.env.SALESFORCE_AUTH_URL!,
  tokenURL: process.env.SALESFORCE_TOKEN_URL!,
  clientID: process.env.SALESFORCE_CLIENT_ID!,
  clientSecret: process.env.SALESFORCE_CLIENT_SECRET!,
  callbackURL: process.env.SALESFORCE_CALLBACK_URL!,
}, (accessToken:any, refreshToken: any, profile: any, done: any) => {
  console.log(accessToken, profile, '-----------------------in oauth in passport')
  return done(null, { accessToken, profile });
}));

passport.serializeUser((accessToken, done) => {
  done(null, accessToken);
});

passport.deserializeUser((accessToken: any, done) => {
  done(null, accessToken);
});
