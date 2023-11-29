FROM adoptopenjdk/openjdk11
#RUN mvnw clean package -DskipTests
COPY target/gestion-crisalis-0.0.1.jar gestion-crisalis.jar
ENTRYPOINT ["java","-Xms256m","-Xmx528m","-jar", "gestion-crisalis.jar","--spring.profiles.active=prod"]