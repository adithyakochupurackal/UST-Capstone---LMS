package com.ust.finalproject.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthRequest
{
	String studentEmail;
	String studentPassword;
}