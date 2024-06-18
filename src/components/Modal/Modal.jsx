import { createPortal } from 'react-dom'
import s from "./Modal.module.scss"
import cx from "classnames"
import { ReactSVG } from 'react-svg';
import closeIcon from "../../assets/svg/close.svg";

export default function Modal(props) {
    const { children, onClose = () => { } } = props;
    return (
        <>
            {createPortal(
                <div className={s.layout}>
                    <div className={cx(s.modal)}>
                        <div className={s.modalContent}>
                            <div className={s.closeBtnContainer}>
                                <div className={s.closeBtn} onClick={onClose} role="button">
                                    <ReactSVG src={closeIcon} />
                                </div>
                            </div>
                            {children}
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    )
}
