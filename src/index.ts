import { config } from './config/dotenv';
config();

import express, { Request, Response } from 'express';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';

import { authRoute } from './app/auth/authRoute';
import { ticketRoute } from './app/tickets/ticketRoute';
import { authMiddleware } from './middlewares/auth';
import { verifyPermissions } from './middlewares/permission';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const router = express.Router();
app.use('/api/v1', router);

router.get('/health', async (req: Request, res: Response) => {
  res.send('ok');
});

router.use('/auth', authRoute);

router.use('/tickets', ticketRoute);

console.log("here in index")

app.listen(PORT, () => {
  console.log(`Server is listening on: ${PORT}`);
});
