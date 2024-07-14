import { ReactSVG } from 'react-svg';
import s from './Sidebar.module.scss';
import cx from "classnames";
import fiterIcon from "../../../assets/svg/filter.svg"

export default function Sidebar(props) {
    const { layoutClassname } = props;
    return (
        <div className={cx(layoutClassname, s.layout)}>
            <div className={cx(s.header)}>
                <ReactSVG src={fiterIcon} />
                <div className={cx(s.fw_600, s.fs_16, s.text_black1)}>Promotion Details</div>
            </div>
            <div className={cx(s.filterSection)}>
                Hello
            </div>
            <div className={s.footer}>
                <button className={cx(s.btn)}>Clear</button>
                <button className={cx(s.btn, s.primary)}>Generate Result</button>
            </div>
        </div>
    )
}
