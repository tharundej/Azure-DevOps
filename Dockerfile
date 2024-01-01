# Use the official Node.js Alpine image for ARM64
FROM --platform=linux/arm64/v8 node:12.12.0-alpine

# Set the working directory in the container
WORKDIR /app

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and package-lock.json to the container
COPY package.json .
COPY package-lock.json .

# Copy the rest of the application code to the container
COPY . .

# Install app dependencies using pnpm
RUN pnpm install

# Set the timezone
ENV TZ Asia/India

# Add the application code to the container
COPY . .

# Start the application
CMD ["pnpm", "run", "start:dev"]