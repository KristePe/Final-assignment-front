import React, {useContext, useEffect, useState} from 'react';
import './oneTopicStyle.css'
import {Link} from "react-router-dom"
import {MdOutlineTopic} from "react-icons/md";
import mainContext from "../../context/mainContext";
import {BsBraces} from "react-icons/all";

const TopicComponent = ({topic}) => {

    const [getWatching, setWatching] = useState(false);
    const {favorites, setFavoritesIds} = useContext(mainContext)
    const date = new Date(topic.lastPostInfo.lastPostTime)
    const lastPost = `${date.getFullYear()}:${date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()}:${date.getDay() < 10 ? '0' + date.getDay() : date.getDay()}`
    const time = `${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()}`

    function addToFavorites() {
        const values = JSON.parse(localStorage.getItem('favorites'))
        if (values.includes(topic.id)) {
            const index = values.indexOf(topic.id)
            values.splice(index, 1)
        } else {
            values.push(topic.id)
        }
        localStorage.setItem('favorites', JSON.stringify(values));
        setFavoritesIds(values)
        setWatching(!getWatching)
    }

    useEffect(() => {
        const values = JSON.parse(localStorage.getItem('favorites'))
        if (values && values.includes(topic.id)) {
            return setWatching(true)
        } else {
            return setWatching(false)
        }
        // eslint-disable-next-line
    }, [favorites])

    return (
        <div className='topic'>
            <p className='col-7 ms-sm-2'>
                <BsBraces className='me-sm-2'/>
                <Link
                to={'/topic/' + topic.id}>{topic.title}
                </Link>
            </p>

            <p className='col-1 text-center'>{topic.postsCount}</p>

            <div className='col-3 text-center'>
                <div
                    style={{fontWeight: 400, fontSize: "16px"}}
                >{topic.lastPostInfo.lastPostUser}
                </div>

                <div style={{fontWeight: 300, fontSize: "12px"}}
                >{lastPost + ' ' + time}
                </div>
            </div>
            <div className='favorite-symbol col-1 text-center' onClick={addToFavorites}
                 style={{color: getWatching ? 'limegreen' : 'lightgray'}}>♥
            </div>
        </div>
    );
};

export default TopicComponent;