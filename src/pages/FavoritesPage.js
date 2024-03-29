import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import http from "../plugins/http";

import mainContext from "../context/mainContext";
import TopicComponent from "../components/oneTopic/TopicComponent";

const FavoritesPage = () => {

    const {favoritesIds, favorites, setFavorites} = useContext(mainContext)

    async function getFavorites() {
        const favorites = await JSON.parse(localStorage.getItem('favorites'))
        const res = await http.post('/get-favorites', favorites)
        if (res.success) setFavorites(res.favoriteTopics)
    }

    useEffect(() => {
        getFavorites()
        // eslint-disable-next-line
    }, [favoritesIds])

    return (
        <Container fluid='sm'>
            <div className='topics-toolbar'>
                <h5 className='col-7 ms-sm-2'>All Topics</h5>
                <h5 className='col-1 text-center'>Comments</h5>
                <h5 className='col-3 text-center'>Last posted</h5>
                <h5 className='col-1 text-center'>Favorites</h5>
            </div>
            {favorites.map((favorite, i) => <TopicComponent key={i} topic={favorite}/>)}
        </Container>
    );
};

export default FavoritesPage;