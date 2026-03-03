<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Blog Tree
A blog to test SEO improvement done by AI

## 🐳 Requisitos

- Docker
- Docker Compose

## 🚀 How to run

1. **Configure environment variables**  

## Frontend
```bash
cd frontend
mv .env.local.example .env.local
```
# Backend
```bash
cd ../backend
mv .env.example .env
```
## Upload containers
```bash
cd ..
docker compose up --build
```

## remove all containers
```bash
docker stop $(docker ps -aq) && docker rm -f $(docker ps -aq) && docker rmi -f $(docker images -q) && docker volume rm $(docker volume ls -q) && docker network rm $(docker network ls -q)
```

## Access

Backend: http://localhost:8000/docs
Frontend: http://localhost:3000

## 🚀 Part developed by Neto
Credits to the frontend initially built by: https://github.com/williamcruvinel/dev-news