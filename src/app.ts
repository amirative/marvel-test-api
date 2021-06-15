import express, { Application } from 'express';
import characterRoutes from './routes/character.route';
import dotenv from 'dotenv';
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

dotenv.config()

const port: any = process.env.PORT || 8080;
const app:Application = express();

app.use(express.json());
// app.use(morgan("combined"));

//swagger options
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Marvel API',
        version: '1.0.0',
        description: 'This is a Rest API for MARVEL\'s characters'
      },
      host: process.env.APP_URL + (process.env.PORT ? (':' + process.env.PORT) : '')
    },
    // apis: ['./src/routes/*.route.ts'],
    apis: ['./src/docs/**/*.yaml'],
  };

  const swaggerDocs = swaggerJsDoc(options);
  app.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs));

app.use('/characters',characterRoutes);


//handle non-existing routes
app.use(function(req, res,) {
    return res.status(404).json({message:"Route not found"});
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(port,()=> console.log(`Server is running om port ${port}`));
}

export default app;
