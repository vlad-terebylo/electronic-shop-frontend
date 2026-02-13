import React from 'react';
import ShowAllItems from './ShowAllItems';
import {Link} from "react-router-dom";
import ItemSearchById from "./SearchItemById";

const HomePage = () => {
    return (
        <div>
            <h1>Main admin page</h1>
            <Link to="/items/add">
                <button style={{marginBottom: '20px'}}>Add new item</button>
            </Link>
            <Link to="/item-types">
                <button style={{marginBottom: '20px'}}>Show all item types</button>
            </Link>
            <Link to="/purchases">
                <button style={{marginBottom: '20px'}}>Show all customers' purchases</button>
            </Link>
            <ItemSearchById/>
            <ShowAllItems/>
        </div>
    );
};

export default HomePage;
