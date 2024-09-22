# Use a lightweight node image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose port 3001 for the backend
EXPOSE 3001

# Start the backend
CMD ["npm", "start"]
