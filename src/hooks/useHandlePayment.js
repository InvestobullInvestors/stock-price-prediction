import { CardElement } from '@stripe/react-stripe-js';
import { chargeCard } from '../services/paymentService';

const useHandlePayment = (
    payableAmount,
    stripe,
    elements,
    setIsLoading,
    callback
) => {
    return async (event) => {
        setIsLoading(true);
        event.preventDefault();
        try {
            const {
                error,
                paymentMethod: { id },
            } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
            });
            if (!error) {
                const status = await chargeCard(id, payableAmount);
                callback(status);
            }
        } catch ({ message }) {
            console.log(message);
        } finally {
            setIsLoading(false);
        }
    };
};

export default useHandlePayment;
