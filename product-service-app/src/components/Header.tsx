import { useContext } from "react";
import { UserContext } from "./UserProvider";

import CommonHeader from "./CommonHeader";


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
                    <header>
                        <CommonHeader user={user} logout={logout}/>
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