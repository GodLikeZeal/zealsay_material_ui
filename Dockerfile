FROM nginx:1.15

#使用自定义配置
COPY nginx.conf /etc/nginx/nginx.conf
# 将dist文件中的内容复制到 /usr/share/nginx/html/ 这个目录下面
COPY dist/  /usr/share/nginx/html/
