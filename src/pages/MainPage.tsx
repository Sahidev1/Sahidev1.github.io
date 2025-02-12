import React, { useContext, useEffect, useState } from "react";
import { dataDir } from "../utils/util";
import { ContentLangContext } from "../App";
import { GitHubLogo, LinkedInLogo } from "../components/Logos";





type Contents = {
    "intro": { [key: string]: string | null };
    "skills": { [key: string]: string | null };
};

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

    hasLang(lang: string): boolean {
        return (this.langMap[lang] && true) || false;
    }

    getContents(lang: string): Contents | null {
        if (!this.langMap[lang]) {
            return null;
        }
        return this.langMap[lang];
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


            <h1 hidden={!showConstruction} onClick={() => setShowConstruction(!showConstruction)}> UNDER CONSTRUCTION 🏗️ </h1>
            {fetchDone && content.hasLang(contentLang) ?
                <div className="contents">
                    <span className="intro">
                        {(content.getContents(contentLang) as any)["intro"] ?
                            Object.keys((content.getContents(contentLang) as any)["intro"]).map(e => {
                                let intro = (content.getContents(contentLang) as any)["intro"];
                                if (e == "title") {
                                    return <h2 className={e} key={e}>{intro[e]}</h2>
                                }
                                return <p className={e} key={e}>{intro[e]}</p>
                            })
                            : ""}
                    </span>
                    <span className="skills">
                        {(content.getContents(contentLang) as any)["skills"] ?
                            Object.keys((content.getContents(contentLang) as any)["skills"]).map(e => {
                                let skills = (content.getContents(contentLang) as any)["skills"];
                                if (e == "title") {
                                    return <h2 className={e} key={e}>{skills[e]}</h2>
                                }
                                return <p className={e} key={e}>
                                    <strong>{`${e.slice(0,1).toUpperCase()+e.slice(1,e.length)}: `}</strong>{skills[e]}
                                </p>
                            })
                            : ""}
                    </span>
                </div>
                : <p>loading</p>


            }
        </div>
    );
}