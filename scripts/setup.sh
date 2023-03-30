#!/bin/bash
# Clone the repository and install dependencies
git clone https://github.com/LianTianNo1/chat_serve.git
cd chat_serve
npm install

# Prompt user for environment variables
# read -p "Enter OPENAI_API_KEY: " OPENAI_API_KEY
# read -p "Enter CODE: " CODE
# read -p "Enter PORT: " PORT

# Build and run the project using the environment variables
# OPENAI_API_KEY=$OPENAI_API_KEY
# CODE=$CODE
# PORT=$PORT
# yarn build && 
# OPENAI_API_KEY=$OPENAI_API_KEY
# CODE=$CODE 
# PORT=$PORT 
npm run start
