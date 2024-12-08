import { getCartProducts } from "./localstorage";

export const total = (data) => {
    const getCart = getCartProducts()
    const filter = data.filter(dat => getCart.includes(dat.id))
    const totalAmount = filter.reduce((sum, product) => sum + product.price, 0);
    return totalAmount;
}