package com.ust.finalproject.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.ust.finalproject.model.Assignment;
import com.ust.finalproject.repository.AssignmentRepository;
@Service
public class AssignmentService 
{
	@Autowired
    private AssignmentRepository assignmentRepository;
    @Autowired
    private RestTemplate restTemplate; 
    public void saveAssignment(Assignment assignment) 
    {
        assignmentRepository.save(assignment);
    }
}