package com.trainh.quizsystem.repository;

import com.trainh.quizsystem.model.module.QuestionTrueFalse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionTrueFalseRepository extends JpaRepository<QuestionTrueFalse, Long> {
}
