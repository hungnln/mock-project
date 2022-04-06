package com.trainh.quizsystem.repository;

import com.trainh.quizsystem.model.UserEnrolments;
import com.trainh.quizsystem.model.UserEnrolmentsKey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserEnrolmentsRepository extends JpaRepository<UserEnrolments, UserEnrolmentsKey> {
    List<UserEnrolments> findAllByCourse_CourseId(Long courseId);
    List<UserEnrolments> findAllByUser_Username(String username);
}
