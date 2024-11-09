package com.ust.finalproject.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ust.finalproject.model.Feedback;
import com.ust.finalproject.repository.FeedbackRepository;
@Service
public class FeedbackService 
{
	@Autowired
	private FeedbackRepository repo;
	public Feedback addFeedback(Feedback feedback)
	{
		return repo.save(feedback);
	}
	public List<Feedback> findAll() 
	{
		return repo.findAll();
	}
}