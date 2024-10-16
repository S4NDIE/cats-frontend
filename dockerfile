#stage 1
FROM node:18.20.4 as node
WORKDIR /app
COPY . .
RUN ls -la
RUN npm install
RUN npm run build --prod

#stage 2
FROM nginx:alpine as nginx
COPY --from=node /app/dist/cats-frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080