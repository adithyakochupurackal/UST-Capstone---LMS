package com.ust.finalproject.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ust.finalproject.model.Feedback;
@Repository
public interface FeedbackRepository extends JpaRepository<Feedback,Integer>
{
}