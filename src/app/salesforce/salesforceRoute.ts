import express, { Request, Response } from 'express';
import { getSalesforceData, createSalesforceRecord, getSalesforceAccessToken } from './salesforceService';

const router = express.Router();

router.use(async (req, res, next) => {
    
  await getSalesforceAccessToken();
  console.log('here---------------getSalesforceAccessToken')
  next();
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const data = await getSalesforceData();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const record = await createSalesforceRecord(req.body);
    res.json(record);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export { router as salesforceRoute };
