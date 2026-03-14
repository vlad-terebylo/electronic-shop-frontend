import React from 'react';
import ShowAllItems from './item/ShowAllItems';
import {Link} from "react-router-dom";
import AuthButton from "../core/AuthButton";

const MainPage = () => {

    return (
        <div className="container">
            <h1>Main admin page</h1>

            <AuthButton/>

            <Link to="/items/cart">
                <button style={{margin: '5px'}}>Go to shopping cart</button>
            </Link>

            {/*<Link to="/login">*/}
            {/*    <button style={{margin: '5px'}}>Login</button>*/}
            {/*</Link>*/}

            <ShowAllItems/>
        </div>
    )
};

export default MainPage;