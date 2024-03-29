import React from 'react';
import ReactPlayer from "react-player";

const SinglePost = ({post, index}) => {


    function getTime(day) {
        const date = new Date(day)
        const days = `${date.getFullYear()}:${date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()}:${date.getDay() < 10 ? '0' + date.getDay() : date.getDay()}`
        const hours = `${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()}`
        return {days, hours}
    }

    return (
        <div className='single-post'>
            <div className='topics-toolbar' style={{backgroundColor: '#b0b0b0'}}>
                <div className='flex-1'>{post.postOwnerInfo.username}</div>
                <div className='flex-4 d-flex justify-content-between'>
                    <div>
                        {getTime(post.uploadedPost).days + ' ' + getTime(post.uploadedPost).hours}
                    </div>
                    <div>#{index + 1}</div>
                </div>
            </div>
            <div className='topic'>
                <div className='flex-1'>
                    <div className='profile-photo-username-wrap align-items-start'>
                        <img className='userPhoto border-radius0' src={post.postOwnerInfo.photo} alt=""/>
                        <div className="d-flex flex-column align-items-center">
                            <p style={{fontSize: 12}}>User from: {getTime(post.postOwnerInfo.registered).days}</p>
                            <p style={{fontSize: 12}}>Posts: {post.postOwnerInfo.posts}</p>
                        </div>
                    </div>
                </div>
                <div className='flex-4 '>
                    <p className='mt-3'>{post.description}</p>

                    <div className='pb-4'>
                        {post.photos.map((photo, i) => photo.includes('youtube') ?
                            <div key={i} className='d-flex'>
                                <div>
                                    <ReactPlayer key={i} width={400} height={250} url={photo}/>
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
        </div>
    );
};

export default SinglePost;