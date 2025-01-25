import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Paths } from "../utils/paths";

export interface NavBarInterface {
    availPaths:string[]|undefined,
    navFn: (path: string) => void;
};

export default function NavBar(props:NavBarInterface){
    const [availPaths, navFn] = [props.availPaths, props.navFn];
    

    return (
        <div className="navbar">
            {availPaths?.map((path) => {
                return (
                    <button onClick={()=>navFn(path)}>{path}</button>
                )
            })}
        </div>
    );
}