# Sử dụng Node.js image nhẹ
FROM node:18-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy package.json và các config quan trọng
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.* ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Thiết lập biến môi trường (sẽ nhận từ `--build-arg ENV_FILE`)
ARG ENV_FILE
RUN cp $ENV_FILE .env

# Build ứng dụng
RUN npm run build

# Expose cổng mong muốn
EXPOSE 3000

# Lệnh chạy ứng dụng
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
