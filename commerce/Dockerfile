FROM node:24-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev --ignore-scripts --no-audit --no-fund && npm cache clean --force
COPY --chown=node:node . .
RUN mkdir -p /app/data && chown node:node /app/data
USER node
ENV PORT=4310 COMMERCE_BIND=0.0.0.0 COMMERCE_DB=/app/data/commerce.db
EXPOSE 4310
CMD ["node","src/server.mjs"]
