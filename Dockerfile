# Stage 1: Build and Test
FROM node:latest AS builder

WORKDIR /app

# Copy package files and install all dependencies (including dev)
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Run tests (fail the build if tests fail)
RUN npm test

# Remove devDependencies to prepare for production
RUN npm prune --production

# Stage 2: Production Image
FROM node:latest

WORKDIR /app

# Copy only production node_modules and app files from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app .

EXPOSE 4200

ENV NODE_ENV=production

CMD ["node", "app.js"]
