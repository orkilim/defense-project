const express = require('express');
const { orderModel } = require("../models/orderSchema");
const { ingredientModel } = require('../models/ingredientSchema')
let idCounter = 2 //starts from 2 because we already have one order in the db

const getOrders = async (req, res) => {
    try {
        await orderModel.find({})
            
            .then(data => { 
                
                res.status(200).send(data); })
            .catch(err => { res.status(400).send(err); })
    }
    catch (err) {
        res.status(400).send("problem is:\n" + err)
    }
}

const addOrder = async (req, res) => {
    await ingredientModel.find({ id: req.body.ingredientId })
        .then(async (data) => {
            if (data[0].amount > 0) {
                const price = data[0].price * req.body.amount
                const finalPrice = price * ((100 - req.body.coupon) / 100)
                    await orderModel.insertMany({
                        id: idCounter++,
                        client: req.body.client,
                        pizzaType: data[0].ingredient,
                        amount: req.body.amount,
                        price: (Number)(finalPrice),
                        coupon:req.body.coupon
                    })
                        .then(res.status(200).send("order successful"))
                        .catch((err) => {
                            if (err){
                                //console.log("error was:\n"+err)
                                res.status(400).send("problem is and was:\n"+err)
                            }
                                
                        })
            }
            else
            {
                res.send('the kitchen dont have anymore of that type')
            }
        })
}

const changeOrder = async (req, res) => {
    try {
        await ingredientModel.find({ id: req.body.ingredientId })
            .then(async (data) => {
                console.log(data)
                const changedIngredientPrice = data[0].price
                const price = changedIngredientPrice * req.body.amount
                await orderModel.updateOne({ id: req.body.id }, {
                    pizzaType: data[0].ingredient,
                    amount: req.body.amount,
                    price: price
                })
                    .then(res.status(200).send('order updated'))
                    .catch((err) => {
                        if (err)
                            res.status(400).send("err is:\n" + err)
                    })

            })
            .catch((err) => {
                if (err)
                    res.status(400).send('watch out:\n' + err)
            })
    }
    catch (err) {
        res.status(400).send(err)
    }
}

const deleteOrder = async (req, res) => {
    await orderModel.deleteOne({ id: req.body.id })
        .then(() => { res.status(200).send("order deleted") })
        .catch((err) => {
            if (err)
                res.status(400).send('problem with deletion:\n' + err)
        })
}

module.exports = {
    getOrders,
    addOrder,
    changeOrder,
    deleteOrder
};