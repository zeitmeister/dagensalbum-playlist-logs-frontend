import express, { Router, Request, Response } from 'express';
import serverless from 'serverless-http';

const logs:string[] = [];
console.log('The Frontend shit is running Service Running!');

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.set('view engine', 'pug');
app.set('views', __dirname);
const router = Router();

// Setup routes

router.post('/logs', (request: Request, response: Response) => {
    try {
        console.log(request.body);
        logs.push(request.body.log);
    } catch (error) {
        console.log(error, ' is not good');
    }
  });

  router.get('/logs', (request: Request, response: Response) => {
      console.log('i suppose we dont see this');
      response.render('./renderings/index.pug', {logs})
  });


// 404 everything else.
router.get('*', function (req: Request, res: Response) {
    res.status(404).json({
        errorCode: 'not-found',
        message: 'No matching route found',
    });
});



export const handler = serverless(app);


