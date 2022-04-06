package com.trainh.quizsystem.services;

import com.trainh.quizsystem.model.CourseModules;

import java.util.List;

public interface CourseModulesServices {
    List<CourseModules> getAllBySectionId(Long sectionId);
    List<CourseModules> getAllVisibleBySectionId(Long sectionId);
    CourseModules getCourseModulesByCourseModulesId(Long courseModulesId);
    boolean addModule(CourseModules courseModules, Long sectionId);
    boolean addModule(CourseModules courseModules, Long sectionId, Object typeModule);
    boolean hiddenShowModule(Long courseModuleId);
    boolean deleteModule(Long courseModuleId);
    boolean updateModule(CourseModules courseModules, Object typeModule);
}
