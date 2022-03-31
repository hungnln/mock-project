package com.trainh.quizsystem.model.module;

import com.trainh.quizsystem.model.User;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "wfh_question")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;
    private String questionName;
    private String questionText;
    private float defaultMark;
    private Date timeCreated;
    private Date timeModified;
    private boolean hidden = false;
    private String questionType;
    private boolean status = true;

    @ManyToOne
    @JoinColumn(name = "create_by")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private User createdBy;

    @OneToMany(mappedBy = "question")
    @ToString.Exclude
    private Set<QuizQuestion> quizQuestions;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    @ToString.Exclude
    private Collection<QuestionAnswers> answers;

    @OneToOne
    @JoinColumn(name = "q_multichoice_id")
    private QuestionMultichoice questionMultichoice;

    @OneToOne
    @JoinColumn(name = "q_truefalse_id")
    private QuestionTrueFalse questionTrueFalse;

    @OneToOne
    @JoinColumn(name = "q_essay")
    private QuestionEssay questionEssay;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Question question = (Question) o;

        return Objects.equals(questionId, question.questionId);
    }

    @Override
    public int hashCode() {
        return 1344421622;
    }
}
