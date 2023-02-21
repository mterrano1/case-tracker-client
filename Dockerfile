# Use the official Node.js 16 LTS image as the base image
FROM node:16-alpine as build
# Set the working directory to /app
WORKDIR '/app'
# Copy the package.json and package-lock.json files to the working directory
COPY package.json .
COPY package-lock.json .
# Install the dependencies defined in package.json
RUN npm install
# Copy the entire application directory to the working directory
COPY . .
# Build the application
RUN npm run build


# Use the official Nginx image as the base image for serving the built application
FROM nginx:alpine
# Exposes port 4000
EXPOSE 4000
# Copy the Nginx configuration file to the container
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy the built application to the Nginx document root directory
COPY --from=build /app/build /usr/share/nginx/html