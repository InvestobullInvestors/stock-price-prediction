import axios from "axios";

export const chargeCard = async (paymentId, amount) => {
    try {
        return await axios.post(`http://localhost:3000/charge-card`, JSON.stringify({
            paymentId: paymentId,
            amount: amount
        }), {headers: {'Content-Type': 'application/json'}})
    } catch (error) {
        console.log(error.message)
    }
}
