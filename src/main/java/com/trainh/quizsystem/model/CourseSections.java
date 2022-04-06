package com.trainh.quizsystem.model;

import lombok.*;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name = "wfh_course_sections")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class CourseSections {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long courseSectionId;
    private String courseSectionName;
    private String courseSummary;
    private boolean visible;
    private boolean status;

    @ManyToOne
    @JoinColumn(name = "course_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Course course;

    @OneToMany(mappedBy = "courseSections",cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Collection<CourseModules> courseModules;


}
