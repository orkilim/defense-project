const express = require('express');
const { orderModel } = require("../models/orderSchema");
const { ingredientModel } = require('../models/ingredientSchema')
let idCounter = 2 //starts from 2 because wel already have one order in the db

const getOrders = async (req, res) => {
    try {
        await orderModel.find({})
            .then(data => { res.json(data); })
            .catch(err => { res.status(400).json(err); })
    }
    catch (err) {
        res.status(400).send("problem is:\n"+err)
    }
}

const addOrder = async (req, res) => {


    await ingredientModel.find({ ingredient: req.body.ingredient })
        .then(async (data) => {
            const price = data[0].price * req.body.amount

            try {
                await orderModel.insertMany({
                    id: idCounter++,
                    client: req.body.client,
                    pizzaType: req.body.pizzaType,
                    amount: req.body.amount,
                    price: price
                })
                    .then(res.status(200).send("order successful"))
                    .catch((err) => {
                        if (err)
                            res.status(400).send('be careful:\n' + err)
                    })
            }
            catch (err) {
                res.status(400).send("error is:\n"+err)
            }
        })
}

const changeOrder = async (req, res) => {
    try {
        await ingredientModel.find({ ingredient: req.body.ingredient })
            .then(async (data) => {
                const changedIngredientPrice = data[0].price
                const price = changedIngredientPrice * req.body.amount
                await orderModel.updateOne({ client: req.body.client }, {
                    pizzaType: req.body.pizzaType,
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
    await orderModel.deleteOne({ client: req.body.client })
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