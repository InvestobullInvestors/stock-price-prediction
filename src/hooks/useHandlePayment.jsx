import {CardElement} from "@stripe/react-stripe-js";
import {chargeCard} from "../services/PaymentService";

const useHandlePayment = (payableAmount, stripe, elements, callback) => {
    return (async (event) => {
        event.preventDefault();
        try {
            const {error, paymentMethod: {id}} = await stripe.createPaymentMethod({
                type: "card",
                card: elements.getElement(CardElement)
            })
            if (!error) {
                const status = await chargeCard(id, payableAmount);
                callback(status)
            }
        } catch (error) {
            console.log(error.message)
        }
    })
}

export default useHandlePayment;
