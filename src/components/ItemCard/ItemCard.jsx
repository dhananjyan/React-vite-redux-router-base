import { useDispatch } from 'react-redux';
import s from './ItemCard.module.scss';
import cx from "classnames"
import { updateActiveProduct } from '../../store/features/orderBooking';

export default function ItemCard({ data }) {
    const { product_name, priceweight } = data || {};

    const dispatch = useDispatch();

    const handleAdd = () => {
        dispatch(updateActiveProduct(data))
    }
    return (
        <div className={s.layout} key={`ITEM_CARD_${product_name}`}>
            <div className={s.imgContainer}>
                <img src="https://img.freepik.com/free-photo/nature-tranquil-beauty-reflected-calm-water-generative-ai_188544-12798.jpg?t=st=1716906325~exp=1716909925~hmac=3a034154c44aa6c93a55c6a0bcf12c2752fc9c76f01d780835657645d2e1f25e&w=1380" />
            </div>
            <div>
                <div className={cx(s.mt_6, s.fs_14, s.fw_500, s.fontMedium, s.prodName)}>{product_name}</div>
                <div className={cx(s.mt_6, s.fs_11, s.fw_400)}>Available Sizes</div>
                <div className={cx(s.fs_12, s.fw_500, s.fontMedium)}>{priceweight}</div>
            </div>
            <button className={cx(s.mt_6, s.py_6, s.px_12, s.fs_12, s.fw_700, s.text_green, s.fontMedium)} onClick={handleAdd}>ADD</button>
        </div>
    )
}
