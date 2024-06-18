import { ReactSVG } from 'react-svg';
import s from './OrderSummary.module.scss';
import cx from "classnames";
import addIcon from "../../assets/svg/add.svg"
import minusIcon from "../../assets/svg/minus.svg"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart, proceedOrder } from '../../store/features/orderBooking';
import { useEffect, useState } from 'react';

export default function OrderSummary() {

    const cartList = useSelector(state => state?.orderBooking?.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [data, setData] = useState({
        itemTotal: 0,
        schemeApplied: 0,
        tax: 0,
        toPay: 0
    });

    const handleAddMore = () => {
        navigate("/order-booking");
    }

    const handleIncrement = productCode => {
        dispatch(addToCart({
            itemIn: "Pc",
            productCode,
            // type: "decrement"
        }))
    }

    const handleDecrement = productCode => {
        dispatch(addToCart({
            itemIn: "Pc",
            productCode,
            type: "decrement"
        }))
    }

    useEffect(() => {
        let itemTotal = 0, schemeApplied = 0, tax = 0, toPay = 0;
        for (let i = 0; i < cartList.length; i++) {
            const cartItem = cartList[i];
            itemTotal = itemTotal + +cartItem?.quantity?.amount;
        }
        setData({
            itemTotal,
            schemeApplied,
            tax,
            toPay
        })
    }, [cartList])

    const handleProceedOrder = () => {
        dispatch(proceedOrder());
    }

    return (
        <div className={cx(s.layout)}>
            <div className={cx(s.contentContainer)}>
                <div className={cx(s.py_12, s.px_8, s.fs_16, s.fw_600)}>Order Summary</div>
                <div className={cx(s.py_12, s.px_8, s.alertContent, "d-flex align-items-center justify-content-between")}>
                    <div className={cx(s.fs_14, s.fw_600)}>Expected Delivery</div>
                    <div className={cx(s.fs_14, s.fw_600, s.text_orange2)}>20 Oct 2023</div>
                </div>
                <div className={s.divider}></div>
                <div className={cx(s.fw_600, s.fs_16, s.pl_18)}>Ordered Items</div>
                <div className={cx(s.mt_12)}>
                    {cartList?.map((item, i) => {
                        const { noOfPcs, amount } = item?.quantity || {};
                        return <div className={cx("d-flex align-items-center justify-content-between", s.orderItem, s.py_12, s.px_16)}>
                            <div>
                                <div className={cx(s.fw_500, s.fs_14)}>{item?.product_details?.product_name}</div>
                                <div className={cx("d-flex align-items-center", s.gap_6)}><span className={cx(s.fs_12, s.fw_700, s.fontMedium)}>{item?.product_details?.priceweight} X {noOfPcs} Pcs</span><span className={cx(s.fs_12, s.fw_600, s.text_grey1)}>₹ {Number(item?.product_details?.selling_rate)?.toFixed(2)}</span></div>
                            </div>
                            <div className={cx("d-flex align-items-center", s.gap_8)}>
                                <div className={cx(s.text_green, s.fw_600, s.fs_12,)}>₹ {Number(amount)?.toFixed(2)}</div>
                                <div className={cx("d-flex", s.text_green, s.fw_600, s.fs_12, s.cartBtn)}>
                                    <div className={cx(s.decrement)} role="button" onClick={() => handleDecrement(item?.productCode)}><ReactSVG src={minusIcon} /></div>
                                    <div className={cx(s.count)}>{noOfPcs}</div>
                                    <div className={cx(s.increment)} role="button" onClick={() => handleIncrement(item?.productCode)}><ReactSVG src={addIcon} /></div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
                <div>
                    <button className={cx(s.addMoreBtn)} onClick={handleAddMore}>Add more Products</button>
                    <div className={s.divider}></div>
                </div>
                <div></div>
                <div className={cx(s.fw_600, s.fs_16, s.pl_18)}>Total Amount</div>
                <div className={cx(s.px_24, s.pt_12, s.fs_14, s.fw_400, "d-flex align-items-center justify-content-between", s.fontMedium)}>
                    <div>Item Total</div>
                    <div className={cx(s.text_grey1)}>₹ {Number(data?.itemTotal)?.toFixed(2)}</div>
                </div>
                <div className={cx(s.px_24, s.pt_12, s.fs_14, s.fw_400, "d-flex align-items-center justify-content-between", s.fontMedium)}>
                    <div>Scheme Applied</div>
                    <div className={cx(s.text_grey1)}>₹ {Number(data?.schemeApplied)?.toFixed(2)}</div>
                </div>
                <div className={cx(s.px_24, s.pt_12, s.fs_14, s.fw_400, "d-flex align-items-center justify-content-between", s.fontMedium)}>
                    <div>GST & taxes</div>
                    <div className={cx(s.text_grey1)}>₹ {Number(data?.tax)?.toFixed(2)}</div>
                </div>
                <div className={cx(s.px_24, s.pt_12, s.fs_14, s.fw_700, "d-flex align-items-center justify-content-between", s.fontBolt, s.text_black)}>
                    <div>To Pay</div>
                    <div>₹ {Number(data?.itemTotal)?.toFixed(2)}</div>
                </div>
                <div className={cx(s.mt_12, "d-flex justify-content-center align-items-center")}>
                    <button className={s.proceedButton} onClick={handleProceedOrder} >Proceed to place order</button>
                </div>
            </div>
        </div>
    )
}
