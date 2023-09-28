import { Outlet, Link } from "react-router-dom";
import Header from "../components/common/Header/Header";

import cx from "classnames"
import s from "../assets/scss/routes/Layout.module.scss";


export default function Layout() {
    return (
        <div className={cx(s.layout)}>
            <Header />
            <div>
                <Outlet />
            </div>
        </div>
    )
}
