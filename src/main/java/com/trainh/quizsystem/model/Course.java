package com.trainh.quizsystem.model;

import lombok.*;
import org.hibernate.Hibernate;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "wfh_course")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString

@Builder
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long courseId;
    private String fullName;
    private String shortName;
    private Date startDate;
    private Date endDate;
    private String password;
    private String description;
    @Lob
    private String image;
    @ColumnDefault("1")
    private boolean active;
    @ColumnDefault("0")
    private boolean visible;

    @ManyToOne
    @JoinColumn(name = "course_category_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private CourseCategory courseCategory;

    @ManyToOne
    @JoinColumn(name = "username")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private User user;

    @OneToMany(mappedBy = "course", fetch = FetchType.LAZY)
    @ToString.Exclude
    private Set<UserEnrolments> userEnrolments;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @ToString.Exclude
    private Collection<CourseSections> courseSections;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Course course = (Course) o;

        return Objects.equals(courseId, course.courseId);
    }

    @Override
    public int hashCode() {
        return 1702818130;
    }
}
