FROM maven:3.9.8-eclipse-temurin-21 AS build

WORKDIR /app

COPY /server/pom.xml .
COPY /server/src ./src
COPY /server/docker-entrypoint.sh ./docker-entrypoint.sh

RUN mvn clean install -DskipTests

FROM eclipse-temurin:21-jre-alpine

ARG JAR_FILE=target/*.jar

COPY --from=build /app/${JAR_FILE} app.jar
COPY --from=build /app/docker-entrypoint.sh /docker-entrypoint.sh

RUN mkdir -p /app/images

RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["java","-jar","/app.jar"]