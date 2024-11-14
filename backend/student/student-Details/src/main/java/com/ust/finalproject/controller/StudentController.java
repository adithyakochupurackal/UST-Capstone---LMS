package com.ust.finalproject.controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ust.finalproject.model.Student;
import com.ust.finalproject.service.StudentService;
@CrossOrigin
@RestController
@RequestMapping("/api")
public class StudentController 
{
	@Autowired
	private StudentService studentService;
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
    public ResponseEntity<List<Student>> findByStudentName(@PathVariable String StudentName) 
    {
        List<Student> student = studentService.findByStudentName(StudentName);
        return ResponseEntity.ok(student);
    }
    @PostMapping("/addStudent")
    public Student addStudent(@RequestBody Student course) 
    {
        return studentService.addStudent(course);
    }
    @GetMapping("/getAll")
    public ResponseEntity<List<Student>> findAll() {
        List<Student> student=studentService.findAll();
        return ResponseEntity.ok(student);
    }
}