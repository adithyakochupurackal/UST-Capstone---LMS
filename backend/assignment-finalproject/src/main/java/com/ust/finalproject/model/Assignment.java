package com.ust.finalproject.model;
import java.util.Date;

import jakarta.persistence.Column;
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
@Table(name="assignment")
public class Assignment 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int assignmentID;
    private String assignmentName;
    @Column(name="enrollment_id")
	private int enrollmentID;
    private byte[] assignmentFile;
    private Date deadline;
}