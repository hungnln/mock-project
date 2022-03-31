package com.trainh.quizsystem.repository;

import com.trainh.quizsystem.model.module.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    Assignment findByAssignmentId(Long assignmentId);
}
