import { createSlice, current } from '@reduxjs/toolkit';
import { client } from '../../utils/client';

export const orderBookingSlice = createSlice({
    name: 'orderBooking',
    initialState: {
        data: [],
        normalizedData: [],
        activeFlag: null,
        flagList: [],
        flagFilteredData: [],
        activeProduct: null,
        activeVariant: null,
        categoryModalStatus: false,
        cart: []
    },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
        setNormalizedData: (state, action) => {
            state.normalizedData = action.payload;
        },
        setActiveFlag: (state, action) => {
            state.activeFlag = action.payload;
        },
        setFlagList: (state, action) => {
            state.flagList = action.payload;
        },
        setFlagFilteredData: (state, action) => {
            state.flagFilteredData = action.payload;
        },
        setActiveProduct: (state, action) => {
            state.activeProduct = action.payload;
        },
        setActiveVariant: (state, action) => {
            state.activeVariant = action.payload;
        },
        setCategoryModalStatus: (state, action) => {
            state.categoryModalStatus = !!action.payload;
        },
        setCart: (state, action) => {
            state.cart = action.payload;
        }
    }
})

export const {
    setData,
    setNormalizedData,
    setVariants,
    setActiveVariant,
    setFlagList,
    setActiveFlag,
    setFlagFilteredData,
    setActiveProduct,
    setCategoryModalStatus,
    setCart
} = orderBookingSlice.actions;

export default orderBookingSlice.reducer;

export const initializePage = () => async (dispatch, getState) => {
    await dispatch(fetchProducts());
    await dispatch(normalizedData());
}

export const fetchProducts = () => async (dispatch, getState) => {
    const data = await client.post("/mobile_validation", {
        phone_number: "9860692554"
    })
    dispatch(setData(data?.data?.result))
}

const getDistinctItems = (list, uniqueKey) => {
    let unique_values = list
        .map((item) => item[uniqueKey])
        .filter(
            (value, index, current_value) => current_value.indexOf(value) === index
        );
    return unique_values;
};

export const updateActiveFlag = (flag) => async (dispatch, getState) => {
    await dispatch(setActiveFlag(flag))
    await dispatch(updateFilteredData(true))
}

export const updateActiveVariant = (variant) => async (dispatch, getState) => {
    await dispatch(setActiveVariant(variant))
    await dispatch(updateFilteredData())
}

export const updateFilteredData = (isFromFlag) => async (dispatch, getState) => {
    const rawData = getState()?.orderBooking?.data;
    const data = getState()?.orderBooking?.normalizedData;
    const activeVariant = getState()?.orderBooking?.activeVariant;
    let flag = getState()?.orderBooking?.activeFlag;
    if (!isFromFlag) {
        const newData = rawData?.flatMap(({ product_details = {} }) => {
            if (product_details?.variant === activeVariant)
                return [product_details?.flag]
            return [];
        });

        await dispatch(setFlagList([...new Set(newData)]));
        flag = newData[0];
        dispatch(setActiveFlag(newData[0]))
    }

    let list = [];
    const filteredData = data.reduce((previousValue, variantData, data) => {
        const { variant, data: subVariantData } = variantData || {};
        const updatedSubVariantData = subVariantData.flatMap(item => {
            const { subvariant, data: list } = item || {};
            let updatedData = list.filter(item => item?.flag === flag)
            if (!updatedData?.length)
                return []
            return [{ subvariant, data: updatedData }];
        });
        const result = [...previousValue];
        if (updatedSubVariantData.length && (variant === activeVariant)) {
            result.push({
                variant, data: updatedSubVariantData
            })
            list = [...list, ...updatedSubVariantData?.flatMap(item => item?.data)]
        }
        return result;
    }, []);
    dispatch(setFlagFilteredData(filteredData))

}

