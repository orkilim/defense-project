const express = require('express');
const { orderModel } = require("../models/orderSchema");
const { ingredientModel } = require('../models/ingredientSchema')

const getIngredient = async (req, res) => {
    try {
        await ingredientModel.find({})
            .then((data) => {
                let i=0
                for(;i<data.length;i++)
                {
                    if(data[i].ingredient==req.query.ingredient)
                    break;
                }
                
                if (data[i].amount > 0) {
                    res.status(200).send(`ingredient found, you have ${data[i].amount} of ${data[i].ingredient}`)
                }
                else {
                    res.status(200).send("you have none of that ingredient left")
                }
            })
            .catch((err) => {
                if (err)
                    console.log("getIngredient error:\n" + err)
                    res.status(400).send(err)
            })
    }
    catch(outerError){
        if(outerError)
        {
            console.log("outer error in getIngredient"+outerError)
        }
    }
}


module.exports = {
    getIngredient
}