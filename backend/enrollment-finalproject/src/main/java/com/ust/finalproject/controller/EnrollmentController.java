package com.ust.finalproject.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ust.finalproject.model.Enrollment;
import com.ust.finalproject.service.EnrollmentService;
@RestController
@RequestMapping("/enrollment")
@CrossOrigin()
public class EnrollmentController 
{
	@Autowired
    private EnrollmentService enrollmentService;
	@PostMapping("/enroll")
    public ResponseEntity<Enrollment> enrollStudent(@RequestBody Enrollment enrollment) 
	{
        Enrollment e=enrollmentService.enrollStudent(enrollment.getStudentId(), enrollment.getCourseId());
        return new ResponseEntity<>(e,HttpStatus.CREATED);
    }
    @GetMapping("/student/{studentId}")
    public List<Enrollment> getEnrollmentsByStudentId(@PathVariable int studentId) 
    {
        return enrollmentService.getEnrollmentsByStudentId(studentId);
    }
    @GetMapping("/course/{courseId}")
    public List<Enrollment> getEnrollmentsByCourseId(@PathVariable int courseId) 
    {
        return enrollmentService.getEnrollmentsByCourseId(courseId);
    }
    @GetMapping("/enrollmentID/{enrollmentID}")
    public List<Enrollment> getEnrollmentsByEnrollmentID(@PathVariable int enrollmentID) 
    {
        return enrollmentService.getEnrollmentsByEnrollmentID(enrollmentID);
    }
    @GetMapping("/enrollmentID/Check/{enrollmentID}")
    public boolean isEnrollmentIDValid(@PathVariable int enrollmentID) 
    {
        return enrollmentID>0;
    }
    @DeleteMapping("/{enrollmentId}")
    public void removeEnrollment(@PathVariable int enrollmentId) 
    {
        enrollmentService.removeEnrollment(enrollmentId);
    }
}