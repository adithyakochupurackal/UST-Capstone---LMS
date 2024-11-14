package com.ust.finalproject.controller;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ust.finalproject.model.AuthRequest;
import com.ust.finalproject.model.Student;
import com.ust.finalproject.service.StudentService;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
@RestController
@RequestMapping("/api")
public class StudentController 
{
	@Autowired
	private StudentService studentService;
	@Autowired 
	private AuthenticationManager authenticationManager;
	@GetMapping("/{StudentId}")
    public ResponseEntity<Student> findById(@PathVariable int StudentId) 
	{
        Student student=studentService.findById(StudentId);
        if (student!=null) 
        {
            return ResponseEntity.ok(student);
        } 
        else 
        {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/studentName/{StudentName}")
    public ResponseEntity<Optional<Student>> findByStudentName(@PathVariable String StudentName) 
    {
        Optional<Student> student = studentService.findByStudentName(StudentName);
        return ResponseEntity.ok(student);
    }
    @PostMapping("/addStudent")
    public Student addStudent(@RequestBody Student s) 
    {
        return studentService.addStudent(s);
    }
    @PostMapping("/token")
    public String getToken(@RequestBody AuthRequest authRequest)
    {    	
    	System.out.println("token endpoint..." + authRequest.getStudentEmail());
    	Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getStudentEmail(), authRequest.getStudentPassword()));
        if (authenticate.isAuthenticated()) {
      	System.out.println(authRequest.getStudentEmail());
          return studentService.generateToken(authRequest.getStudentEmail());
       } else {
          throw new RuntimeException("invalid access");
       }
    }
    @GetMapping("/getAll")
    public ResponseEntity<List<Student>> findAll() {
        List<Student> student=studentService.findAll();
        return ResponseEntity.ok(student);
    }
}