import s from './CategoryItems.module.scss'
import { Accordion, AccordionContext, useAccordionButton } from 'react-bootstrap';
import { ReactSVG } from 'react-svg';
import cx from "classnames";
import { useContext } from 'react';
import arrowIcon from "../../assets/svg/upArrow.svg";
import AccordionToggle from '../common/AccordionToggle/AccordionToggle';
import SubCategoryItems from '../SubCategoryItems/SubCategoryItems';
import { useSelector } from 'react-redux';

export default function CategoryItems() {

    const data = useSelector(state => state.orderBooking?.flagFilteredData);
    const activeVariant = useSelector(state => state.orderBooking?.activeVariant);

    return (<>
        {data.map((item, i) => {
            const { variant, data } = item || {};
            // if (activeVariant === variant)
                return <Accordion defaultActiveKey="0" key={`Variant_${variant}`}>
                    <div className={"container"}>
                        <div className={cx("d-flex justify-content-between align-items-center")}>
                            <div className={cx(s.fs_14, s.fw_600, s.py_12)}>{variant}</div>
                            <AccordionToggle eventKey="0">
                                <ReactSVG src={arrowIcon} />
                            </AccordionToggle>
                        </div>
                    </div>
                    <Accordion.Collapse eventKey="0">
                        <div>
                            {data?.map((item, i) => {
                                return <SubCategoryItems key={`sub_items+${i}`} subVariantData={item} />
                            })}
                        </div>
                    </Accordion.Collapse>
                </Accordion>
        })}
    </>
    )
}

