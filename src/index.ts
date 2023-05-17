import express, { Request, Response } from 'express';

async function run() {
    const logs:string[] = [];
    console.log('The Frontend shit is running Service Running!');
    
    const app = express();
    app.set('trust proxy', true);
    app.use(express.json());
    app.set('view engine', 'pug');
    app.set('views', __dirname);
    // Setup routes

	app.post('/logs', (request: Request, response: Response) => {
        try {
            console.log(request.body);
            logs.push(request.body.log);
        } catch (error) {
            console.log(error, ' is not good');
        }
	  });

      app.get('/logs', (request: Request, response: Response) => {
          response.render('./renderings/index.pug', {logs})
      });


    // 404 everything else.
    app.get('*', function (req: Request, res: Response) {
        res.status(404).json({
            errorCode: 'not-found',
            message: 'No matching route found',
        });
    });


    app.listen(process.env.PORT || 8080);
}

run();
