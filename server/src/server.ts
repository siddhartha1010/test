import express, { Request, Response } from 'express';
import cors from 'cors';
import productRoutes from "./routes/productRoutes"

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));



const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.use('/api/v1', productRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
