package com.trainh.quizsystem.model.module;

import com.trainh.quizsystem.model.User;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "wfh_assignment_submission")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class AssignmentSubmission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long assignmentSubmissionId;
    private Date timeCreated = new Date();
    private Date timeModified;
    private boolean grade;
    private float gradeScore;
    private String fileName;
    @Lob
    private byte[] fileData;
    @Lob
    private String text;

    @ManyToOne
    @JoinColumn(name = "assignment_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Assignment assignment;

    @ManyToOne
    @JoinColumn(name = "username")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private User user;
}
