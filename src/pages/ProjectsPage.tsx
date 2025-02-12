import React, { useEffect, useRef, useState } from "react";
import CacheReader from "../utils/CacheReader";
import { GitHubProjectInterface } from "../utils/CacheReader";
import { GitHubLogo } from "../components/Logos";


export default function ProjectsPage() {
    const cacheReaderRef = useRef<CacheReader>(new CacheReader);
    const cacheReader: CacheReader = cacheReaderRef.current;
    const [scraped, setScraped] = useState(false);
    cacheReader.addObserver(() => setScraped(true));

    useEffect(() => {
        const loadAndFetch = async () => {
            try {
                await cacheReader.loadCacheIndexData();
                if (cacheReader.hasProjectIDs()) {
                    await cacheReader.fetchAll();
                    console.log(cacheReader.projects)
                } else {
                    throw Error("no project id's loaded");
                }
            } catch (error) {
                console.error(error)
            }
        }

        loadAndFetch();

        return (() => cacheReader.clearCache());
    }, [])

    console.log(scraped)

    return <div className="projects-page">
        <h1>My Projects</h1>
        <div className="project-legend">
            <h3>project status legend:</h3>
            <ul>
                <li className="completed"> <p>Completed version available    </p></li>
                <li className="ongoing">   <p>Ongoing, actively working on it</p></li>
                <li className="paused">    <p>Paused work on it, uncompleted </p></li>
                <li className="default">   <p>Unknown project status         </p></li>
            </ul>
        </div>
        {scraped ?
            <div className="project-content">
                <ul>
                    {cacheReader.getProjects().map(proj => {
                        return <li className={proj.personal_project ? proj.personal_project.status : "default"}>
                            <div className="project-list-item">
                                <h2>{proj.name}</h2>
                                <span className="github-projects-links"><a href={proj.html_url}><img src="github-mark.png"></img></a></span>
                                <p>{proj.description}</p>
                                <p><strong>Last updated:</strong> {new Date(proj.updated_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}

                                </p>
                            </div>


                        </li>
                    })}
                </ul>
            </div>
            : ""}
    </div>
}