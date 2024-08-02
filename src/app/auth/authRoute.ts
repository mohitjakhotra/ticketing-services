import express, { Request, Response } from 'express';
import { getAccessToken } from '../tickets/ticketService';


const router = express.Router();

router.post('/token', async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    res.json({ accessToken: token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get access token' });
  }
});

export { router as authRoute };
