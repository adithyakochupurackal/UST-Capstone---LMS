package com.ust.jwt.service;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ust.jwt.dto.UserResponse;
import com.ust.jwt.entity.Student;
import com.ust.jwt.repository.UserCredentialRepository;
@Service
public class AuthService {
    @Autowired
    private UserCredentialRepository repository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;
    public Student saveUser(Student credential) {
        credential.setStudentPassword(passwordEncoder.encode(credential.getStudentPassword()));
        return repository.save(credential);
        
    }
    public UserResponse generateToken(String t) {
    	Optional<Student> student = repository.findByStudentEmail(t);
    	
    	if (student.isPresent()) {
    		UserResponse user = new UserResponse();
        	String token = jwtService.generateToken(t);
        	user.setStudentId(student.get().getStudentId());
        	user.setToken(token);
    		return user;
    	}
    	return null;
    }
    public void validateToken(String token) {
        jwtService.validateToken(token);
    }
}