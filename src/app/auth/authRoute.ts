import express from 'express';
import passport from 'passport';

const router = express.Router();

// ServiceNow Routes
router.get('/servicenow', passport.authenticate('servicenow'));

router.get('/servicenow/callback', 
  passport.authenticate('servicenow', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  }
);

// Salesforce Routes
console.log('-------------------here in authROue')
router.get('/salesforce', passport.authenticate('salesforce'));

router.get('/salesforce/callback', 
  passport.authenticate('salesforce', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  }
);

export { router as authRoute };
