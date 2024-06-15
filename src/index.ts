import express, { Application, Request, Response } from 'express';
import { json } from 'body-parser';
import userRoutes from './routes/userRoutes';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use('/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Drizzle ORM and PostgreSQL!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
