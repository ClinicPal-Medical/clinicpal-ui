FROM node:22.18.0-alpine3.22
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including dev deps for building)
RUN npm ci

# Copy source code  
COPY . .

# Build the app (now we have all the tools needed)
RUN npm run build

# Remove dev dependencies after build to save space
RUN npm prune --production

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]