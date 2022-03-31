package com.trainh.quizsystem.repository;

import com.trainh.quizsystem.model.module.QuestionMultichoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionMultichoiceRepository extends JpaRepository<QuestionMultichoice, Long> {
}
