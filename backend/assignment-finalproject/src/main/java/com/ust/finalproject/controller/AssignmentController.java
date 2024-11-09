package com.ust.finalproject.controller;
import java.io.IOException;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ust.finalproject.model.Assignment;
import com.ust.finalproject.service.AssignmentService;
@RestController
@RequestMapping("/assignment")
public class AssignmentController 
{
	@Autowired
    private AssignmentService assignmentService; 
	 @PostMapping("/submit")
	    public ResponseEntity<String> submitAssignment(
	    		@RequestParam("file") MultipartFile file,
	    		@RequestParam("assignmentName") String assignmentName,
	            @RequestParam("enrollmentID") int enrollmentID,
	            @RequestParam("deadline") Date deadline) 
	 {
	        try {
	            byte[] fileBytes = file.getBytes();
	            Assignment assignment = new Assignment();
	            assignment.setAssignmentName(assignmentName);
	            assignment.setEnrollmentID(enrollmentID);
	            assignment.setAssignmentFile(fileBytes);
	            assignment.setDeadline(deadline);
	            assignmentService.saveAssignment(assignment);

	            return new ResponseEntity<>("Assignment submitted successfully!", HttpStatus.OK);
	        } catch (IOException e) {
	            return new ResponseEntity<>("Error uploading file: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }
}