package com.trainh.quizsystem.model;

import com.sun.istack.NotNull;
import com.trainh.quizsystem.model.module.AssignmentSubmission;
import com.trainh.quizsystem.model.module.Question;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;
import java.util.Objects;

@Entity(name = "wfh_user")
@Table(name = "wfh_user")

@AllArgsConstructor
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Builder
public class User {
    @Id
    @NotNull
    private String username;
    @NotNull
    private String password;
    private String email;
    @NotNull
    private String firstName;
    @NotNull
    private String lastName;
    private String phone;
    private String address;
    private String description;
    private byte[] image;
    @Column(columnDefinition = "boolean default true")
    @NotNull
    private boolean status = true;
    private Date joinedDate = new Date();

    @ManyToOne
    @JoinColumn(name = "role_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Role role;


    @OneToMany(mappedBy = "user")
    @ToString.Exclude
    private Collection<UserEnrolments> userEnrolments;

    @OneToMany(mappedBy = "createdBy")
    @ToString.Exclude
    private Collection<Question> listQuestions;

    @OneToMany(mappedBy = "user")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Collection<Course> listCourses;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        User user = (User) o;

        return Objects.equals(username, user.username);
    }

    @Override
    public int hashCode() {
        return 562048007;
    }

    //Submission
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Collection<AssignmentSubmission> assignmentSubmissions;
}
