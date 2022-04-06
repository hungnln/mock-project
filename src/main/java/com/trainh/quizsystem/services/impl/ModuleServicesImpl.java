package com.trainh.quizsystem.services.impl;

import com.trainh.quizsystem.model.module.Assignment;
import com.trainh.quizsystem.model.module.FileModule;
import com.trainh.quizsystem.model.module.Quiz;
import com.trainh.quizsystem.model.module.Url;
import com.trainh.quizsystem.repository.AssignmentRepository;
import com.trainh.quizsystem.repository.FileModuleRepository;
import com.trainh.quizsystem.repository.QuizRepository;
import com.trainh.quizsystem.repository.UrlRepository;
import com.trainh.quizsystem.services.ModuleServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ModuleServicesImpl implements ModuleServices {

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private FileModuleRepository fileModuleRepository;

    @Autowired
    private UrlRepository urlRepository;


    @Override
    public Assignment getAssignmentById(Long assignmentId) {
        return assignmentRepository.findByAssignmentId(assignmentId);
    }

    @Override
    public Assignment addAssignment(Assignment assignment) {
        return assignmentRepository.save(assignment);
    }

    @Override
    public Quiz addQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    @Override
    public FileModule addFile(FileModule fileModule) {
        return fileModuleRepository.save(fileModule);
    }

    @Override
    public Url addUrl(Url url) {
        return urlRepository.save(url);
    }
}
