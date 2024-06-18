import { useDispatch, useSelector } from 'react-redux';
import s from './CartButton.module.scss';
import cx from "classnames";
import { addToCart } from '../../store/features/orderBooking';
import { useEffect, useState } from 'react';

export default function CartButton({
    itemIn = "Pc",
    productCode
}) {
    const dispatch = useDispatch();
    const cart = useSelector(state => state?.orderBooking?.cart);
    const [quantity, setQuantity] = useState(0)

    useEffect(() => {
        const currentItem = cart?.find(item => item?.productCode === productCode);
        const quantityKey = itemIn === "Pc" ? "packs" : "case";
        setQuantity(currentItem?.quantity?.[quantityKey])
    }, [cart])


    const handleIncrement = () => {
        dispatch(addToCart({
            itemIn,
            productCode
        }))
    }



    const handleDecrement = () => {
        dispatch(addToCart({
            itemIn,
            productCode,
            type: "decrement"
        }))
    }

    return (
        <>
            {quantity ? <div
                className={cx(s.cartBtn)}
            >
                <div role="button" className={cx(s.decrement, s.fontMedium)} onClick={handleDecrement}>-</div>
                <div className={cx(s.quantity, s.fontMedium)}>{quantity}</div>
                <div role="button" className={cx(s.increment, s.fontMedium)} onClick={handleIncrement}>+</div>
            </div>
                :
                <div
                    role="button"
                    className={cx(
                        s.fs_12,
                        s.fw_600,
                        s.btn,
                        s.emptyButton,
                        "text-center",
                        s.fontMedium
                    )}
                    onClick={handleIncrement}
                >
                    {itemIn} +
                </div>}
        </>
    )
}
