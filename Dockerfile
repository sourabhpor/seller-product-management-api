FROM node:20

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy complete project
COPY . .

# Expose port
EXPOSE 5000

# Start application
CMD ["npm", "start"]
