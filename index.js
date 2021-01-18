const express = require('express');
const app = express();
const port=process.env.PORT||7500
const mongoCon = require("./dbs_connected/mongo_connected");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With,Content-Type,Accept');
    res.set('Content-Type','application/json');
    next();
})



const usersRouter = require('./routes/users');
const petsRouter = require('./routes/pets');
const socialNetworkRouter = require('./routes/socialNetworks');
app.use('/users', usersRouter);
app.use('/pets', petsRouter);
app.use('/socialNetworks', socialNetworkRouter);


//client conction
app.use(express.static('public'));

//Listening on port 
const port = process.env.PORT || 5000 ;
app.listen(port, () => console.log(colors.red.underline.bgBrightWhite(`Server running on port ${port}`)));
