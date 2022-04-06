package com.trainh.quizsystem.services;

import com.trainh.quizsystem.model.module.Quiz;

public interface QuizServices {
    Quiz getQuizById(Long quizId);
    boolean makeStarted(Long quizId);
}
