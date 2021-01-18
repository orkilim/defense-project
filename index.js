const express = require('express');
const app = express();
const mongoose = require('mongoose');
const constants = require("./constants.js");
const {DB_USER,DB_PASS} = constants;
const ordersRouter = require('./routes/orders');
const ingredientsRouter=require('./routes/ingredients')

const dotenv = require('dotenv');
dotenv.config()

const port=process.env.PORT||7500
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@my-cluster.6whyv.mongodb.net/db?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true})
.then(()=>{console.log('connected to mongo successfully')})
.catch((err)=>{
    if(err)
        console.log("this is the error:\n"+err)
})



app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With,Content-Type,Accept');
    res.set('Content-Type','application/json');
    next();
})


app.use('/orders', ordersRouter);
app.use('/ingredients',ingredientsRouter)

//client connction
app.use(express.static('public'));

app.listen(port)
console.log(`listening on port: ${port}`)


