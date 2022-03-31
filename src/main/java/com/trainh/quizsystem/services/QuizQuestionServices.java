package com.trainh.quizsystem.services;

import com.trainh.quizsystem.model.module.Question;
import com.trainh.quizsystem.model.module.Quiz;
import com.trainh.quizsystem.model.module.QuizQuestion;

import java.util.List;

public interface QuizQuestionServices {
    List<Question> getAllQuestionsByQuizId(Long quizId);
    List<QuizQuestion> getAllByQuizId(Long quizId);
    boolean addQuestionToQuiz(Question question, Quiz quiz);
    boolean removeQuestionFromQuiz(Long questionId, Long quizId);
}
