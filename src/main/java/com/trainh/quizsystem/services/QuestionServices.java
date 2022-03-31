package com.trainh.quizsystem.services;

import com.trainh.quizsystem.model.module.Question;

import java.util.List;

public interface QuestionServices {
    Question getQuestionById(Long questionId);
    List<Question> getQuestionsByQuizId(Long quizId);
    boolean addUpdateQuestion(Question question, Long quizId, Object questionType,String username);
    boolean deleteQuestion(Long questionId);
}
