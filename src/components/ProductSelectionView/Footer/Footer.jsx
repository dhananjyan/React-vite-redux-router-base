import { useDispatch, useSelector } from 'react-redux';
import s from './Footer.module.scss';
import cx from "classnames";
import { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import rightIcon from "../../../assets/svg/rightArrowNew.svg"
import { useNavigate } from 'react-router-dom';
import { setActiveProduct } from '../../../store/features/orderBooking';

export default function Footer() {

    const cartList = useSelector(state => state?.orderBooking?.cart);
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!cartList?.length) {
            setData({
                amount: 0,
                itemCount: 0,
                skuCount: 0
            })
            return;
        }
        let amount = 0, itemCount = 0, skuCount = 0;
        for (let i = 0; i < cartList.length; i++) {
            const cartItem = cartList[i];
            const { selling_rate, noOfPcs } = cartItem?.product_details || {};
            ++skuCount;
            itemCount = +itemCount + (+cartItem?.quantity?.case + +cartItem?.quantity?.packs);
            amount = +amount + (+cartItem?.quantity?.packs * +selling_rate) + (+cartItem?.quantity?.case * +noOfPcs * +selling_rate);
        }
        setData({
            amount,
            itemCount,
            skuCount
        })
    }, [cartList]);

    const handleConfirm = () => {
        dispatch(setActiveProduct(null))
        navigate("/order-booking/summary")
    }

    return (
        <>
            {cartList?.length ? <div className={cx(s.footer)}>
                <div>
                    <div className={cx(s.fw_600, s.fs_14)}>{data?.itemCount} Items</div>
                    <div className={cx(s.fw_400, s.fs_11)}>{data?.skuCount} SKU</div>
                </div>
                <div className={cx("d-flex justify-content-between align-items-center", s.pl_12, s.amountSection)}>
                    <div>₹ {data?.amount}</div>
                    <button className={cx(s.btn, "d-flex align-items-center", s.fs_14, s.fw_600, s.gap_4)} onClick={handleConfirm}>Confirm <ReactSVG src={rightIcon} /></button>
                </div>
            </div>
                :
                ""}
        </>
    )
}