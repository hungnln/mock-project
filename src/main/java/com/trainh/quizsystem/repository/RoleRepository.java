package com.trainh.quizsystem.repository;

import com.trainh.quizsystem.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    public Role findByRoleName(String roleName);
}
