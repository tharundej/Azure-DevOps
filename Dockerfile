FROM --platform=linux/arm64/v8 node:16.14.0-alpine

# Set the working directory in the container
WORKDIR /app

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Set the timezone
ENV TZ Asia/India

# Initialize a new Node.js project
RUN npm init --yes

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and package-lock.json to the container
COPY package.json .
COPY package-lock.json .

# Install app dependencies using pnpm, and force recreation of lockfile
RUN pnpm install --force

# Copy the rest of the application code to the container
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["pnpm", "run", "start:dev"]
