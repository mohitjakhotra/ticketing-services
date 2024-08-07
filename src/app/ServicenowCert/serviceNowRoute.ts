import express, { Request, Response } from 'express';
import { getTickets } from './serviceNowService';
import { getAccessToken } from '../../utils';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {

    try {

        const tickets = await getTickets();
        res.json(tickets)

    }
    catch (error: any) { 
        res.status(500).json({ error: error });
    }

})

export { router as serviceNowRoute };