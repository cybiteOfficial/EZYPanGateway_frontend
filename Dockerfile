# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install --legacy-peer-deps
RUN npm i -g serve

# Copy the rest of the application code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Expose the port that the application will run on
EXPOSE 3001

# Start the React application
CMD ["serve", "-s", "build", "-p", "3001"]
