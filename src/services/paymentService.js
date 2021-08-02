import axios from "axios";

export const chargeCard = async (paymentId, amount) => {
    try {
        return await axios.post(
            "/charge-card/",
            JSON.stringify({
                paymentId: paymentId,
                amount: amount,
            }),
            { headers: { "Content-Type": "application/json" } }
        );
    } catch ({ message }) {
        console.log(message);
    }
};
