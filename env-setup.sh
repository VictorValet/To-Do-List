#!/bin/bash

YELLOW='\033[0;33m'
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

printf "${YELLOW}
####################################################################
This script is intended for testing purposes and setup verification.
It adds missing .env file values.
####################################################################
${NC}"

export LC_CTYPE=C
export LANG=C

generate_random_string() {
    tr -dc 'A-Za-z' < /dev/urandom | head -c "$1"
}

generate_random_value() {
    tr -dc 'A-Za-z0-9_' < /dev/urandom | head -c "$1"
}

ENV_FILE=".env"

# Function to get the value of a key from the .env file or generate a new one
get_or_generate_value() {
    local key=$1
    local length=$2
    local current_value=""

    # Check if the .env file exists and contains the key
    if [ -f "$ENV_FILE" ]; then
        current_value=$(grep -E "^${key}=" "$ENV_FILE" | cut -d '=' -f2-)
    fi

    if [ -z "$current_value" ]; then
        if [ "$length" -eq 10 ]; then
            echo "$key=$(generate_random_string 10)"
        else
            echo "$key=$(generate_random_value 64)"
        fi
    else
        echo "$key=$current_value"
    fi
}

# Arrays of keys
env_keys_10=("DB_NAME" "DB_USER") # Example keys
env_keys_64=("DB_PASSWORD") # Example keys

# Array to store environment variables
env_vars=()

# Process keys with length 10
for key in "${env_keys_10[@]}"; do
    env_vars+=("$(get_or_generate_value "$key" 10)")
done

# Process keys with length 64
for key in "${env_keys_64[@]}"; do
    env_vars+=("$(get_or_generate_value "$key" 64)")
done

# Create/Update .env file
echo -e -n "${GREEN}Creating/Updating .env file..."
{
    for var in "${env_vars[@]}"; do
        echo "$var"
    done | sort
} > "$ENV_FILE"

echo -e "done\n"
