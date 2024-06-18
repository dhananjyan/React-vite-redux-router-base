import { useSelector } from 'react-redux';
import s from './ProductSelectionView.module.scss';
import cx from "classnames"
import CartButton from '../CartButton/CartButton';
import { ReactSVG } from 'react-svg';
import rightIcon from "../../assets/svg/rightArrowNew.svg"
import Footer from './Footer/Footer';

export default function ProductSelectionView() {
    const data = useSelector(state => state?.orderBooking?.activeProduct)
    const { product, flagGroupedData } = data || {};
    const { product_name, subvariant } = product || {};
    return (
        <div className={s.layout}>
            <div className={cx("d-flex align-items-center justify-content-between", s.header)}>
                <div className={cx("d-flex align-items-center gap-2")}>
                    <div className={cx(s.imgContainer)}>
                        <img src="https://img.freepik.com/free-photo/nature-tranquil-beauty-reflected-calm-water-generative-ai_188544-12798.jpg?t=st=1716906325~exp=1716909925~hmac=3a034154c44aa6c93a55c6a0bcf12c2752fc9c76f01d780835657645d2e1f25e&w=1380" />
                    </div>
                    <div>
                        <div className={cx(s.fs_12, s.fw_500, s.text_grey1)}>{subvariant}</div>
                        <div className={cx(s.fw_600, s.fs_16, s.productTitle)}>{product_name}</div>
                    </div>
                </div>
                <div>
                    {/* X */}
                </div>
            </div>
            <div>
                <div className={cx(s.fw_600, s.fs_12, s.text_grey1, s.mb_4)}>
                    Select Quantity
                </div>
                <div className={cx(s.productListContainer)}>
                    {Object.keys(flagGroupedData)?.map((flag, i) => {
                        const productList = flagGroupedData?.[flag]
                        return <div key={`PRODUCT_LIST_VIEW_FLAT_ITEM_${i}`}>
                            {productList?.map((item, i) => {
                                const { product_details } = item || {}
                                const { mrp, noOfPcs, selling_rate, priceweight, productCode } = product_details || {}
                                return <div key={`PRODUCT_LIST_VIEW_FLAT_ITEM_PRODUCT_ITEM_${i}`} className={cx(
                                    s.cardItem,
                                    { [s.recommendItem]: flag?.includes("Recommended") },
                                    { [s.schemeItem]: flag?.includes("Scheme") },
                                    { [s.mustShellItem]: flag?.includes("MS") },
                                )}>
                                    <div className={cx(s.p_8, "d-flex flex-column justify-content-center")}>
                                        {i === 0 ? <div className={cx(s.fs_12, s.fw_700, s.pb_4, s.flagName, s.fontMedium)}>{flag}</div> : ""}
                                        <div>
                                            <div><span className={cx(s.fs_12, s.fw_500, s.pr_4, s.fontMedium)}>{priceweight}</span><span className={cx(s.fs_10, s.text_grey1, s.fw_500, s.fontMedium)}>{noOfPcs} pieces / case</span></div>
                                            <div className={cx("d-flex align-items-center", s.fw_500, s.fs_10, s.text_grey1, s.gap_16)}>
                                                <div className={cx(s.fontMedium)}>MRP ₹ {mrp}</div>
                                                <div className={cx(s.fontMedium)}>Rate ₹ {selling_rate}</div>
                                                {/* <div>Margin 2%</div> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx(s.btnContainer, s.p_8)}>
                                        {/* <CartButton productCode={productCode} itemIn="Cs" /> */}
                                        <CartButton productCode={productCode} itemIn="Pc" />
                                    </div>
                                </div>
                            })
                            }
                        </div>
                    })}
                </div>
            </div>
            <Footer />
        </div>
    )
}
