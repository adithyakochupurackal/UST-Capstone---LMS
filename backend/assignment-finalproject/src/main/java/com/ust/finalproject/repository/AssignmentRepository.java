package com.ust.finalproject.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ust.finalproject.model.Assignment;
public interface AssignmentRepository extends JpaRepository<Assignment,Integer>
{
}