import React, {useContext, useState} from 'react';
import mainContext from "../../context/mainContext";
import './sidebar.css'
import {BsCamera} from "react-icons/bs";
import ChangePassword from "../userSettingsComponents/ChangePassword";
import ChangePhoto from "../userSettingsComponents/ChangePhoto";
import {IoSettingsOutline, IoTrashOutline} from "react-icons/io5";

const Sidebar = () => {

    const {user, setUser} = useContext(mainContext)
    const [showChangePassword, setShowChangePassword] = useState(false)
    const [showChangePhoto, setShowChangePhoto] = useState(false)
    const date = new Date(user?.createdAccount)
    const time = `${date.getFullYear()}:${date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()}:${date.getDay() < 10 ? "0" + date.getDay() : date.getDay()}`

    return (
        <div className="profile-sidebar-wrap">
            <div className="align-center-column" style={{userSelect: "none"}}>
                <div className="profile-photo-username-wrap">
                    <img className="userPhoto" src={user?.photo} alt=""/>
                    <div className="d-flex flex-column align-items-center">
                        <p className="profile-username">{user?.username}</p>
                        <p style={{fontSize: 12}}>User from: {time}</p>
                    </div>
                </div>

                <div className="flex sidebar-tab-wrap ">
                    <hr/>
                    <div>
                        <div className='sidebar-underTab'>
                            <div onClick={() => setShowChangePhoto(true)} className='sidebar-tab'>
                                <BsCamera/>
                                <p className='ms-lg-3'>Change profile picture</p>
                            </div>
                            <div onClick={() => setShowChangePassword(true)} className='sidebar-tab'>
                                <IoSettingsOutline/>
                                <p className='ms-lg-3'>Change password</p>
                            </div>
                        </div>
                    </div>
                    <hr/>
                </div>
                {showChangePassword &&
                    <ChangePassword setShowChangePassword={setShowChangePassword}
                                    showChangePassword={showChangePassword}/>}
                {showChangePhoto &&
                    <ChangePhoto showChangePhoto={showChangePhoto} setShowChangePhoto={setShowChangePhoto}
                                 setUser={setUser}/>}


                <div className='sidebar-underTab'>
                    <div onClick={() => setShowChangePhoto(true)}
                         className='sidebar-tab'>
                        <IoTrashOutline/>
                        <p className='ms-lg-3'
                        style={{fontSize: '12px'}}
                        >Delete account</p>
                    </div>
                </div>


            </div>
        </div>
    );
};
export default Sidebar;
