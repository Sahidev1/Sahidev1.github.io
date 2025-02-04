

const GIT_API_URL = (INJECTED as any)["env"]["GITAPI_URL"];

const JSON_FILE = "projectspage.json";

console.log(GIT_API_URL)

export interface GitHubProjectInterface {
    name: string;
    html_url:string;
    description: string;
    updated_at: string;
}



export default class ProjectScraper {
    private projectIDs: string[];
    projects: GitHubProjectInterface[];

    constructor() {
        this.projectIDs = [];
        this.projects = [];
    }

    hasProjectIDs(): boolean {
        return this.projectIDs.length > 0;
    }

    getProjects():GitHubProjectInterface[]{
        return this.projects;
    }

    async loadData() {
        try {
            let resp = await fetch("/" + JSON_FILE);
            let json: Promise<any> = await resp.json();
            this.projectIDs = (await json as any)['projects'] as string[];
        }
        catch (error) {
            console.error(error);
        }

    }



    async fetchAll(){
        try {
            await Promise.all(
                this.projectIDs.map(async id => await this.fetchData(id))
            );
        } catch (error) {
            console.error(error);
        }
    }

    async fetchData(pname:string){
        try {
            const res:Response = await fetch(GIT_API_URL + pname);
            const jsonPayload: Promise<any> = await res.json();
            const proj: GitHubProjectInterface = (await jsonPayload) as GitHubProjectInterface;
            this.projects.push(proj);
        } catch (error) {
            console.error(error);
        }
    }
}

