FROM node:20.13.1-alpine@sha256:a7b980c958bfe4d84ee9263badd95a40c8bb50ad5afdb87902c187fefaef0e24

# ENV NODE_ENV "development"
# ENV PORT 3000

WORKDIR /app
COPY . .
RUN npm ci --silent && npm run build

CMD ["npm", "run", "start:dev"]