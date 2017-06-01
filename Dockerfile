FROM node:6.10

WORKDIR /app

COPY package.json .
RUN npm install

COPY client ./client
COPY middleware ./middleware
COPY models ./models
COPY node_modules ./node_modules
COPY routes ./routes
COPY services ./services
COPY tokens ./tokens
COPY index.js .

CMD [ "node", "index.js" ]
