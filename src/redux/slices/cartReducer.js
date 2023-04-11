const cartReducer = (state, action) => {
    if(action.type === "CART_TOTAL_ITEM") {
        let updatedItemVal = state.cart.reduce((initiaVal, curElem) => {
            let { amount } = curElem;
            initiaVal = initiaVal + amount;
            return initiaVal;
        }, 0);
        return {
            ...state,
            total__item: updatedItemVal,
        }
    }

    return state;
};


export default cartReducer
