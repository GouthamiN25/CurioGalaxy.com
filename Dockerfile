# Use a small Nginx image to serve static files
FROM nginx:1.25-alpine

# Copy everything in the repo into Nginx's web root
COPY . /usr/share/nginx/html

# Cloud Run expects the app to listen on PORT
# Nginx listens on 80 inside the container, Cloud Run will map PORT->80 automatically
EXPOSE 80
