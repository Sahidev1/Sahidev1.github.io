#!/usr/bin/bash


#this script checks all my available public repos and caches it
MODE=$1 

echo "$MODE"

GITHUB_API_LINK="https://api.github.com/repos/Sahidev1/"
GITHUB_USERS_API="https://api.github.com/users/Sahidev1/"
GITHUB_RAW_API="https://raw.githubusercontent.com/Sahidev1/"

projects=($(curl -s "${GITHUB_USERS_API}repos" | jq -r '.[].name'))

PROJECT_DATA_PATH=".personalproject/data.json"




DATA_PREFIX="project_data_"
PROJECT_DATA_INFIX="detailed_"
FILE_EXT=".json"


if [[ "${MODE}" == "test" ]]; then
    RELATIVE_FILE_PATH=""
elif [[ "${MODE}" == "dev" ]]; then
    RELATIVE_FILE_PATH="../../public/backup_cache/"
else
    RELATIVE_FILE_PATH="../cache/"
    mkdir "../cache" 
fi 


for project in "${projects[@]}"; do
    # Get repo data
    repo_response=$(curl -s -H "Accept: application/json" -X GET "${GITHUB_API_LINK}${project}")
    
    # Check if topics include "personal-project"
    if echo "$repo_response" | jq -e '.topics | contains(["personal-project"])' > /dev/null; then
        default_branch=$(echo "$repo_response" | jq -r '.default_branch')
        
        # Get personal project data
        project_data=$(curl -s "${GITHUB_RAW_API}${project}/${default_branch}/${PROJECT_DATA_PATH}")
        
        # Combine repo data with personal project data
        repo_response=$(echo "$repo_response" | jq --argjson proj "$project_data" '. + {"personal-project": $proj}')
    fi
    
    # Save combined data
    echo "$repo_response" > "${RELATIVE_FILE_PATH}${DATA_PREFIX}${project}${FILE_EXT}"
done
