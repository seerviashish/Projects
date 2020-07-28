package com.projects.spring.configserver;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ServiceConfig {
    @Value("${configServer.debug}")
    private Boolean debug;

    public Boolean getDebug() {
        return debug;
    }
}
