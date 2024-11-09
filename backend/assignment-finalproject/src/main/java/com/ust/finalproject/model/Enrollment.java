package com.ust.finalproject.model;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "enrollment")
public class Enrollment 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int enrollmentID;
    @Column(name = "student_id")
    private int studentId;
    @Column(name = "course_id")
	private int courseId;
}