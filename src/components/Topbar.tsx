import React, { useEffect, useState } from "react";
import NavBar from "./Navbar";
import { Paths } from "../utils/paths";
import { NavBarInterface } from "./Navbar";

export interface TopBarInterface {
    navFn:(path:string) => void;
};

export default function Topbar(props:TopBarInterface){

    const possiblePaths:string[] = Object.values(Paths) as [string];
    const [availPaths, setAvailPaths] = useState<undefined|string[]>(undefined);

    useEffect(()=>{
        const currPath:string = window.location.pathname;

        const avails = possiblePaths.filter(val => val !== currPath);
        
        if(avails.length == availPaths?.length){
            if(!avails.every((val, i) => val == availPaths[i])){
                setAvailPaths(avails)
            }
        }
        else {
            setAvailPaths(avails)
        }

    })

    const navBarProps:NavBarInterface = {
        availPaths: availPaths,
        navFn:  props.navFn
    };

    return (
    <div className="topbar">
        <NavBar {...navBarProps}/>
    </div>);
}