package com.ust.finalproject.controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ust.finalproject.model.Courses;
import com.ust.finalproject.service.CourseService;
@CrossOrigin
@RestController
@RequestMapping("/api")
public class Controller 
{
	@Autowired
	private CourseService courseService;
    @GetMapping("/courseName/{name}")
    public ResponseEntity<List<Courses>> findByName(@PathVariable String name) {
        List<Courses> courses = courseService.findByName(name);
        return ResponseEntity.ok(courses);
    }
    @GetMapping("/getAll")
    public ResponseEntity<List<Courses>> findAll() {
        List<Courses> courses = courseService.findAll();
        return ResponseEntity.ok(courses);
    }
    @GetMapping("/{courseId}")
    public ResponseEntity<Courses> findById(@PathVariable int courseId) {
        Courses course = courseService.findById(courseId);
        if (course != null) 
        {
            return ResponseEntity.ok(course);
        } else 
        {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Courses>> getCoursesByCategory(@PathVariable String category) {
        List<Courses> courses = courseService.getCoursesByCategory(category);
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/rating/{rating}")
    public List<Courses> getCoursesByRating(@PathVariable double rating) {
        return courseService.getCoursesByRating(rating);
    }
    @PostMapping("/addCourse")
    public ResponseEntity<Courses> addCourse(@RequestBody Courses course) 
    {
    	Courses addedCourse = courseService.addCourse(course);
        return new ResponseEntity<>(addedCourse, HttpStatus.CREATED);
    }
}