package com.ust.jwt.config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import com.ust.finalproject.model.Student;
import com.ust.finalproject.repository.StudentRepository;
import java.util.Optional;
@Component
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private StudentRepository repository;
    @Override
    public UserDetails loadUserByUsername(String studentName) throws UsernameNotFoundException {
        Optional<Student> credential = repository.findByStudentName(studentName);
        return credential.map(CustomUserDetails::new).orElseThrow(() -> new UsernameNotFoundException("user not found with name   :"+studentName));
    }
}