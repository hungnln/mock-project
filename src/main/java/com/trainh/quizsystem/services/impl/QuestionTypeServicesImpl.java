package com.trainh.quizsystem.services.impl;


import com.trainh.quizsystem.model.module.QuestionEssay;
import com.trainh.quizsystem.model.module.QuestionMultichoice;
import com.trainh.quizsystem.model.module.QuestionTrueFalse;
import com.trainh.quizsystem.repository.QuestionEssayRepository;
import com.trainh.quizsystem.repository.QuestionMultichoiceRepository;
import com.trainh.quizsystem.repository.QuestionTrueFalseRepository;
import com.trainh.quizsystem.services.QuestionTypeServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuestionTypeServicesImpl implements QuestionTypeServices {

    @Autowired
    private QuestionMultichoiceRepository questionMultichoiceRepository;

    @Autowired
    private QuestionTrueFalseRepository questionTrueFalseRepository;

    @Autowired
    private QuestionEssayRepository questionEssayRepository;

    @Override
    public QuestionMultichoice auQuestionMultichoice(QuestionMultichoice questionMultichoice) {
        return questionMultichoiceRepository.save(questionMultichoice);
    }

    @Override
    public QuestionTrueFalse auQuestionTrueFalse(QuestionTrueFalse questionTrueFalse) {
        return questionTrueFalseRepository.save(questionTrueFalse);
    }

    @Override
    public QuestionEssay auQuestionEssay(QuestionEssay questionEssay) {
        return questionEssayRepository.save(questionEssay);
    }
}
