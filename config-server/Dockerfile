FROM openjdk:14
RUN mkdir -p /project
ENV LOG_PATH /project/
RUN ln -sf /dev/stdout /project/config-stdout.log
RUN ln -sf /dev/stderr /project/config-stderr.log
COPY ./build/libs/config-server-0.0.1-SNAPSHOT.jar /project
WORKDIR /project/
EXPOSE 8085
CMD ["java", "-jar", "/project/config-server-0.0.1-SNAPSHOT.jar"]