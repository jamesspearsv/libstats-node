# Stage 1: Build the React app using Vite
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the app's files
COPY . .

# Set env variables for Vite build process
# ENV VITE_API_URL=http://localhost:3001

# Set environment variable for Vite at build time
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

RUN echo "VITE_API_URL is set to: ${VITE_API_URL}"


# Build the app for production
RUN npm run build

# Stage 2: Serve the app with Caddy
FROM caddy:alpine

# Copy the built files from the first stage to Caddy's web root
COPY --from=builder /app/dist /srv

# Expose port 80
EXPOSE 80

# Start Caddy with the default Caddyfile
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]

# Caddy runs with flags for SPA routing
# CMD ["caddy", "file-server", "--root", "/srv", "--listen", ":80", "--try-files", "{path} /index.html"]
