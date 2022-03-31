package com.trainh.quizsystem.model;

import lombok.*;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name = "wfh_role")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roleId;
    private String roleName;
    private String roleDescription;

    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Collection<User> users;
}
