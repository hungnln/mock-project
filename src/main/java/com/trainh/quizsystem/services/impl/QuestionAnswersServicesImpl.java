package com.trainh.quizsystem.services.impl;


import com.trainh.quizsystem.model.module.QuestionAnswers;
import com.trainh.quizsystem.repository.QuestionAnswersRepository;
import com.trainh.quizsystem.services.QuestionAnswersServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionAnswersServicesImpl implements QuestionAnswersServices {

    @Autowired
    private QuestionAnswersRepository questionAnswersRepository;

    @Override
    public QuestionAnswers getAnswerById(Long questionAnswerId) {
        return questionAnswersRepository.findByQuestionAnswersId(questionAnswerId);
    }

    @Override
    public List<QuestionAnswers> getAllAnswerByQuestionId(Long questionId) {
        return questionAnswersRepository.findAllByQuestion_QuestionId(questionId);
    }

    @Override
    public boolean addAnswer(QuestionAnswers questionAnswers) {
        QuestionAnswers questionAnswersDB;
        if(questionAnswers.getQuestionAnswersId() != null){
            questionAnswersDB = questionAnswersRepository.getById(questionAnswers.getQuestionAnswersId());
            questionAnswersDB.setAnswer(questionAnswers.getAnswer());
            questionAnswersDB.setCorrect(questionAnswers.isCorrect());
            questionAnswersDB.setFeedback(questionAnswers.getFeedback());
            questionAnswersDB.setQuestion(questionAnswers.getQuestion());
            questionAnswersDB.setFraction(questionAnswers.getFraction());
            questionAnswersDB.setPosition(questionAnswers.getPosition());
        }else questionAnswersDB = questionAnswers;
        questionAnswersRepository.saveAndFlush(questionAnswersDB);
        return true;
    }
}
