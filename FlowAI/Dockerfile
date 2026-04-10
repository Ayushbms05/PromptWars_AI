# Use the official, highly optimized Nginx Alpine image
FROM nginx:alpine

# Remove the default Nginx welcome page contents
RUN rm -rf /usr/share/nginx/html/*

# Copy our custom Nginx configuration setting the correct Cloud Run port mapping
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy all the FlowAI static files straight into the Nginx public directory
COPY frontend/ /usr/share/nginx/html/

# Expose port 8080 (Cloud Run targets Port 8080 by default)
EXPOSE 8080

# Start Nginx server daemonlessly
CMD ["nginx", "-g", "daemon off;"]
