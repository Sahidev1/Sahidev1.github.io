import React from "react"
import { EmailLogo, GitHubLogo, LinkedInLogo} from "./Logos"

export default function LinksBar (){


    return (
        <div className="links-bar">
            <GitHubLogo/>
            <LinkedInLogo/>
            <EmailLogo/>
        </div>
    )
}