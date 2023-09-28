import { Outlet, Link } from "react-router-dom";

export default function Layout() {
    return (
        <div>
            sidebar
            header
            footer

            <ul>
                <li>
                    <Link to={`/contacts/1`}>Your Name</Link>
                </li>
                <li>
                    <Link to={`/contacts/2`}>Your Friend</Link>
                </li>
            </ul>
            <Outlet />
        </div>
    )
}
