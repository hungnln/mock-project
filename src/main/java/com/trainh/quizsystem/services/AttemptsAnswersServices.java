package com.trainh.quizsystem.services;

import com.trainh.quizsystem.model.module.AttemptsAnswers;

import java.util.List;

public interface AttemptsAnswersServices {
    AttemptsAnswers getById(Long attemptsAnswersId);
    List<AttemptsAnswers> getByQAttemptAndQuestionId(Long quizAttemptId, Long questionId);
    boolean addUpdateAnswer(AttemptsAnswers attemptsAnswers);
}
