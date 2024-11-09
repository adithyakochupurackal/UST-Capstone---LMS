package com.ust.finalproject.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.ust.finalproject.model.Courses;
import com.ust.finalproject.model.Enrollment;
import com.ust.finalproject.model.Student;
import com.ust.finalproject.repository.EnrollmentRepository;
@Service
public class EnrollmentService 
{
    @Autowired
    private EnrollmentRepository enrollmentRepository;
    @Autowired
    private RestTemplate restTemplate;
    private static final String STUDENT_SERVICE_URL = "http://localhost:8001/api/";
    private static final String COURSE_SERVICE_URL = "http://localhost:8000/api/";
    public Enrollment enrollStudent(int studentId,int courseId) 
    {
        Student student=restTemplate.getForObject(STUDENT_SERVICE_URL+studentId, Student.class);
        Courses course = restTemplate.getForObject(COURSE_SERVICE_URL+courseId, Courses.class);
        if (student==null||course==null) 
        {
            throw new RuntimeException("Student or Course not found");
        }
        Enrollment enrollment=new Enrollment();
        enrollment.setStudentId(studentId);
        enrollment.setCourseId(courseId);
        return enrollmentRepository.save(enrollment);
    }
    public List<Enrollment> getEnrollmentsByStudentId(int studentId) 
    {
        return enrollmentRepository.findByStudentId(studentId); 
    }
    public List<Enrollment> getEnrollmentsByCourseId(int courseId) 
    {
        return enrollmentRepository.findByCourseId(courseId); 
    }
    public List<Enrollment> getEnrollmentsByEnrollmentID(int enrollmentID) 
    {
        return enrollmentRepository.findByEnrollmentID(enrollmentID); 
    }
    public void removeEnrollment(int enrollmentId)
    {
        enrollmentRepository.deleteById(enrollmentId);
    }
}