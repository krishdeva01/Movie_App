FROM jkilbride/nginx-alpine

RUN apk add --update --no-cache \
    bash \
    curl

# Copy custom configuration file from the current directory
RUN rm -v /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
