package com.ust.jwt.config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import com.ust.jwt.entity.Student;
import com.ust.jwt.repository.UserCredentialRepository;
import java.util.Optional;
@Component
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserCredentialRepository repository;
    @Override
    public UserDetails loadUserByUsername(String studentEmail) throws UsernameNotFoundException {
        Optional<Student> credential = repository.findByStudentEmail(studentEmail);
        return credential.map(CustomUserDetails::new).orElseThrow(() -> new UsernameNotFoundException("user not found with name   :"+studentEmail));
    }
}