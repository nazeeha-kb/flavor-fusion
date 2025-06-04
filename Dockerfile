# Use an official Node.js base image
FROM node:18

# Set working directory in container
WORKDIR /usr/src/app

# Copy package.json and lock file first (better caching)
COPY package*.json ./

# Install dependencies with cache optimization (fixed command)
RUN --mount=type=cache,target=/root/.npm,id=npm_cache \
    npm install

# Copy the rest of application code
COPY . .

# Build application (if you have a build step)
RUN npm run build

# Expose port (adjust as needed)
EXPOSE 3000

# Command to run application
CMD ["npm", "start"]