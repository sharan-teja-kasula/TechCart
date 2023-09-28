# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Bundle your app's source code inside the Docker image
COPY . .

# Install app dependencies
RUN npm install

# Expose the port that the app will run on
EXPOSE 4500

# Define the command to run your application
CMD [ "npm", "start" ]
