import axios from "axios";

export const chargeCard = async (paymentId, amount) => {
    try {
        const response = await axios.post(`http://localhost:3000/charge-card`, JSON.stringify({
            paymentId: paymentId,
            amount: amount
        }))
        console.log(response.data)
    } catch (error) {
        console.log(error.message)
    }
}
