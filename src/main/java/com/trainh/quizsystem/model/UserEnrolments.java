package com.trainh.quizsystem.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "wfh_user_enrolments")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class UserEnrolments implements Serializable {
    @EmbeddedId
    private UserEnrolmentsKey id;

    @ManyToOne
    @MapsId(value = "username")
    @JoinColumn(name = "username")
    private User user;

    @ManyToOne
    @MapsId(value = "courseId")
    @JoinColumn(name = "course_id")
    private Course course;

    private Date dateEnrolled;
    @ColumnDefault("1")
    private boolean status;
}
