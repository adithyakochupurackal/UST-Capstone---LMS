package com.ust.finalproject.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ust.finalproject.model.Feedback;
import com.ust.finalproject.service.FeedbackService;
@RestController
@RequestMapping("/feedback")
public class FeedbackController 
{
	@Autowired
	private FeedbackService feedbackService;
	@PostMapping("/addFeedback")
	public Feedback addFeedback(@RequestBody Feedback feedback)
	{
		return feedbackService.addFeedback(feedback);
	}
	@GetMapping("/getFeedback")
	public ResponseEntity<List<Feedback>> getFeedback()
	{
		List<Feedback> f=feedbackService.findAll();
		return ResponseEntity.ok(f);
	}
}