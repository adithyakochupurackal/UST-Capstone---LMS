package com.ust.finalproject.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
@Data
@Entity
public class Feedback 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int feedbackId;
	String name;
	String feedbackDescription;
}