package com.ust.jwt.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
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
    public String generateToken(String t) {
        return jwtService.generateToken(t);
    }
    public void validateToken(String token) {
        jwtService.validateToken(token);
    }
}