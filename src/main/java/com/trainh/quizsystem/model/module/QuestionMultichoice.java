package com.trainh.quizsystem.model.module;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "wfh_question_multichoice")
@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
@Builder
public class QuestionMultichoice {
    @Id
    private Long questionId;
    private boolean singleAnswer;
    private boolean numberTheChoice;
    private boolean showInstructions = false;
}
