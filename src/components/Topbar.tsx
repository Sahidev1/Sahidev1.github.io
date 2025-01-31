import React, { useEffect, useState } from "react";
import NavBar from "./Navbar";
import { Paths } from "../utils/paths";
import { NavBarInterface } from "./Navbar";
import NameBar from "./NameBar";
import LinksBar from "./LinksBar";

export interface TopBarInterface {
    navFn: (path: string) => void;
};

export default function Topbar(props: TopBarInterface) {
    const possiblePaths: string[] = Object.values(Paths) as string[];
    const availPaths: string[] = possiblePaths;
    const [winLock, setWinLoc] = useState<string>(window.location.pathname);

    // useEffect hook runs on each rerender
    useEffect(() => {
        setWinLoc(window.location.pathname);
    })

    console.log(winLock)

    const pathDescriptorMap = Object.entries(Paths).reduce((acc: Record<string, string>, [key, value]) => {
        acc[value] = key.slice(0, 1).toUpperCase() + key.slice(1, key.length).toLowerCase();
        return acc;
    }, {} as Record<string, string>)

    const navBarProps: NavBarInterface = {
        availPaths: availPaths,
        pathDescriptorMap: pathDescriptorMap,
        navFn: props.navFn,
        winLock: winLock
    };

    return (
        <div className="topbar">
            <NameBar />
            <LinksBar/>
            <NavBar {...navBarProps} />
        </div>);
}