import { ReactSVG } from "react-svg";
import s from "./Header.module.scss";
import cx from "classnames";
import backArrowIcon from "../../../assets/svg/backArrow.svg";

export default function Header() {
    return (
        <div className={cx(s.header)}>
            <div className={cx("container d-flex align-items-center", s.gap_16)}>
                <ReactSVG src={backArrowIcon} />
                <h1 className={cx(s.fs_16, s.fw_600)}>Products & swatches</h1>
            </div>
        </div>
    )
}