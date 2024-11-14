package com.ust.finalproject.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ust.finalproject.model.Courses;
import com.ust.finalproject.repository.FeedbackRepository;

@Service
public class CourseService 
{
	@Autowired
	private FeedbackRepository repo;
	public Courses addCourse(Courses courses)
	{
		return repo.save(courses);
	}
	public List<Courses> findByName(String name)
	{
		return repo.findByName(name);
	}
	public List<Courses> findAll() 
	{
        return repo.findAll();
    }
	public Courses findById(int courseId) 
	{
        return repo.findById(courseId).orElse(null);
    }
	public List<Courses> getCoursesByCategory(String category) 
	{
        return repo.findByCategory(category);
    }
    public List<Courses> getCoursesByRating(double rating) 
    {
        return repo.findByRatingGreaterThanEqual(rating);
    }
}