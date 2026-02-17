import React from 'react';
import ShowAllItems from './ShowAllItems';
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="container">
            <h1>Main admin page</h1>

            <div className="button-group">
                <Link to="/items/add">
                    <button>Add new item</button>
                </Link>
                <Link to="/item-types">
                    <button>Show all item types</button>
                </Link>
                <Link to="/purchases">
                    <button>Show all customers' purchases</button>
                </Link>
            </div>

            <ShowAllItems />
        </div>
    );
};

export default HomePage;