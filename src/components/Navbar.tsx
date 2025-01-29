import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Paths } from "../utils/paths";

export interface NavBarInterface {
    availPaths:string[]|undefined,
    navFn: (path: string) => void;
    pathDescriptorMap: Record<string, string>;
    winLock:string;
};

export default function NavBar(props:NavBarInterface){
    const [availPaths, navFn, descMap, winLock] = [props.availPaths, props.navFn, props.pathDescriptorMap, props.winLock];
    

    return (
        <div className="navbar">
            {availPaths?.map((path, index) => {
                return (
                    <button className={path === winLock?"navbar_currpath_button":`path${index}`} key={`path${index}`} onClick={()=>navFn(path)}>{descMap[path]}</button>
                )
            })}
        </div>
    );
}