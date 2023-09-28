import s from "./Header.module.scss";
import cx from "classnames";

export default function Header() {
    return (
        <div className={cx(s.header)}>
            <h1>Products & swatches</h1>
        </div>
    )
}
