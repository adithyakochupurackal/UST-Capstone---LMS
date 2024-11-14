package com.ust.finalproject.controller;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
public class EnrollmentController 
{
	@Autowired
    private EnrollmentService enrollmentService;
	@PostMapping("/enroll")
    public ResponseEntity<Enrollment> enrollStudent(@RequestBody Enrollment enrollment) 
	{
		System.out.println(enrollment);
        Enrollment e=enrollmentService.enrollStudent(enrollment);
        return new ResponseEntity<>(e,HttpStatus.CREATED);
        //return ResponseEntity.ok(e);
    }

//	@PostMapping("/enroll")
//	public ResponseEntity<Map<Object, Object>> enrollStudent(@RequestBody Enrollment enrollment) {
//	    // Enroll the student by calling the service method
//	    Enrollment e = enrollmentService.enrollStudent(enrollment.getStudentId(), enrollment.getCourseId());
//	    // Create a Map to return additional information
//	    Map<Object, Object> response = new HashMap<>();
//	    response.put("status", "success");
//	    response.put("enrollment", e);
//	    // Return the response with HTTP Status CREATED (201)
//	    return new ResponseEntity<>(response, HttpStatus.CREATED);
//	}
	
//	@PostMapping("/enroll")
//    public ResponseEntity<Map<Object, Object>> enrollStudent(@RequestBody Enrollment enrollment) {
//        try {
//            // Ensure that enrollmentService is properly called and returns a valid response
//            Enrollment e = enrollmentService.enrollStudent(enrollment.getStudentId(), enrollment.getCourseId());
//            
//            // Check for null or invalid responses from the service method
//            if (e == null) {
//                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("error", "Enrollment failed"));
//            }
//
//            // Prepare the response
//            Map<Object, Object> response = new HashMap<>();
//            response.put("status", "success");
//            response.put("enrollment", e);
//
//            return new ResponseEntity<>(response, HttpStatus.CREATED);
//        } catch (Exception ex) {
//            // Handle exceptions that might occur during the enrollment process
//            Map<Object, Object> errorResponse = new HashMap<>();
//            errorResponse.put("status", "error");
//            errorResponse.put("message", ex.getMessage());
//            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

	
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