import express, { Request, Response } from 'express';
import { getServiceNowTickets, createServiceNowTicket, getAccessToken } from './ticketService';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken(); // Ensure the token is fetched
    console.log('Access Token:', token); // Log the token to verify
    const tickets = await getServiceNowTickets(); // Fetch tickets
    res.json(tickets);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const ticket = await createServiceNowTicket(req.body);
    res.json(ticket);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export { router as ticketRoute };
