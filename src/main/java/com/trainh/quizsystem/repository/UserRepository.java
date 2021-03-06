package com.trainh.quizsystem.repository;

import com.trainh.quizsystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    User findByUsername(String username);
    List<User> findAllByStatusTrue();
    List<User> findAllByRole_RoleName(String roleName);

    @Query("SELECT u FROM wfh_user u WHERE u.username LIKE %:search%")
    List<User> findByUsernameLike(@Param("search") String search);
    }