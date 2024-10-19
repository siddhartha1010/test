import express, { Request, Response } from 'express';
import cors from 'cors';
import productRoutes from "./routes/productRoutes"



const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));



const PORT = 3000;

//hello world
app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.use('/api/v1', productRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
