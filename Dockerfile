# ---- Base Node image ----
FROM node:20-alpine3.16 as base
WORKDIR /app

# ---- Dependencies ----
FROM base AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install \
 && npm cache clean --force

# ---- Copy Files/Build ----
FROM dependencies as build
WORKDIR /app
COPY * ./

# ---- Build Frontend bundle static files ----
RUN npm run build

# ---- Release with Alpine ----
FROM node:20-alpine3.16 as release
WORKDIR /app
COPY --from=dependencies /app/package.json ./

# ---- Install all dependencies ----
RUN npm install --only=production
COPY --from=build /app/dist ./dist
ENV PORT=4000
EXPOSE 4000
CMD [ "node", './dist/main.js' ]
