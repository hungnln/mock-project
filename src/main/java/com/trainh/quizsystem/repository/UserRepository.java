package com.trainh.quizsystem.repository;

import com.trainh.quizsystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    User findByUsername(String username);
    List<User> findAllByStatusTrue();
    List<User> findAllByRole_RoleName(String roleName);
}
