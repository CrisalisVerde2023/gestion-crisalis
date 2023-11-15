<p align="center">
  <img src="https://i.ibb.co/Q8CYGVX/logo-artifact.png" width="200" alt="Crisalis Logo" />
</p>

# Integrantes del equipo green
- [Miguel Ángel Maisares](https://github.com/MigueMaisares)
- [Lucas Sarfati](https://github.com/Lucassarfati1)
- [Javier Huebra](https://github.com/javierhuebra)
- [Matias Stewart Usher](https://github.com/stewartUsherDev)
- [Facundo Oliva](https://github.com/FakuGemDa)
- [Koba Chajchir](https://github.com/kobachajchir)
- [Yamil Leotta](https://github.com/YamilLeotta)

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
    # agregar flag -d (detach) para levantar el compose separado
    docker compose up
    ```
- Para ver la db de manera visual
  > http://localhost:8040/
- Loguear con credenciales y crear el server con esta config
  <img src="https://i.ibb.co/6tQwg9H/postgres.jpg" width="400" alt="config" />

# Estrategia de branching propuesta
![estrategia de branching](https://i.ibb.co/nnbx1YF/estrategia-branching.png)

