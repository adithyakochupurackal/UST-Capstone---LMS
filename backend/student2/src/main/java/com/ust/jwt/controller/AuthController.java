package com.ust.jwt.controller;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.ust.jwt.dto.AuthRequest;
import com.ust.jwt.dto.UserResponse;
import com.ust.jwt.entity.Student;
import com.ust.jwt.service.AuthService;
@RestController
@RequestMapping("/api")
public class AuthController {
    @Autowired
    private AuthService service;
    @Autowired
    private AuthenticationManager authenticationManager;
//    @PostMapping("/addStudent")
//    public String addNewUser(@RequestBody UserCredential user) {
//    	System.out.println("register endpoint...");
//        return service.saveUser(user);
//    }
    @PostMapping("/addStudent")
    public ResponseEntity<Student> addNewUser(@RequestBody Student user) {
    	System.out.println("register endpoint...");
        return ResponseEntity.ok(service.saveUser(user));
    }
//    @PostMapping("/token")
//    public String getToken(@RequestBody AuthRequest authRequest) {
//    	System.out.println("token endpoint..." + authRequest.getStudentEmail());
//        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getStudentEmail(), authRequest.getStudentPassword()));
//        if (authenticate.isAuthenticated()) {
//        	System.out.println(authRequest.getStudentEmail());
//            return service.generateToken(authRequest.getStudentEmail());
//        } else {
//            throw new RuntimeException("invalid access");
//        }
//    }
    
    
//    @PostMapping("/token")
//    public String getToken(@RequestBody AuthRequest authRequest) {
//    	System.out.println("token endpoint..." + authRequest.getStudentEmail());
//    	System.out.println(authRequest);
//        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getStudentEmail(), authRequest.getStudentPassword()));
//        if (authenticate.isAuthenticated()) {
//        	System.out.println(authRequest.getStudentEmail());
//            return service.generateToken(authRequest.getStudentEmail());
//        } else {
//            System.out.println("invalid access");
//            throw new RuntimeException("invalid access");
//        }
//    }
    
    
    @PostMapping("/token")
    public ResponseEntity<UserResponse> getToken(@RequestBody AuthRequest authRequest) {
        System.out.println("token endpoint..." + authRequest.getStudentEmail());
        System.out.println(authRequest);
        Authentication authenticate=authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(authRequest.getStudentEmail(),authRequest.getStudentPassword())
        );
        Map<String, String> response=new HashMap<>();
        if (authenticate.isAuthenticated()) 
        {
            System.out.println(authRequest.getStudentEmail());
            UserResponse user = service.generateToken(authRequest.getStudentEmail());
            return new ResponseEntity<>(user,HttpStatus.OK);
        } 
        else
        {
            System.out.println("invalid access");
            response.put("error","invalid access");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    @GetMapping("/validate")
    public String validateToken(@RequestParam("token") String token) {
        service.validateToken(token);
        return "Token is valid";
    }
}