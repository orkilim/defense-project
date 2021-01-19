const express = require('express');
const { orderModel } = require("../models/orderSchema");
const { ingredientModel } = require('../models/ingredientSchema')

const getIngredient = async (req, res) => {
    try {
        await ingredientModel.find({id:req.query.id})
            .then((data) => {
                
                if (data[0].amount > 0) {
                    res.status(200).send(`ingredient found, you have ${data[0].amount} of ${data[0].ingredient}`)
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
    catch (outerError) {
        if (outerError) {
            console.log("outer error in getIngredient" + outerError)
        }
    }
}

const updateAmount = async (req, res) => {
    try {
        await ingredientModel.updateOne({id:req.body.id},{
            amount:req.body.newAmount
        })
        .then((data)=>{
            res.status(200).send('amount changed')
        })
        .catch((err)=>{
            if(err)
            res.status(400).send('err of updateAmount:\n'+err)
        })
    }
    catch (outerErr) {
        if (outerErr)
            res.status(400).send("updateAmount outerErr:\n" + outerErr)
    }
}

const deleteIngredient= async (req,res)=>{
    try{
        await ingredientModel.deleteOne({id:req.body.id})
        .then((data)=>{
            res.status(200).send('deletion successful')
        })
        .catch((err)=>{
            if(err)
            res.status(400).send('deleteIngredient error:\n'+err)
        })
    }
    catch(outerErr){
        res.status(400).send('outer error on deleteIngredient:\n'+outerErr)
    }
}

module.exports = {
    getIngredient,
    updateAmount,
    deleteIngredient
}