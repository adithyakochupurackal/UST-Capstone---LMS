package com.ust.finalproject.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
@Data
@Entity
@Table(name="courseFeedback")
public class Feedback 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int feedbackId;
	String courseFeedback;
	@Column(name="course_id")
	int courseId;
	@Column(name="course_name")
	String courseName;
	int courseRating;
}