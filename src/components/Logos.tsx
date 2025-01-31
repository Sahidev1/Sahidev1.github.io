import React from "react"

const GITHUB_LINK="https://github.com/Sahidev1"
const LINKEDIN_LINK="https://www.linkedin.com/in/ali-sahibi-8221b6261/"

export function GitHubLogo() {

    return (

        <div className="github-logo">
            <a href={GITHUB_LINK}>
                <img src="github-mark.png" alt="GitHub Logo" />
            </a>
        </div>
    )
}

export function LinkedInLogo() {

    return (
        <div className="linkedin-logo" >
            <a href={LINKEDIN_LINK}>
                <img src="linkedin.png" alt="LinkedIn Logo" />
            </a>
        </div>
    )
}