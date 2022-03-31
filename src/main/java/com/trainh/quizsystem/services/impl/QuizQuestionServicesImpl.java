package com.trainh.quizsystem.services.impl;

import com.trainh.quizsystem.model.module.Question;
import com.trainh.quizsystem.model.module.Quiz;
import com.trainh.quizsystem.model.module.QuizQuestion;
import com.trainh.quizsystem.model.module.QuizQuestionKey;
import com.trainh.quizsystem.repository.QuizQuestionRepository;
import com.trainh.quizsystem.services.QuizQuestionServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuizQuestionServicesImpl implements QuizQuestionServices {

    @Autowired
    private QuizQuestionRepository quizQuestionRepository;

    @Override
    public List<Question> getAllQuestionsByQuizId(Long quizId) {
        List<QuizQuestion> list = quizQuestionRepository.findAllByQuestion_StatusAndQuiz_QuizId(true,quizId);
        return list.stream().map(QuizQuestion::getQuestion).collect(Collectors.toList());
    }

    @Override
    public List<QuizQuestion> getAllByQuizId(Long quizId) {
        return quizQuestionRepository.findAllByQuestion_StatusAndQuiz_QuizId(true,quizId);
    }

    @Override
    public boolean addQuestionToQuiz(Question question, Quiz quiz) {
        QuizQuestionKey key = QuizQuestionKey.builder()
                .questionId(question.getQuestionId())
                .quizId(quiz.getQuizId())
                .build();
        QuizQuestion quizQuestion = QuizQuestion.builder()
                .quizQuestionKey(key)
                .quiz(quiz)
                .question(question)
                .build();
        quizQuestionRepository.save(quizQuestion);
        return true;
    }

    @Override
    public boolean removeQuestionFromQuiz(Long questionId, Long quizId) {
        QuizQuestionKey key = QuizQuestionKey.builder()
                .quizId(quizId)
                .questionId(questionId)
                .build();
        quizQuestionRepository.deleteById(key);
        return true;
    }
}
