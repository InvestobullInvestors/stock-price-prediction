import { CardElement } from "@stripe/react-stripe-js";
import { chargeCard } from "../services/paymentService";

const useHandlePayment = (payableAmount, stripe, elements, callback) => {
    return async (event) => {
        event.preventDefault();
        try {
            const {
                error,
                paymentMethod: { id },
            } = await stripe.createPaymentMethod({
                type: "card",
                card: elements.getElement(CardElement),
            });
            if (!error) {
                const status = await chargeCard(id, payableAmount);
                callback(status);
            }
        } catch ({ message }) {
            console.log(message);
        }
    };
};

export default useHandlePayment;
