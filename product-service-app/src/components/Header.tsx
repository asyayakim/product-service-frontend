import { useContext } from "react";
import { UserContext } from "./context/UserProvider";

import CommonHeader from "./CommonHeader";
import Breadcrumbs from "./Breadcrumbs";


export default function Header() {
    const { user, logout } = useContext(UserContext)!;
    const userRole = user?.role ?? 'guest';
    const renderUserHeader = () => {
        return (
            <header className="main-header">
                logged in
            </header>
        );
    };

    const renderHeader = () => {
        switch (userRole) {
            // case "Admin":
            //     return renderAdminHeader();
            case "guest":
                return (
                    <header className="sticky top-0 z-50 border-gray-200 shadow">
                        <CommonHeader user={user} logout={logout} />
                        <div className="light-background">
                            <Breadcrumbs />
                        </div>
                    </header>
                )
            case "User":
            default:
                return (
                    <header>
                        {renderUserHeader()}
                    </header>
                );

        }
    };
    return renderHeader();
}