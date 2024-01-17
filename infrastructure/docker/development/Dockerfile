FROM node:20.5.1-alpine@sha256:f62abc08fe1004555c4f28b6793af8345a76230b21d2d249976f329079e2fef2

# ENV NODE_ENV "development"
# ENV PORT 3000

WORKDIR /app
COPY . .
RUN npm ci --silent && npm run build

CMD ["npm", "run", "start:dev"]