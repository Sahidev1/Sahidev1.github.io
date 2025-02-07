

const CACHE_DIR = "cache/"
const BACKUP_CACHE_DIR = "backup_cache/"
const CACHE_FILE_PREFIX = "project_data_"
const WANTED_CACHE_CONTENT_INDEX = "projectspage.json";


const TIMEOUT_MS = 1000;
const ABORTSIG_ERROR_CODE = "TimeoutError";

export interface GitHubProjectInterface {
    name: string;
    html_url: string;
    description: string;
    updated_at: string;
}



export default class CacheReader {
    private projectIDs: string[];
    projects: GitHubProjectInterface[];
    observers: (()=>void)[];   

    constructor() {
        this.projectIDs = [];
        this.projects = [];
        this.observers = [];
    }

    clearCache(){
        this.projects = [];
    }

    hasProjectIDs(): boolean {
        return this.projectIDs.length > 0;
    }

    getProjects(): GitHubProjectInterface[] {
        return this.projects;
    }

    async loadCacheIndexData() {
        try {
            if (this.projectIDs.length > 0) return;

            let resp = await fetch("/" + WANTED_CACHE_CONTENT_INDEX);
            let json: Promise<any> = await resp.json();
            let projs: string[] = (await json as any)['projects'] as string[];
            this.projectIDs = projs.map(proj => {
                return CACHE_FILE_PREFIX + proj;
            });
            console.log("success loading cache index data")
        }
        catch (error) {
            console.error(error);
        }

    }

    addObserver(observer:()=>void){
        this.observers.push(observer);
    }


    callObservers(){
        this.observers.forEach(observer => observer());
    }



    async fetchAll() {
        try {
            await Promise.all(
                this.projectIDs.map(async id =>{
                    try {
                        let proj:GitHubProjectInterface = await this.fetchCacheData(id);
                        this.projects.push(proj);
                    } catch (error) {
                        try {
                            console.log("trying backup cache")
                            let proj:GitHubProjectInterface = await this.fetchBackupCache(id);
                            this.projects.push(proj);
                            console.log("backup cache success")
                        } catch (error) {
                            console.log("backup-chache err")
                            console.error(error);
                        }
                    }
                })
            );
            this.callObservers();
        } catch (error) {
            console.error(error);
        }
    }

    async fetchCacheData(pname: string):Promise<GitHubProjectInterface> {
        try {
            console.log("fetch cache data started")
            const res: Response = await fetch(CACHE_DIR + pname + ".json", {
                signal: AbortSignal.timeout(TIMEOUT_MS)
            });
            const jsonPayload: Promise<any> = await res.json();
            const proj: GitHubProjectInterface = (await jsonPayload) as GitHubProjectInterface;
            console.log("success fetch cache data")
            return proj;
        } catch (error: any) {
            throw error;
        }
    }

    async fetchBackupCache(pname: string): Promise<GitHubProjectInterface> {
        try {
            console.log(BACKUP_CACHE_DIR + pname)
            const res: Response = await fetch(BACKUP_CACHE_DIR + pname + ".json");
            const jsonPayload: Promise<any> = await res.json();
            const proj: GitHubProjectInterface = (await jsonPayload) as GitHubProjectInterface;
            return proj;
        } catch (error) {
            throw error;
        }
    }


}

