import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';

import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// Root route
app.get('/', (req, res) => {
  res.send('API Working ✅');
});

// 🔥 MAIN START FUNCTION (IMPORTANT)
const startServer = async () => {
  try {
    // 1️⃣ DB connect – WAIT
    await connectDB();

    // 2️⃣ Cloudinary config
    connectCloudinary();

    // 3️⃣ Routes (AFTER DB CONNECT)
    app.use('/api/user', userRouter);
    app.use('/api/product', productRouter);
    app.use('/api/cart', cartRouter);
    app.use('/api/order', orderRouter);

    // 4️⃣ Start server
    app.listen(PORT, () => {
      console.log(`Server Started on Port: ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();

/*import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();


const port = process.env.PORT || 5000

connectDB()
connectCloudinary()
app.use(express.json())
app.use(cors())

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)


app.get('/',(req,res)=>{
    res.send('API Working')
})

app.listen(port,()=> console.log('Server Started on Port:'+port));*/