package com.trainh.quizsystem.model.module;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "wfh_question_essay")
@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
@Builder
public class QuestionEssay {
    @Id
    private Long questionId;
    private boolean required;
    private int inputBoxSize = 10;
    private int minimumWordLimit;
    private int maximumWordLimit;
    private boolean shortAnswer;
}
