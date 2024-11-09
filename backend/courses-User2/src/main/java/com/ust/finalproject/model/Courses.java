package com.ust.finalproject.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="courses")
public class Courses 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int courseId;
	String name;
	String description;
	String category;
	double rating;
	boolean isEnrolled =false;
}