import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import movieRoutes from './routes/movies.js';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  origin:'https://movies-flix-iota.vercel.app/'
}));
const PORT = process.env.PORT || 3000;





app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);


app.post("/heelo",(req,res)=>{
  res.send("this is a hello route")
})




app.get('/', (req, res) => {
  res.send('Movie App API is running');
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});