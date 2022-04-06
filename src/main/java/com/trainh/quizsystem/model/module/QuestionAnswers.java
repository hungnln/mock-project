package com.trainh.quizsystem.model.module;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "wfh_question_answers")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class QuestionAnswers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionAnswersId;
    private String answer;
    private String feedback;
    private boolean correct;
    private float fraction;
    private int position;
    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        QuestionAnswers that = (QuestionAnswers) o;

        return Objects.equals(questionAnswersId, that.questionAnswersId);
    }

    @Override
    public int hashCode() {
        return 2091289396;
    }
}
