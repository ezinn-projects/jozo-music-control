# Sử dụng Node.js image nhẹ
FROM node:18-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy các file cần thiết để cài đặt dependencies
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.* ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng
RUN npm run build

# Expose cổng mà ứng dụng sẽ chạy
EXPOSE 3000

# Lệnh chạy ứng dụng
CMD ["npm", "run", "preview"]
