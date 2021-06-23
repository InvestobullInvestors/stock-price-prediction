import {CardElement} from "@stripe/react-stripe-js";
import {chargeCard} from "../services/PaymentService";

const useHandlePayment = (payableAmount, stripe, elements) => {
    return (async (event) => {
        event.preventDefault();
        const {error, paymentMethod: {id}} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })
        if (!error) {
            await chargeCard(id, payableAmount);
        }
    })
}

export default useHandlePayment;
