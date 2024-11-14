package com.ust.jwt.filter;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import java.util.*;
import java.util.function.Predicate;
@Component
public class RouteValidator {
    public static final List<String> openApiEndpoints = List.of(
            "/api/addStudent",
            "/api/token",
            "/course/getAll",
            "/enrollment/enroll",
            "/enrollment/student/1",
            "/feedback/addFeedback",
            "/assignment/submit",
            "/feedbackcourses/addFeedback",
            "/eureka"
    );
    public Predicate<ServerHttpRequest> isSecured =
            request -> openApiEndpoints
                    .stream()
                    .noneMatch(uri -> request.getURI().getPath().contains(uri));
}