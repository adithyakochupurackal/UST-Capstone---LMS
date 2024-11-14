package com.ust.finalproject.repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ust.finalproject.model.Student;
public interface StudentRepository extends JpaRepository<Student,Integer>
{
	Optional<Student> findByStudentName(String StudentName);
}