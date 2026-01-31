FROM node:18-alpine AS builder
WORKDIR /app

# Explicitly copy package.json first
COPY package.json ./
# Only copy lock file if it exists
COPY package-lock.json* ./

RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

# Copy necessary files for the standalone server
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]