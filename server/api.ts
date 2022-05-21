import { Request, Response, Router } from 'express';
import { PaymentData } from './models';
import { adaptor as DB } from './sqlite.adaptor'

const myDB = new DB()

const ALLOWED_CHARS ='abcdefghijklmnopqrstuvwxyz';


const router = Router()

router.get('/', (req: Request, res: Response) => {
    res.send('Running api...');
});


router.get('/generate', (req: Request, res: Response) => {
    // check bias character
    const bias: string = `${req.query.bias ?? '-'}`;
    const isValidBias: boolean = bias.length > 0  && ALLOWED_CHARS.includes(bias);
    
    // calculate lists length
    const numberOfCells: number = 100;
    const numberOfBiasedCells : number = 20 * (isValidBias ? 1 : 0);
  
    // biased cells
    const biasedCells: Array<string> = Array(numberOfBiasedCells).fill(bias)
  
    // real random cells
    // bias character not excluded from real random, so bias character occurences could be more than 20%
    // to exclude bias - something like : ALLOWED_CHARS.splice(ALLOWED_CHARS.indexOf(bias, 1))  ...
    const randomCells : Array<string> = 
      [...Array(numberOfCells - numberOfBiasedCells).keys()] // iterable array
      .map(() =>  ALLOWED_CHARS[ Math.floor( Math.random() * ALLOWED_CHARS.length )]) // random char from ALLOWED_CHARS
  
    // concat lists and suffle result
    const result : Array<string> =
      biasedCells.concat(randomCells) // join lists
      .sort(() => Math.random() - 0.5); // suffle
    res.json(result)
  });
  
  router.get('/payments', async (req: Request, res: Response) => {
    return res.json(await myDB.getPayments())
  });
  
  router.post('/payments', async (req: Request, res: Response) => {
    const payload: PaymentData =  req.body
    const result = await myDB.addPayment(payload)
  
    res.json(result)
  });

  
export default router
  