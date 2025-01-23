import axios from "axios";
import API_BASE_URL from "./constants";
import { toast } from "react-toastify";

// Add to cart API
export const addToCart = async (item, userId) => {
    // Payload object
    const payload = {
        userId: userId,
        productId: item?._id,
        name: item?.name,
        price: item?.price,
        quantity: 1,
        imageUrl: item?.imageUrl
    }

    await axios.post(`${API_BASE_URL}/cart`, payload).then(() => {
        toast.success('Item successfully added in Cart.');
    })
}