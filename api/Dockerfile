# Use a more compatible Debian-based Node image for better native module support
FROM node:18-slim

# Set the working directory
WORKDIR /app

# Install necessary build tools (for compiling native modules like better-sqlite3)
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Install dependencies inside the container
COPY package.json package-lock.json* ./
RUN npm install --omit=dev

# Copy the rest of the app's source code
COPY . .

# Expose port 3001 for the backend
EXPOSE 3001

# Run migrations before starting the backend server
CMD ["sh", "-c", "npx knex migrate:latest && npm start"]
