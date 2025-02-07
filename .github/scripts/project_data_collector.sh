#!/usr/bin/bash


if [[ -z "$GITHUB_TOKEN" ]]; then
    echo "Error: GITHUB_TOKEN is not set."
    exit 1
fi

#this script checks all my available public repos and caches it
MODE=$1 

echo "$MODE"

GITHUB_API_LINK="https://api.github.com/repos/Sahidev1/"
GITHUB_USERS_API="https://api.github.com/users/Sahidev1/"
GITHUB_RAW_API="https://raw.githubusercontent.com/Sahidev1/"

projects=($(curl -s -H "Authorization: token $GITHUB_TOKEN" "${GITHUB_USERS_API}repos" | jq -r '.[].name'))

for proj in "${projects[@]}"; do
    echo "$proj"
done

PROJECT_DATA_PATH="personalproject/data.json"




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
    repo_response=$(curl -s -H "Accept: application/json" -H "Authorization: token $GITHUB_TOKEN"  -X GET "${GITHUB_API_LINK}${project}")
    
    # Check if topics include "personal-project"
    if echo "$repo_response" | jq -e '.topics | contains(["personal-project"])' > /dev/null; then
        default_branch=$(echo "$repo_response" | jq -r '.default_branch')
        
        # Get personal project data
        project_data=$(curl -s -H "Authorization: token $GITHUB_TOKEN"  "${GITHUB_RAW_API}${project}/${default_branch}/${PROJECT_DATA_PATH}")

        echo "ping: $project "
        
        # Combine repo data with personal project data
        #repo_response=$(echo "$repo_response" | jq --argjson proj "$project_data" '. + {"personal_project": $proj}')

        # Validate project_data JSON, if invalid, do not add it
        if echo "$project_data" | jq empty 2>/dev/null; then
            repo_response=$(echo "$repo_response" | jq --argjson proj "$project_data" '. + {"personal_project": $proj}')
        else
            echo "Warning: Skipping personal_project data for ${project} (invalid JSON)."
        fi

    fi
    
    # Save combined data
    echo "$repo_response" > "${RELATIVE_FILE_PATH}${DATA_PREFIX}${project}${FILE_EXT}"
    
done

echo "success"
