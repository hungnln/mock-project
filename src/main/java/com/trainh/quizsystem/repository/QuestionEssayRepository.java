package com.trainh.quizsystem.repository;

import com.trainh.quizsystem.model.module.QuestionEssay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionEssayRepository extends JpaRepository<QuestionEssay, Long> {
}
