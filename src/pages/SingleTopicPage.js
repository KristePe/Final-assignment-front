import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import http from "../plugins/http";
import {useParams} from "react-router-dom";
import SingleTopic from "../components/singleTopic/SingleTopic";

const SingleTopicPage = () => {

    const [topic, setTopic] = useState(null)
    const [totalPages, setTotalPages] = useState(null)
    const {id} = useParams()

    async function getTopicInfo() {
        const res = await http.get('/single-topic/' + id)
        if (res.success) {
            setTotalPages(res.totalPages);
            setTopic(res.topic)
        }
    }

    useEffect(() => {
        getTopicInfo()
        // eslint-disable-next-line
    }, [])

    return (<Container
        fluid='sm' className='main-page pb-5'>
        {topic ? <SingleTopic topic={topic} setTopic={setTopic} totalPages={totalPages}/> :
            <div />}
    </Container>);
};

export default SingleTopicPage;