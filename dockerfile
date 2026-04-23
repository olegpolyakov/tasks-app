# syntax=docker/dockerfile:1.7
FROM node:25-alpine AS build
WORKDIR /tasks
COPY package*.json ./
COPY api/package*.json ./api/
COPY app/package*.json ./app/
COPY core/package*.json ./core/
COPY db/package*.json ./db/
COPY core/src ./core/src
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm install
RUN npm link
RUN npm link @olegpolyakov/tasks --workspace=api
COPY . .
RUN npm run build --workspace=app

FROM nginx:1.27-alpine
COPY app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /tasks/app/dist /usr/share/nginx/html
EXPOSE 80