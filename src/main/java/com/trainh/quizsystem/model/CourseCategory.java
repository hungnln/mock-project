package com.trainh.quizsystem.model;

import lombok.*;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name = "wfh_course_category")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class CourseCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryId;
    private String categoryName;
    private String categoryDescription;

    @OneToMany(mappedBy = "courseCategory", cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Collection<Course> courses;
}
