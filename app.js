import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connection } from './config/db.js';
import { createBannerTable, createTable } from './models/bannerModel.js';
import bannerRouter from './routes/bannerRoutes.js';
const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1",bannerRouter);

app.get("/",(req,res)=>{
    res.send("Server is running");
})

app.listen(5000,()=>{
    console.log('Server is running on port 5000');
})
connection.connect((err)=>{
    if(err) throw err;
    console.log("connected to Mysql db ");
    createTable();
});
export default app;