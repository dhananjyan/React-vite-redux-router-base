import { useDispatch, useSelector } from 'react-redux';
import s from './CategorySlide.module.scss';
import cx from "classnames"
import { updateActiveFlag } from '../../store/features/orderBooking';

export default function CategorySlide() {
    const flagList = useSelector(state => state.orderBooking?.flagList);
    const activeFlag = useSelector(state => state.orderBooking?.activeFlag);
    const dispatch = useDispatch();
    const handleSelect = (flag) => {
        dispatch(updateActiveFlag(flag))
    }
    return (
        <div className={cx(s.slideContainer, "container")}>
            {
                flagList?.map((item, i) => {
                    return <div key={`CATEGORY_SLIDE_${i}`} className={cx(s.item, s.py_8, s.px_16, { [s.highlight]: (activeFlag === item) })} role="button" onClick={() => handleSelect(item)}>
                        <div className={cx("text-nowrap", s.fs_16)}>{item}</div>
                    </div>
                })
            }
        </div>
    )
}
