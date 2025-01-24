import React from "react";
import { Link } from "react-router";


export default function NavBar(){
    return (
        <div className="navbar">
            <Link to="/about"> About </Link>
        </div>
    );
}