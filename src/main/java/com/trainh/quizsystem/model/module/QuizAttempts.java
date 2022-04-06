package com.trainh.quizsystem.model.module;

import com.trainh.quizsystem.model.User;
import lombok.*;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;

@Entity
@Table(name = "wfh_quiz_attempts")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class QuizAttempts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long quizAttemptId;
    private Date timeStart;
    private Date timeFinish;
    private boolean finished = false;
    private String listQuestions;
    private float gradeScore;

    @ManyToOne
    @JoinColumn(name = "quiz_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Quiz quiz;

    @ManyToOne
    @JoinColumn(name = "username")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private User user;

    @OneToMany(mappedBy = "quizAttempts", cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Collection<AttemptsAnswers> attemptsAnswers;

}
