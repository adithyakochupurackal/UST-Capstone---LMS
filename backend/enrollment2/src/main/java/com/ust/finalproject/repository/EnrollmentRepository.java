package com.ust.finalproject.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ust.finalproject.model.Enrollment;
public interface EnrollmentRepository extends JpaRepository<Enrollment,Integer>
{
    List<Enrollment> findByStudentId(int studentId);
    List<Enrollment> findByCourseId(int courseId);
    List<Enrollment> findByEnrollmentID(int enrollmentID);
}