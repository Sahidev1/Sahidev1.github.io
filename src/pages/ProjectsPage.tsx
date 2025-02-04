import React, { useEffect, useState } from "react";
import ProjectScraper from "../APIs/ProjectScraper";
import { GitHubProjectInterface } from "../APIs/ProjectScraper";
import { GitHubLogo } from "../components/Logos";

const scraper:ProjectScraper = new ProjectScraper();

export default function ProjectsPage(){
    const [scraped, setScraped] = useState(false);

    useEffect(()=>{
        const loadAndFetch = async ()=>{
            try {
                await scraper.loadData();
                if (scraper.hasProjectIDs()){
                    await scraper.fetchAll();
                } else {
                    throw Error("no project id's loaded");
                }
            } catch (error) {
                return error;
            }
        }

        loadAndFetch().then(r => setScraped(true)).catch(err => console.error(err));
    },[])

    return <div className="projects-page">
        <h1>Projects Page</h1>
        {scraped?
        <ul>
            {scraper.getProjects().map(proj => {
                return <li>
                    <h2>{proj.name}</h2>
                    <p>{proj.description}</p>
                    <p><strong>Last updated:</strong> {new Date(proj.updated_at).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}, <a href={proj.html_url}> <GitHubLogo/> </a></p>
                    
                    
                    
                </li>
            })}
        </ul>
        :""}
    </div>
}