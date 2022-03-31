package com.trainh.quizsystem.repository;

import com.trainh.quizsystem.model.module.QuestionAnswers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionAnswersRepository extends JpaRepository<QuestionAnswers, Long> {
    QuestionAnswers findByQuestionAnswersId(Long questionAnswersId);
    List<QuestionAnswers> findAllByQuestion_QuestionId(Long questionId);
}
