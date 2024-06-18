import { ReactSVG } from 'react-svg';
import s from './FooterBar.module.scss';
import cx from "classnames";
import rightArrowIcon from "../../assets/svg/rightArrow.svg";
import Modal from '../Modal/Modal';
import { useNavigate } from 'react-router-dom';

export default function FooterBar() {
    const navigate = useNavigate();

    const handleProceed = () => {
        navigate("/order-booking/summary")
    }
    return (
        <div className={s.layout}>
            <div className='container'>
                <div className={cx("d-flex justify-content-end")}>
                    <button
                        onClick={handleProceed}
                    >
                        Proceed
                        <ReactSVG src={rightArrowIcon} />
                    </button>
                </div>
            </div>
        </div>
    )
}