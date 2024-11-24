import express, { Request, Response, Router } from 'express';
import apiRoutes from './routes/api.routes';
import cors from 'cors';

const app = express();
const PORT = 3000;

const router = Router();

app.use(cors());
// Middleware
app.use(express.json());

app.use('/api/v1' , apiRoutes);

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript!');
});

router

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
