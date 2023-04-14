# Usa la imagen de Node.js alpina versión 14 como base
FROM node:14-alpine

# Instala las dependencias necesarias
RUN apk add --no-cache redis

# Copia archivos de la aplicación en el contenedor
COPY . /app

# Define el directorio de trabajo
WORKDIR /app

# Instala las dependencias de Node.js
RUN npm install

# Expone el puerto de tu aplicación
EXPOSE 3000

# Inicia tu aplicación
CMD ["npm", "start"]