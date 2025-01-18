# Step 1: Build the application
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app code
COPY . .

# Build the app
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine

# Copy the build files from the build stage to Nginx's default folder
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom nginx.conf file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 84 to allow access to the server
EXPOSE 84

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
