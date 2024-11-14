package com.ust.finalproject.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ust.finalproject.model.Courses;
public interface FeedbackRepository extends JpaRepository<Courses , Integer>
{
	List<Courses> findByName(String name);
    List<Courses> findByCategory(String category);
    List<Courses> findByRatingGreaterThanEqual(double rating);
}