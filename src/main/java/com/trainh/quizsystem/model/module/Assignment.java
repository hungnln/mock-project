package com.trainh.quizsystem.model.module;

import lombok.*;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;


@Entity
@Table(name = "wfh_assignment")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Assignment{
    @Id
    private Long assignmentId;

    private String file;
    @Lob
    private byte[] fileData;
    private Date startDate;
    private Date dueDate;
    private boolean fileSubmission;
    private boolean textSubmission;
    private float maximumGrade;


    @OneToMany(mappedBy = "assignment", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Collection<AssignmentSubmission> assignmentSubmissions;
}
