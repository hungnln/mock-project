package com.trainh.quizsystem.model.module;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class QuizQuestionKey implements Serializable {
    @Column(name = "quiz_id")
    private Long quizId;
    @Column(name = "question_id")
    private Long questionId;
}
