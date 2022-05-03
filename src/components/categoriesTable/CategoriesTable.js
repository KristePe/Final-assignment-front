import React, {useEffect, useState, useContext} from 'react';
import {useParams} from "react-router-dom";
import './categoriesTable.css'
import data from '../../assets/categories.json'
import mainContext from "../../context/mainContext";

// import http from "../../plugins/http";




const CategoriesTable = () => {

    return (
        <div calssName='table'>
            {/*<table className={'table'}>*/}
            {/*    <thead className={'tableRowHeader'}>*/}
            {/*    <tr>*/}
            {/*        <th className={'tableHeader'}>CATEGORY</th>*/}
            {/*        <th className={'tableHeader'}>TOPICS</th>*/}
            {/*        <th className={'tableHeader'}>POSTS</th>*/}
            {/*        <th className={'tableHeader'}>LAST POSTED</th>*/}
            {/*    </tr>*/}
            {/*    </thead>*/}
            {/*    <tbody>*/}
            {/*    {data.map((category, index) => (*/}
            {/*        <tr data-index={index}>*/}
            {/*            <td className={'tableCell'}>{category.categoryName}</td>*/}
            {/*            <td className={'tableCell'}>{category.topics}</td>*/}
            {/*            <td className={'tableCell'}>{category.posts}</td>*/}
            {/*            <td className={'tableCell'}>{category.lastPostDate}</td>*/}
            {/*        </tr>*/}
            {/*    ))}*/}
            {/*    </tbody>*/}
            {/*</table>*/}

        </div>
    );
};

export default CategoriesTable;