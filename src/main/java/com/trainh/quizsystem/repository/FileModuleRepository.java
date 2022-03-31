package com.trainh.quizsystem.repository;

import com.trainh.quizsystem.model.module.FileModule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileModuleRepository extends JpaRepository<FileModule, Long> {
    FileModule findByFileId(Long fileId);
}
