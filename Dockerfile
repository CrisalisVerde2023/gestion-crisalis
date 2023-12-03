FROM adoptopenjdk/openjdk11
#RUN mvnw clean package -DskipTests
COPY target/gestion-crisalis-0.0.1.jar gestion-crisalis.jar
#RUN apt-get update && apt-get install openssh-client -y
#EXPOSE 8080
ENTRYPOINT ["java","-Xms256m","-Xmx528m","-jar", "gestion-crisalis.jar","--spring.profiles.active=prod"]