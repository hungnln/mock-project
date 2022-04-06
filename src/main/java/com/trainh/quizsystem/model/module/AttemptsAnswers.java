package com.trainh.quizsystem.model.module;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "wfh_attempts_answers")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class AttemptsAnswers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long attemptAnswerId;

    private String answerEssay;
    private boolean answerTF;

    private float grade = 0;

    @OneToOne
    @JoinColumn(name = "question_answers_id")
    private QuestionAnswers questionAnswers;

    @OneToOne
    @JoinColumn(name = "question_id")
    private Question question;

    @ManyToOne
    @JoinColumn(name = "quiz_attempts_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private QuizAttempts quizAttempts;
}
