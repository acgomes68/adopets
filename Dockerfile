#Dockerfile
# PRD CONFIG

# Define source image
FROM node:alpine AS prd

# Information about building
LABEL maintainer = "Antonio Carlos Gomes <acgomes68@gmail.com>"
LABEL description = "Alpine Linux with Node.js and project dependencies"

# 1.Update current system packages
# 2.Update repositories and install required system packages
# 3.Clean cache after in order to keep small image
RUN apk update && \
    apk upgrade && \
    rm -rf /var/cache/apk/*

# Defines work directory
WORKDIR /usr/app

# Copy dependencies and package list
COPY package*.json ./

# Install and update standard packages
RUN npm install

# Copy from project files to container
COPY . .

# Expose container port 3000
EXPOSE 3000

ENV NODE_ENV=production

# Run npm start command (scripts>start in package.json)
CMD ["npm", "start"]

# DEV CONFIG
FROM prd as dev

EXPOSE 5000 3000

ENV NODE_ENV=development

# RUN npm install -g nodemon

# RUN npm install --only=dev

CMD [ "npm", "dev" ]
