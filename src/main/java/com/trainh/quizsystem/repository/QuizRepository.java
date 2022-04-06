package com.trainh.quizsystem.repository;

import com.trainh.quizsystem.model.module.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
    Quiz findByQuizId(Long quizId);
}
