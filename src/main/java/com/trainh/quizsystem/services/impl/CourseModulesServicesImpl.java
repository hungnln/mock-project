package com.trainh.quizsystem.services.impl;

import com.trainh.quizsystem.model.CourseModules;
import com.trainh.quizsystem.model.CourseSections;
import com.trainh.quizsystem.model.module.Assignment;
import com.trainh.quizsystem.model.module.FileModule;
import com.trainh.quizsystem.model.module.Quiz;
import com.trainh.quizsystem.model.module.Url;
import com.trainh.quizsystem.repository.CourseModulesRepository;
import com.trainh.quizsystem.services.CourseModulesServices;
import com.trainh.quizsystem.services.CourseSectionServices;
import com.trainh.quizsystem.util.Utility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
public class CourseModulesServicesImpl implements CourseModulesServices {

    @Autowired
    private CourseModulesRepository courseModulesRepository;

    @Autowired
    private CourseSectionServices courseSectionServices;

    @Autowired
    private ModuleServicesImpl moduleServices;

    private Date fixDate(Date datetime){
       return Utility.fixDate(datetime);
    }

    @Override
    public List<CourseModules> getAllBySectionId(Long sectionId) {
        return courseModulesRepository.findAllByStatusIsTrueAndCourseSections_CourseSectionId(sectionId);
    }

    @Override
    public List<CourseModules> getAllVisibleBySectionId(Long sectionId) {
        return courseModulesRepository.findAllByVisibleIsTrueAndCourseSections_CourseSectionId(sectionId);
    }

    @Override
    public CourseModules getCourseModulesByCourseModulesId(Long courseModulesId) {
        return courseModulesRepository.findByCourseModuleId(courseModulesId);
    }

    @Override
    public boolean addModule(CourseModules courseModules, Long sectionId) {
        CourseSections sections = courseSectionServices.getCourseSectionById(sectionId);
        courseModules.setCourseSections(sections);
        courseModules.setVisible(true);
        courseModulesRepository.save(courseModules);
        return true;
    }

    @Transactional
    @Override
    public boolean addModule(CourseModules courseModules, Long courseSectionId, Object module) {
        CourseModules courseModulesDB;
        if(courseModules.getCourseModuleId() != null){
            courseModulesDB = courseModulesRepository.getById(courseModules.getCourseModuleId());
            courseModulesDB.setStatus(courseModules.isStatus());
            courseModulesDB.setName(courseModules.getName());
            courseModulesDB.setDescription(courseModules.getDescription());
            courseModulesDB.setShowDescription(courseModules.isShowDescription());
            courseModulesDB.setVisible(courseModules.isVisible());
            courseModulesDB.setTypeName(courseModules.getTypeName());
            courseModulesDB.setAssignment(courseModules.getAssignment());
            courseModulesDB.setQuiz(courseModules.getQuiz());
            courseModulesDB.setUrl(courseModules.getUrl());
            courseModulesDB.setFile(courseModules.getFile());
        }
        else courseModulesDB = courseModules;


        CourseSections courseSections = courseSectionServices.getCourseSectionById(courseSectionId);
        courseModulesDB.setCourseSections(courseSections);
        CourseModules afterSave = courseModulesRepository.save(courseModulesDB);
        switch (afterSave.getTypeName()) {
            case "Assignment":
                ((Assignment)module).setAssignmentId(afterSave.getCourseModuleId());
                ((Assignment)module).setStartDate(fixDate(((Assignment) module).getStartDate()));
                ((Assignment)module).setDueDate(fixDate(((Assignment) module).getDueDate()));
                Assignment assignment = moduleServices.addAssignment((Assignment) module);
                afterSave.setAssignment(assignment);
                break;
            case "Quiz":
                ((Quiz)module).setQuizId(afterSave.getCourseModuleId());
                ((Quiz)module).setTimeOpen(fixDate(((Quiz) module).getTimeOpen()));
                ((Quiz)module).setTimeClose(fixDate(((Quiz) module).getTimeClose()));
                Quiz quiz = moduleServices.addQuiz((Quiz) module);
                afterSave.setQuiz(quiz);
                break;
            case "FileModule":
                ((FileModule)module).setFileId(afterSave.getCourseModuleId());
                FileModule fileModule = moduleServices.addFile((FileModule) module);
                afterSave.setFile(fileModule);
                break;
            case "Url":
                ((Url)module).setUrlId(afterSave.getCourseModuleId());
                Url url = moduleServices.addUrl((Url) module);
                afterSave.setUrl(url);
                break;
            default:
                return false;
        }
        courseModulesRepository.save(courseModulesDB);
        return true;
    }

    @Override
    public boolean hiddenShowModule(Long courseModuleId) {
        CourseModules courseModules = courseModulesRepository.getById(courseModuleId);
        boolean visible = courseModules.isVisible();
        courseModules.setVisible(!visible);
        courseModulesRepository.save(courseModules);
        return visible;
    }

    @Override
    public boolean deleteModule(Long courseModuleId) {
        CourseModules courseModules = courseModulesRepository.getById(courseModuleId);
        courseModules.setStatus(false);
        courseModulesRepository.save(courseModules);
        return true;
    }

    @Override
    public boolean updateModule(CourseModules courseModules, Object typeModule) {
        CourseModules courseModulesDB = courseModulesRepository.getById(courseModules.getCourseModuleId());
        courseModulesDB.setName(courseModules.getName());
        courseModulesDB.setDescription(courseModules.getDescription());
        return false;
    }
}
