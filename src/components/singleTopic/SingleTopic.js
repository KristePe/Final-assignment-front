import React, {useContext, useState, useEffect, useRef} from 'react';
import './singleTopic.css'
import ReactPlayer from "react-player";
import {BsReply} from "react-icons/bs";
import mainContext from "../../context/mainContext";
import AddPost from "../addPost/AddPost";
import SinglePost from "./SinglePost";
import Pagination from "../pagination/Pagination";
import {FaRegCommentDots} from "react-icons/all";

const SingleTopic = ({topic, setTopic, totalPages}) => {

    const pageRef = useRef()
    const {user} = useContext(mainContext)
    const [showAddPost, setShowAddPost] = useState(false)
    const [activePage, setActivePage] = useState(1)


    function getTime(day) {
        const date = new Date(day)
        const days = `${date.getFullYear()}:${date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()}:${date.getDay() < 10 ? '0' + date.getDay() : date.getDay()}`
        const hours = `${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()}`
        return {days, hours}
    }

    useEffect(() => {
        setActivePage(totalPages)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        scrollToBottom()
    }, [pageRef, activePage]);

    const scrollToBottom = () => {
        pageRef.current?.scrollIntoView({behavior: "smooth"})
    }


    return (
        <div className='single-post'>
            <div className='topics-toolbar single-topic-header'>
                <div className='flex-1'>{topic.topicOwner}</div>
                <div className='flex-4'>{getTime(topic.uploadedTopic).days + ' ' + getTime(topic.uploadedTopic).hours}</div>



            </div>

            <div className='topic'>
                <div className='flex-1'>
                    <div className='profile-photo-username-wrap align-items-start'>
                        <img className='userPhoto border-radius0' src={topic.topicOwnerInfo.photo} alt=""/>
                        <div className="d-flex flex-column align-items-center">
                            <p style={{fontSize: 12}}>User from: {getTime(topic.topicOwnerInfo.registered).days}</p>
                            <p style={{fontSize: 12}}>Posts: {topic.topicOwnerInfo.posts}</p>
                        </div>
                    </div>
                </div>
                <div className='flex-4 '>
                    <h3>{topic.title}</h3>
                    <p>{topic.description}</p>

                    <div className='pb-4'>
                        {topic.photos.map((photo, i) => photo.includes('youtube') ?
                            <div key={i} className='d-flex'>
                                <div>
                                    <ReactPlayer key={i} width={200} height={130} url={photo}/>
                                </div>
                            </div> :
                            <div key={i} className='d-flex'>
                                <div>
                                    <img className='upload-picture' src={photo} alt=""/>
                                </div>
                            </div>)}
                    </div>
                </div>
            </div>

            {topic.posts.map((post, i) => {
                if (i >= (activePage - 1) * 10 && i < (activePage) * 10)
                    return <SinglePost key={i} index={i} post={post}/>
            })}
            {user && <div className='d-flex flex-row-reverse justify-content-between align-items-center'>
                <div className="toolbar-signup-login-wrap">
                    <p className="toolbar-auth-btn m-0" onClick={() => setShowAddPost(true)}>
                        <FaRegCommentDots className='favorite-symbol'/>
                      Comment
                    </p>
                </div>
                {(totalPages !== 1) &&
                    <Pagination activePage={activePage} setActivePage={setActivePage} totalPages={totalPages}/>}
            </div>}
            <AddPost showAddPost={showAddPost} setShowAddPost={setShowAddPost} topicID={topic._id} setTopic={setTopic}/>
            <div ref={pageRef}/>
        </div>
    );
};

export default SingleTopic;