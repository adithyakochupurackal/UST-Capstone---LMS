package com.ust.jwt.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ust.jwt.entity.Student;
import java.util.Optional;
public interface UserCredentialRepository  extends JpaRepository<Student,Integer> {
    Optional<Student> findByStudentEmail(String username);
}