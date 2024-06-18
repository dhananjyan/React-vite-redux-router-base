import { useDispatch, useSelector } from 'react-redux';
import s from './VariantsDrillList.module.scss';
import cx from "classnames";
import { Accordion } from 'react-bootstrap';
import AccordionToggle from '../common/AccordionToggle/AccordionToggle';
import arrowIcon from "../../assets/svg/upArrow.svg";
import { ReactSVG } from 'react-svg';
import { setCategoryModalStatus, updateActiveVariant } from '../../store/features/orderBooking';

export default function VariantsDrillList() {
  const data = useSelector(state => state?.orderBooking?.normalizedData);
  return (
    <div className={cx(s.layout)}>
      <div className={cx(s.header)}>
        <div className={cx(s.fw_600, s.fs_18)}>Categories</div>
      </div>
      <div className={s.main}>
        {data?.map((item, i) => {
          return <VariantCollapse  i={i} variantData={item} key={`VariantCollapse_${i}`} />
        })}
      </div>
    </div>
  )
}

const VariantCollapse = ({ i, variantData }) => {
  const { variant, data } = variantData || {};
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(updateActiveVariant(variant))
    dispatch(setCategoryModalStatus(false))
  }
  return <Accordion key={`VariantDRILLCOLLAP_${i}`}>
    <div className={cx("d-flex align-items-center", s.gap_5, s.mt_16)}>
      <div className={cx(s.fs_16, s.fw_600, s.text_green)} onClick={handleClick} role="button">{variant}</div>
      <AccordionToggle eventKey="0">
        <ReactSVG src={arrowIcon} />
      </AccordionToggle>
    </div>
    <Accordion.Collapse eventKey="0">
      <div>
        {data?.map((item, i) => {
          return <SubVariantCollapse key={`sub variant ocllapse_${i}`} subVariantData={item} />
        })}
      </div>
    </Accordion.Collapse>
  </Accordion>
}

const SubVariantCollapse = ({ i, subVariantData }) => {
  const { subvariant, data } = subVariantData || {};
  return <Accordion key={`subVariantDRILLCOLLAP_${i}`}>
    <div className={cx("d-flex align-items-center", s.gap_5, s.mt_16)}>
      <div className={cx(s.fs_14, s.fw_600, s.py_12, s.pl_8, s.fontMedium)}>{subvariant}</div>
      <AccordionToggle eventKey="0">
        <ReactSVG src={arrowIcon} />
      </AccordionToggle>
    </div>
    <Accordion.Collapse eventKey="0">
      <div className={cx("d-flex flex-column", s.gap_8)}>
        {data?.map((item, i) => <div key={`PRODUCT_NAME_${i}`} className={cx(s.pl_16)}>{item?.product_name}</div>)}
      </div>
    </Accordion.Collapse>
  </Accordion>
}