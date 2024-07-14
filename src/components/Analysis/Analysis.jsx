import s from './Analysis.module.scss'
import cx from "classnames";
import Sidebar from './Sidebar/Sidebar';

export default function Analysis() {
    return (
        <div className={cx(s.layout)}>
            <Sidebar layoutClassname={s.sidebar} />
            <div className={cx(s.topbar)}>topbar</div>
            <div>mainbar</div>
            <div>right</div>
        </div>
    )
}
