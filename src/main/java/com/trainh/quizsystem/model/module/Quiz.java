package com.trainh.quizsystem.model.module;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Collection;
import java.util.Date;

@Entity
@Table(name = "wfh_quiz")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Quiz implements Serializable {
    @Id
    private Long quizId;
    private Date timeOpen;
    private Date timeClose;
    private Date timeLimit;
    private float gradeToPass;
    private int attempt;
    private boolean start = false;
//    private int gradeMethod;
//    private int questionPerPage;
    private boolean review;
    private boolean shuffleQuestions;
    private String password;

    @OneToMany(mappedBy = "quiz")
    @ToString.Exclude
    private Collection<QuizQuestion> quizQuestion;

    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Collection<QuizAttempts> quizAttempts;
}
