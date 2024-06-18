import s from './OrderBooking.module.scss';
import CategorySlide from '../CategorySlide/CategorySlide';
import cx from "classnames";
import Accordion from 'react-bootstrap/Accordion';
import { useContext } from 'react';
import { AccordionContext, Card, useAccordionButton } from 'react-bootstrap';
import { ReactSVG } from 'react-svg';
import arrowIcon from "../../assets/svg/backArrow.svg";
import CategoryItems from '../CategoryItems/CategoryItems';
import CategoryMenu from '../CategoryMenu/CategoryMenu';
import FooterBar from '../FooterBar/FooterBar';
import Modal from '../Modal/Modal';
import ProductDetailedView from '../ProductDetailedView/ProductDetailedView';
import { useDispatch, useSelector } from 'react-redux';
import ProductSelectionView from '../ProductSelectionView/ProductSelectionView';
import { setActiveProduct } from '../../store/features/orderBooking';

export default function OrderBooking() {
    const activeProduct = useSelector(state => state?.orderBooking?.activeProduct)
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(setActiveProduct(null))
    }
    return (
        <div className={s.layout}>
            {activeProduct ? <Modal onClose={handleClose}>
                {/* <ProductDetailedView /> */}
                <ProductSelectionView />
            </Modal> : ""}
            <section className={cx(s.categorySlideSection)}>
                <CategorySlide />
            </section>
            <section className={s.orderItemSection}>
                <CategoryItems />
            </section >
            <section className={s.footerSection}>
                <CategoryMenu />
                <FooterBar />
            </section>
        </div >
    )
}
