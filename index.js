import express from 'express';
import bodyParser from 'body-parser';
import {connect} from './src/config/db/index.js';
import Admin from './src/routes/Admin.Routes.js'
import SubAdmin from './src/routes/SubAdminRoutes.Routes.js'
import User from  '../backend/src/routes/User.Routes.js'
import cors from 'cors';




const app = express();

connect
// cors 
app.use(cors());

// Body parser and taking input from large image

app.use(express.json({limit: '2mb', extended: true}));
app.use(express.urlencoded({limit: "2mb", extended: true, parameterLimit:2000}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//This is for Admin Private Routes
app.use('/api/Admin/private',Admin)
//This is for SubAdmin Private Routes
app.use('/api/SubAdmin/private',SubAdmin)
//This is for User Of codaLabData
app.use('/api/CodaLabProfile/public',User)
//This is for SudipSirLab
app.use('/api/SudipSirProfile/public',User)  

//Hello world Route For check

app.get('/',(req,res)=>{
  res.status(200).send("This is iitroorke codaLab backend");
})

app.use("*",(req,res)=>{
    res.send('Route not found');
})


let PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})