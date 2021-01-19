const express = require('express');
const router = express.Router();
const controller = require('../controllers/ingredients')


/* get ingredient by name */
router.get("/",(req, res) => {
  controller.getIngredient(req,res);
});

//
router.put("/updateAmount",(req, res) => {
  controller.updateAmount(req, res);
})

router.delete("/deleteIngredient/", (req,res) => {
  controller.deleteIngredient(req, res);
})

module.exports = router;
