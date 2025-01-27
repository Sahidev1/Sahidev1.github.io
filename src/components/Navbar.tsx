import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Paths } from "../utils/paths";

export interface NavBarInterface {
    availPaths:string[]|undefined,
    navFn: (path: string) => void;
    pathDescriptorMap: Record<string, string>;
};

export default function NavBar(props:NavBarInterface){
    const [availPaths, navFn, descMap] = [props.availPaths, props.navFn, props.pathDescriptorMap];
    

    return (
        <div className="navbar">
            {availPaths?.map((path, index) => {
                return (
                    <button key={`path${index}`} onClick={()=>navFn(path)}>{descMap[path]}</button>
                )
            })}
        </div>
    );
}