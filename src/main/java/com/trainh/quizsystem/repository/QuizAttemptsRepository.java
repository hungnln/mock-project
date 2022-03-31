package com.trainh.quizsystem.repository;

import com.trainh.quizsystem.model.module.QuizAttempts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizAttemptsRepository extends JpaRepository<QuizAttempts, Long> {
    QuizAttempts findByQuizAttemptId(Long quizAttemptId);
    QuizAttempts findByUser_UsernameAndQuiz_QuizIdAndFinishedIsFalse(String username, Long quizId);
    List<QuizAttempts> findAllByUser_UsernameAndQuiz_QuizId(String username, Long quizId);
    List<QuizAttempts> findAllByUser_UsernameAndQuiz_QuizIdAndFinishedIsTrue(String username, Long quizId);
}
