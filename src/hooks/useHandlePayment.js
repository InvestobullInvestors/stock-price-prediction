import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {chargeCard} from "../services/PaymentService";

const useHandlePayment = (payableAmount) => {
    const stripe = useStripe();
    const elements = useElements();
    return (async (event) => {
        event.preventDefault();

        const {error, paymentMethod: {id}} = stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })

        if (!error) {
            await chargeCard(id, payableAmount);
        }
    })
}

export default useHandlePayment;
