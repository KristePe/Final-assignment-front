import React from 'react';
import "./userProfile.css"
import Sidebar from "./Sidebar";
import Header from "./Header";

const UserProfile = () => {

    return (
        <div className="flex stay-top column-responsive-small column-responsive-medium background">
            <div className="flex grow1 ">
                <Sidebar />
            </div>
            <div className="flex grow3 ">
                <Header />
            </div>
        </div>

    );
};

export default UserProfile;