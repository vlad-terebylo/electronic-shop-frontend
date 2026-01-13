import React from 'react';
import ShowAllItems from './ShowAllItems';
import {Link} from "react-router-dom";

const HomePage = () => {
    return (
        <div>
            <h1>Main admin page</h1>
            <Link to="/add_new_item">
                <button style={{marginBottom: '20px'}}>Add new item</button>
            </Link>
            <ShowAllItems/>
        </div>
    );
};

export default HomePage;
