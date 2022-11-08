FROM node

COPY avance_matriculacion_JM /app

WORKDIR /app

RUN npm install

ENTRYPOINT ["npm", "start"]