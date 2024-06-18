import { ReactSVG } from 'react-svg'
import s from './CategoryMenu.module.scss'
import cx from "classnames"
import sortIcon from "../../assets/svg/sort.svg";
import { useDispatch, useSelector } from 'react-redux';
import { setActiveVariant, setCategoryModalStatus, updateActiveVariant } from '../../store/features/orderBooking';
import Modal from '../Modal/Modal';
import VariantsDrillList from '../VariantsDrillList/VariantsDrillList';
import { useState } from 'react';

export default function CategoryMenu() {
    const data = useSelector(state => state?.orderBooking?.normalizedData);
    const categoryModalStatus = useSelector(state => state?.orderBooking?.categoryModalStatus);
    const currentVariant = useSelector(state => state?.orderBooking?.activeVariant);
    const dispatch = useDispatch();
    const [categoryStatus, setCategoryStatus] = useState(false);

    const handleClick = (variant) => {
        dispatch(updateActiveVariant(variant))
    }

    const handleModalClose = (status = false) => {
        dispatch(setCategoryModalStatus(status))
    }

    return (
        <div className={s.layout}>
            {categoryModalStatus ? <Modal onClose={() => handleModalClose(false)}>
                <VariantsDrillList />
            </Modal> : ""}
            <div className={cx("container")}>
                <div className={s.content}>
                    <ul>
                        {data?.map((item, i) => {
                            return <li key={`CATEGORY_MENU_ITEM_${i}`} role="button" onClick={() => handleClick(item?.variant)} className={cx(s.fs_11, { [s.active]: (item?.variant === currentVariant) })}>{item?.variant}</li>
                        })}
                    </ul>
                    <div className={s.btnContainer}>
                        <button onClick={() => handleModalClose(true)}>
                            <ReactSVG src={sortIcon} />
                            Categories
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
