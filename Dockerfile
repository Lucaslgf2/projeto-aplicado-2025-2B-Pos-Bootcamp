# Use a Node.js base image that matches the specified engine version
FROM node:22

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Expose the port your application will run on (adjust if necessary)
EXPOSE 9001

# Run the application in production mode
CMD ["npm", "run", "start"]
