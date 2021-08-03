const express = require("express");
const Stripe = require("stripe");
const router = express.Router();
const bodyParser = require("body-parser");

const stripe = new Stripe(
    "sk_test_51IweHkKvAxvZ5kVetx3UiymBoyjtPixhy4q72vX0lh5MaPQfI9r9zilffbnSnOXRsfbJKbYSNQAkTCB9vPWyTBOO00WrHtvZsQ"
);
const jsonParser = bodyParser.json();

/* Create charges on Stripe. */
router.post("/charge-card", jsonParser, async function (req, res) {
    const { paymentId, amount } = req.body;

    try {
        await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: "USD",
            description: "Paid for subscription",
            payment_method: paymentId,
            confirm: true,
        });
        return res.send("confirmed payment");
    } catch ({ message }) {
        return res.status(400).send({
            message: message,
        });
    }
});

module.exports = router;