export const normalizedData = () => async (dispatch, getState) => {
    const data = getState()?.orderBooking?.data;
    const newData = data?.map(({ distributorCode, outlet_code, product_details = {} }) => ({
        distributorCode,
        outlet_code,
        ...product_details
    }));
    // dispatch(setData(newData))
    const flagListData = getDistinctItems(newData, "flag");
    const variantData = newData.reduce((previousValue, currentValue, index, data) => {
        const newData = [...previousValue];
        const isExist = newData.some(item => item?.variant === currentValue.variant)
        if (!isExist) {
            let newObj = { variant: currentValue?.variant, data: [{ ...currentValue }] }
            newData.push(newObj);
        } else {
            const index = newData.findIndex(item => item?.variant === currentValue.variant)
            newData[index].data.push(currentValue)
        }
        return newData;
    }, [])
    const subVariantData = variantData.map(item => {
        const { variant, data } = item || {};
        const groupedData = data.reduce((previousValue, currentValue, index, data) => {
            const newData = [...previousValue];
            const isExist = newData.some(item => item?.subvariant === currentValue.subvariant)
            if (!isExist) {
                let newObj = { subvariant: currentValue?.subvariant, data: [{ ...currentValue }] }
                newData.push(newObj);
            } else {
                const index = newData.findIndex(item => item?.subvariant === currentValue.subvariant)
                newData[index].data.push(currentValue)
            }
            return newData;
        }, [])
        return {
            variant,
            data: groupedData
        }
    })
    await dispatch(setNormalizedData(subVariantData))
    await dispatch(setFlagList(flagListData));
    await dispatch(setActiveFlag(flagListData?.[0]))
    await dispatch(setActiveVariant(subVariantData?.[0]?.variant))
    await dispatch(updateFilteredData())
}

export const updateActiveProduct = (selectedProduct) => async (dispatch, getState) => {
    const data = getState().orderBooking?.data;
    const relevantProducts = data?.filter(item => ((item?.product_details?.subvariant === selectedProduct.subvariant) && (item?.product_details?.variant === selectedProduct.variant) && (item?.product_details?.brand === selectedProduct.brand)))
    const flagGroupedData = Object.groupBy(relevantProducts, ({ product_details }) => product_details?.flag)
    await dispatch(setActiveProduct({
        product: selectedProduct,
        flagGroupedData,
    }));
}

const calculateCartItem = cartItem => {
    const noOfPcs = (cartItem?.quantity?.packs + (cartItem?.quantity?.case * cartItem?.product_details?.noOfPcs));
    const amount = Number(noOfPcs * cartItem?.product_details?.selling_rate);
    return {
        ...cartItem,
        quantity: {
            ...(cartItem?.quantity || {}),
            noOfPcs,
            amount
        }
    };
}

export const addToCart = (productDetails) => async (dispatch, getState) => {
    const { productCode, itemIn, type = "increment" } = productDetails || {};
    const data = getState().orderBooking?.data;
    const cartList = getState().orderBooking?.cart;
    const productIndex = data?.findIndex(item => item?.product_details?.productCode === productCode) || 0;
    const product = data[productIndex];
    let cartItemIndex = cartList?.findIndex(item => item.productCode === productCode);
    cartItemIndex = cartItemIndex >= 0 ? cartItemIndex : cartList?.length;
    let cartItem = { ...(cartList[cartItemIndex] || { productCode, ...product, quantity: { case: 0, packs: 0 } }) };
    cartItem = {
        ...cartItem,
        quantity: {
            ...cartItem?.quantity,
        }
    }
    let itemInKey = itemIn === "Pc" ? "packs" : "case";
    let additionValue = (type === "decrement" && cartItem.quantity?.[itemInKey]) ? -1 : 1;
    cartItem.quantity[itemInKey] = +(cartItem.quantity?.[itemInKey] || 0) + +additionValue;
    let newCart = [...cartList];
    if ((cartItem?.quantity?.packs > 0) || (cartItem?.quantity?.case > 0))
        newCart[cartItemIndex] = calculateCartItem(cartItem);
    else
        newCart = newCart?.filter(item => item?.productCode !== productCode)

    dispatch(setCart(newCart))

}

export const proceedOrder = () => async (dispatch, getState) => {
    const cartList = getState().orderBooking?.cart;
    const data = cartList?.map(item => {
        return {
            outletcode: item?.outlet_code,
            distributorcode: item?.distributorCode,
            prd_code: item?.productCode,
            quantity: item?.quantity
        }
    })
    await client.post("/purchase", data);
    
}