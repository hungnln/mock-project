package com.trainh.quizsystem.services.impl;

import com.trainh.quizsystem.model.module.Quiz;
import com.trainh.quizsystem.repository.QuizRepository;
import com.trainh.quizsystem.services.QuizServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuizServicesImpl implements QuizServices {

    @Autowired
    private QuizRepository quizRepository;
    @Override
    public Quiz getQuizById(Long quizId) {
        return quizRepository.findByQuizId(quizId);
    }

    @Override
    public boolean makeStarted(Long quizId) {
        Quiz quiz = quizRepository.findByQuizId(quizId);
        quiz.setStart(true);
        quizRepository.save(quiz);
        return true;
    }
}
