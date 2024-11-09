package com.ust.finalproject.configuration;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
public class CorsConfiguration implements WebMvcConfigurer 
{ 	
	@Override
    public void addCorsMappings(CorsRegistry registry) 
	{
    registry.addMapping("/**") // Allow CORS for all endpoints
            .allowedOrigins("http://localhost:4200") // Allow requests from your Angular app
            .allowedMethods("GET", "POST", "PUT", "DELETE") // Allow these HTTP methods
            .allowedHeaders("*") // Allow all headers
            .allowCredentials(true); // Allow credentials (cookies, auth tokens, etc.)
	}
	}