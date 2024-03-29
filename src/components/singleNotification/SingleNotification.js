import React, {useContext, useEffect, useState} from 'react';
import '../oneTopic/oneTopicStyle.css'
import {Link, useNavigate} from "react-router-dom"
import {MdOutlineTopic} from "react-icons/md";
import mainContext from "../../context/mainContext";
import http from "../../plugins/http";

const SingleNotification = ({notification, index}) => {

        const nav = useNavigate()
        const [getWatching, setWatching] = useState(false);
        const {favorites, setFavoritesIds, setUser} = useContext(mainContext)
        const date = new Date(notification.lastPostInfo.lastPostTime)
        const lastPost = `${date.getFullYear()}:${date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()}:${date.getDay() < 10 ? '0' + date.getDay() : date.getDay()}`
        const time = `${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()}`

        function addToFavorites() {
            const values = JSON.parse(localStorage.getItem('favorites'))
            if (values.includes(notification.id)) {
                const index = values.indexOf(notification.id)
                values.splice(index, 1)
            } else {
                values.push(notification.id)
            }
            localStorage.setItem('favorites', JSON.stringify(values));
            setFavoritesIds(values)
            setWatching(!getWatching)
        }

        async function deleteNotification(id) {
            const res = await http.get('/delete-notification/' + id)
            if (res.success) {
                setUser(res.user)
                nav('/topic/' + notification.id)
            }
        }


        useEffect(() => {
            const values = JSON.parse(localStorage.getItem('favorites'))
            if (values && values.includes(notification.id)) {
                return setWatching(true)
            } else {
                return setWatching(false)
            }
            // eslint-disable-next-line
        }, [favorites])

        return (
            <div className='topic'>
                <p className='col-7 ms-sm-2' style={{cursor: "pointer"}} onClick={() => deleteNotification(index)}>
                    <MdOutlineTopic
                        className='me-sm-2'/>{notification.title}</p>
                <p className='col-1 text-center'>{notification.postsCount}</p>
                <div className='col-3 text-center'>
                    <div>{lastPost + ' ' + time}</div>
                    <div>{notification.lastPostInfo.lastPostUser}</div>
                </div>
                <div className='favorite-symbol col-1 text-center' onClick={addToFavorites}
                     style={{color: getWatching ? 'red' : 'lightgray'}}>♥
                </div>
            </div>
        );
    }
;

export default SingleNotification;