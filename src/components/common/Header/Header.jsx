import { ReactSVG } from "react-svg";
import s from "./Header.module.scss";
import cx from "classnames";
import logoIcon from "../../../assets/svg/logo.svg";

export default function Header() {
    return (
        <div className={cx(s.header)}>
            {/* <div className={cx("container d-flex align-items-center", s.gap_16)}> */}
            <ReactSVG className={cx(s.logo)} src={logoIcon} />
            <div className={s.divider} />
            <h1 className={cx(s.fs_20, s.text_white, s.fw_500, s.ml_24)}>BOL Impact Analysis</h1>
            {/* </div> */}
        </div>
    )
}