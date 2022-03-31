package com.trainh.quizsystem.services;

import com.trainh.quizsystem.model.module.QuestionAnswers;

import java.util.List;

public interface QuestionAnswersServices {
    QuestionAnswers getAnswerById(Long questionAnswerId);
    List<QuestionAnswers> getAllAnswerByQuestionId(Long questionId);
    boolean addAnswer(QuestionAnswers questionAnswers);
}
