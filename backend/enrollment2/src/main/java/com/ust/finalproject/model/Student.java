package com.ust.finalproject.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int studentId;
	String studentName;
	String studentEmail;
	String studentPassword;
}