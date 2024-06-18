import s from './SubCategoryItems.module.scss'
import { Accordion, AccordionContext, useAccordionButton } from 'react-bootstrap';
import { ReactSVG } from 'react-svg';
import cx from "classnames";
import arrowIcon from "../../assets/svg/subUpArrow.svg";
import AccordionToggle from '../common/AccordionToggle/AccordionToggle';
import ItemCard from '../ItemCard/ItemCard';

export default function SubCategoryItems({ subVariantData }) {
    const { data, subvariant } = subVariantData || {};
    return (
        <Accordion defaultActiveKey="0" key={`sub+_variant_${subvariant}`}>
            <div className={"container"}>
                <div className={cx("d-flex justify-content-between align-items-center")}>
                    <div className={cx(s.fs_12, s.fw_400, s.py_4)}>{subvariant}</div>
                    <AccordionToggle eventKey="0">
                        <ReactSVG src={arrowIcon} />
                    </AccordionToggle>
                </div>
            </div>
            <Accordion.Collapse eventKey="0">
                <div className={cx("container", s.mt_8, s.mb_24)}>
                    <div className={cx(s.bakeryItemLayout)}>
                        {data?.map((item, i) => {
                            return <ItemCard data={item} key={`ITEM_CARD_${i}`} />
                        })}
                    </div>
                </div>
            </Accordion.Collapse>
        </Accordion>
    )
}

