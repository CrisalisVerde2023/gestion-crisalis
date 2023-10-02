<p align="center">
  <img src="https://i.ibb.co/Q8CYGVX/logo-artifact.png" width="200" alt="Crisalis Logo" />
</p>

# Instalaciones necesarias
- JDK 11
- WSL 2
- Docker Desktop
- Postman
- Git
- Node LTS

# Configuración del entorno develop
- Elegir una carpeta para el proyecto y ejecutar
  ```console
  git clone https://github.com/CrisalisVerde2023/gestion-crisalis.git
  ```
- En IntelliJ presionar Ctrl+Shift+Alt+S y seleccionar el JDK 11
- Abrir terminal en la raiz del proyecto
- Construir el compose con Postgres 16 y pgAdmin 7
    ```console
    docker compose up
    ```
- Para ver la db de manera visual
  > http://localhost:8040/
- Loguear con credenciales y crear el server con esta config
  <img src="https://i.ibb.co/6tQwg9H/postgres.jpg" width="400" alt="config" />

# Estrategia de branching
TODO