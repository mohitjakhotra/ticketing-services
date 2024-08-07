import express, { Request, Response } from 'express';
import { getServiceNowTickets, createServiceNowTicket } from './ticketService';
import { getAccessToken } from '../../utils';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    // const token = await getAccessToken(); 
    // console.log('Access Token:  ', token); 
    const tickets = await getServiceNowTickets(); 
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
