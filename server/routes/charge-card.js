var express = require('express');
var Stripe = require('stripe')
var router = express.Router();

const stripe = new Stripe('sk_test_51IweHkKvAxvZ5kVetx3UiymBoyjtPixhy4q72vX0lh5MaPQfI9r9zilffbnSnOXRsfbJKbYSNQAkTCB9vPWyTBOO00WrHtvZsQ');

/* Create charges on Stripe. */
router.post('/', async function (req, res, next) {
    const paymentDetails = JSON.parse(Object.keys(JSON.parse(JSON.stringify(req.body)))[0])

    const {paymentId, amount} = paymentDetails

    try {
        await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: 'USD',
            description: 'Paid for subscription',
            payment_method: paymentId,
            confirm: true
        })
        return res.send("confirmed payment");
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
});

module.exports = router;
