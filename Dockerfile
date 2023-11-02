# Fetching the latest node image on apline linux
FROM node:alpine AS builder

# Declaring env
# ENV NODE_ENV production

# Setting up the work directory
WORKDIR /app

# Installing pnpm
RUN npm install -g pnpm

# Installing dependencies
COPY ./package.json ./
RUN pnpm install

# Copying all the files in our project
COPY . .

# Building our application
RUN pnpm run build

# Fetching the latest nginx image
FROM nginx

# Copying built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copying our nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080