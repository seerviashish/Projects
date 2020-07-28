package com.projects.spring.configserver;

import java.util.Map;

public class ErrorJson {

    public int error;
    public String message;
    public String timeStamp;
    public String trace;

    public ErrorJson(int error, Map<String, Object> errorAttributes) {
        this.error = error;
        this.message = errorAttributes.getOrDefault("error", "").toString();
        System.out.println(this.message);
        this.timeStamp = errorAttributes.getOrDefault("message", "").toString();
        System.out.println(this.timeStamp);
        this.trace = errorAttributes.getOrDefault("trace", "").toString();
        System.out.println(this.trace);

    }
}
