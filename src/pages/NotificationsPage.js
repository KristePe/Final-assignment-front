import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import http from "../plugins/http";
import mainContext from "../context/mainContext";
import SingleNotification from "../components/singleNotification/SingleNotification";

const NotificationsPage = () => {

    const {notifications, setNotifications} = useContext(mainContext)

    async function getNotifications() {
        const res = await http.get('/get-notifications')
        if (res.success) setNotifications(res.notifications)
    }

    useEffect(() => {
        getNotifications()
        // eslint-disable-next-line
    },[])

    return (
        <Container fluid='sm'>
            <div className='topics-toolbar'>
                <h5 className='col-7 ms-sm-2'>Topic</h5>
                <h5 className='col-1 text-center'>Replies</h5>
                <h5 className='col-3 text-center'>Last post</h5>
                <h5 className='col-1 text-center'>Add to favorites</h5>
            </div>
            {notifications.map((notification, i) => <SingleNotification key={i} notification={notification} index={i}/>)}

        </Container>
    );
};

export default NotificationsPage;