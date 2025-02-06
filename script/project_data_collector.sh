#!/usr/bin/bash

MODE=$1 

echo "$MODE"

GITHUB_API_LINK="https://api.github.com/repos/Sahidev1/"

projects=('myVM' 'recruitmentapp' 'calculator')

DATA_PREFIX="project_data_"
FILE_EXT=".json"

RELATIVE_FILE_PATH=""


if [[ "${MODE}" == "test" ]]; then
    RELATIVE_FILE_PATH=""
fi

for project in "${projects[@]}"; do
    curl -H "Accept: application/json" -X GET "${GITHUB_API_LINK}${project}" -o "${RELATIVE_FILE_PATH}${DATA_PREFIX}${project}${FILE_EXT}"
    #echo "${GITHUB_API_LINK}${project}, " "${RELATIVE_FILE_PATH}${DATA_PREFIX}${project}${FILE_EXT}"
done

