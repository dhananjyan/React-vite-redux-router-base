import { useContext } from "react";
import { AccordionContext, useAccordionButton } from "react-bootstrap";
import s from "./AccordionToggle.module.scss"
import cx from 'classnames'

export default function AccordionToggle({ children, eventKey, callback }) {
    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(
        eventKey,
        () => callback && callback(eventKey),
    );

    const isActive = activeEventKey === eventKey;

    return (
        <div
            onClick={decoratedOnClick}
            role='button'
            className={cx(s.collapseBtn, { [s.rotate]: !isActive })}
        >
            {children}
        </div>
    );
}