package com.trainh.quizsystem.services;


import com.trainh.quizsystem.model.module.QuestionEssay;
import com.trainh.quizsystem.model.module.QuestionMultichoice;
import com.trainh.quizsystem.model.module.QuestionTrueFalse;

public interface QuestionTypeServices {
    QuestionMultichoice auQuestionMultichoice(QuestionMultichoice questionMultichoice);
    QuestionTrueFalse auQuestionTrueFalse(QuestionTrueFalse questionTrueFalse);
    QuestionEssay auQuestionEssay(QuestionEssay questionEssay);
}
