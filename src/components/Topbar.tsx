import React, { useEffect, useState } from "react";
import NavBar from "./Navbar";
import { Paths } from "../utils/paths";
import { NavBarInterface } from "./Navbar";

export interface TopBarInterface {
    navFn:(path:string) => void;
};

export default function Topbar(props:TopBarInterface){

    const possiblePaths:string[] = Object.values(Paths) as string[];
    const [availPaths, setAvailPaths] = useState<undefined|string[]>(undefined);

    // useEffect hook runs on each rerender
    useEffect(()=>{
        // current window path
        const currPath:string = window.location.pathname;

        const avails = possiblePaths.filter(val => val !== currPath);
        
        // If avails and availPath arrays are not identical we update the availPaths which triggers a rerender
        if(avails.length == availPaths?.length){
            if(!avails.every((val, i) => val == availPaths[i])){
                setAvailPaths(avails)
            }
        }
        else {
            setAvailPaths(avails)
        }
    })


    const pathDescriptorMap = Object.entries(Paths).reduce((acc: Record<string,string>, [key, value]) => {
        acc[value] = key.slice(0,1).toUpperCase()+key.slice(1, key.length).toLowerCase();
        return acc;
    }, {} as Record<string, string>)
    
    const navBarProps:NavBarInterface = {
        availPaths: availPaths,
        pathDescriptorMap: pathDescriptorMap,
        navFn:  props.navFn
    };

    return (
    <div className="topbar">
        <NavBar {...navBarProps}/>
    </div>);
}