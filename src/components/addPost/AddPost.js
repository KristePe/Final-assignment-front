import React, {useRef, useState} from 'react';
import ReactPlayer from 'react-player'
import '../createTopic/createTopic.css'
import {Button} from "react-bootstrap";
import {TiDeleteOutline} from "react-icons/ti";
import http from "../../plugins/http";
import Dialog from "@mui/material/Dialog";

const AddPost = ({showAddPost, setShowAddPost, topicID, setTopic}) => {

    const descriptionRef = useRef()
    const photoRef = useRef()
    const [photos, setPhotos] = useState([]);
    const [status, setStatus] = useState(null)
    const [photoClass, setPhotoClass] = useState("form-control")
    const [validationDescription, setValidationDescription] = useState("validationMessageHidden")
    const [validationImage, setValidationImage] = useState('validationMessageHidden')

    function photoValidation() {
        if (!photoRef.current.value.includes('http')) {
            photoRef.current.value = ''
            setValidationImage("validationError")
            return setPhotoClass("form-control is-invalid")
        }
    }

    function previewPicture() {
        if (photoRef.current.value.includes('http')) {
            setPhotoClass("form-control")
            setValidationImage("validationMessageHidden")
            setPhotos([...photos, photoRef.current.value])
            photoRef.current.value = ''
        }
    }

    function deletePicture(index) {
        const arr = photos.filter((photo, i) => i !== index)
        setPhotoClass("form-control")
        return setPhotos(arr)
    }

    function topicValidation() {
        if (20 > descriptionRef.current.value.length || descriptionRef.current.value.length > 3500) {
            return setValidationDescription("validationError")
        } else {
            setValidationDescription("validationMessageHidden")
        }
        uploadPost()
    }

    const handleClose = () => {
        setShowAddPost(false);
    }

    async function uploadPost() {
        const topic = {
            topicID,
            description: descriptionRef.current.value,
            photos,
            uploadedPost: new Date().getTime()
        }
        const res = await http.post('/upload-post', topic)
        if (!res.success) return setStatus(res.message)
        if (res.success) {
            setTopic(res.topic)
            setShowAddPost(false)
        }
    }

    return (
        <Dialog
            open={showAddPost}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div className='d-flex align-items-center justify-content-center px-3 py-3'
                 style={{minHeight: 'fit-content'}}>
                <div className='create-post-text-area'>
                    <div></div>
                    <p className='create-post-input-header'>Post</p>
                    <textarea name="" id="" placeholder="Text..." ref={descriptionRef}
                              />
                    <div>
                        <p className='create-post-addPhotos-input-header'>Add photos or video</p>
                        <div className='d-flex flex-wrap'>
                            {photos.map((photo, i) => photo.includes('youtube') ?
                                <div className='d-flex'>
                                    <div className="upload-picture">
                                        <ReactPlayer key={i} width={220} height={170} url={photo}/>
                                    </div>
                                    <TiDeleteOutline onClick={() => deletePicture(i)} className='image-delete'
                                                     style={{color: "red"}}/>
                                </div> :
                                <div key={i} className='d-flex'>
                                    <div>
                                        <img className='upload-picture' src={photo} alt=""/>
                                    </div>
                                    <TiDeleteOutline onClick={() => deletePicture(i)} className='image-delete'
                                                     style={{color: "red"}}/>
                                </div>)}
                        </div>
                        <div className="mb-3 mt-4">
                            <div className="input-group">
                                <input ref={photoRef} type="text" className={photoClass} onBlur={photoValidation}
                                       placeholder="Topic image or video URL" aria-label="Username"
                                       aria-describedby="basic-addon1"
                                       style={{
                                           backgroundColor: '#f5f8fd', fontSize: '16px'
                                       }}/>
                            </div>
                            <Button className="mt-3 auth-btn" data-toggle="modal" data-target="#myModal"
                                    onClick={previewPicture} variant="primary">
                                Add
                            </Button>
                        </div>
                        <div>
                            <Button className="mt-3 mb-3 auth-btn" data-toggle="modal" data-target="#myModal"
                                    onClick={topicValidation} variant="primary">
                                Upload Topic
                            </Button>
                        </div>
                        <div className='text-center'>
                            <p className={validationDescription}>Description should be from 20 to 3500 characters.</p>
                            <p className={validationImage}>Photo or video link should include "http"</p>
                            <p className={'statusMessage'}>{status}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default AddPost;