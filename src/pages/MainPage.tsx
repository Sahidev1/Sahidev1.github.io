import React, { useContext, useEffect, useState } from "react";
import { dataDir } from "../utils/util";
import { ContentLangContext } from "../App";
import { GitHubLogo, LinkedInLogo } from "../components/Logos";





type Contents = {
    introduction: string;
    whoami: string;
    interests: string;
}

type LangMap = {
    [key: string]: Contents;
}

class MainPageContents {
    langMap: LangMap;
    private fileName: string;

    constructor() {
        this.langMap = {};
        this.fileName = "mainpage";
    }

    async fetchData() {
        try {
            console.log("fetching");
            let resp = await fetch('/' + this.fileName + '.json');
            let json: Promise<any> = await resp.json();
            this.langMap = (await json)['contents'] as LangMap;
            console.log(this.langMap);

        } catch (error) {
            console.error(error)
        }
    }
}

const content: MainPageContents = new MainPageContents();

export default function MainPage() {
    const contentLang: string = useContext<string>(ContentLangContext);
    const [fetchDone, setFetchDone] = useState<boolean>(false);

    const [showConstruction, setShowConstruction] = useState<boolean>(true);

    useEffect(() => {
        content.fetchData()
            .then(() => setFetchDone(true))
            .catch(err => console.log(err));
    }, [])

    console.log(fetchDone)
    console.log(content.langMap[contentLang])

    return (
        <div className="main-page">
        
        
            <h1 hidden={!showConstruction} onClick={()=>setShowConstruction(!showConstruction)}> UNDER CONSTRUCTION 🏗️ </h1>
            {fetchDone ?
                Object.keys(content.langMap[contentLang]).map((key) => {
                    return <p className={key} key={key}> {(content.langMap[contentLang] as any)[key]} </p>
                })
                : <p>loading</p>}
        </div>
    );
}