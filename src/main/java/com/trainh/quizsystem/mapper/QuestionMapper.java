package com.trainh.quizsystem.mapper;

import com.trainh.quizsystem.model.module.Question;
import com.trainh.quizsystem.model.module.QuestionEssay;
import com.trainh.quizsystem.model.module.QuestionMultichoice;
import com.trainh.quizsystem.model.module.QuestionTrueFalse;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

@Data
@AllArgsConstructor
public class QuestionMapper implements Serializable {
    private Question question;
    private QuestionMultichoice questionMultichoice;
    private QuestionTrueFalse questionTrueFalse;
    private QuestionEssay questionEssay;
}
