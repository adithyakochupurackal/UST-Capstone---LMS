package com.ust.finalproject.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ust.finalproject.model.Feedback;
import com.ust.finalproject.service.FeedbackService;
@RestController
@RequestMapping("/feedbackcourses")
public class FeedbackController 
{
	@Autowired
	private FeedbackService feedbackService;
	@PostMapping("/addFeedback")
	public Feedback addFeedback(@RequestBody Feedback feedback)
	{
		return feedbackService.addFeedback(feedback);
	}
}