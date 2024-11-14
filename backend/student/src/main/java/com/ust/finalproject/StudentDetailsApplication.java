package com.ust.finalproject;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
@EnableDiscoveryClient
@SpringBootApplication
public class StudentDetailsApplication 
{
	public static void main(String[] args) {
		SpringApplication.run(StudentDetailsApplication.class, args);
	}
}