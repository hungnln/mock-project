package com.trainh.quizsystem.model.module;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "wfh_question_truefalse")
@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
@Builder
public class QuestionTrueFalse {
    @Id
    private Long questionId;
    private boolean selection;
}
