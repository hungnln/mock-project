package com.trainh.quizsystem.services;

import com.trainh.quizsystem.model.module.Assignment;
import com.trainh.quizsystem.model.module.FileModule;
import com.trainh.quizsystem.model.module.Quiz;
import com.trainh.quizsystem.model.module.Url;

public interface ModuleServices {
    Assignment getAssignmentById(Long assignmentId);
    Assignment addAssignment(Assignment assignment);
    Quiz addQuiz(Quiz quiz);
    FileModule addFile(FileModule fileModule);
    Url addUrl(Url url);
}
