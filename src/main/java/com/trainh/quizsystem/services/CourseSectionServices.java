package com.trainh.quizsystem.services;

import com.trainh.quizsystem.model.Course;
import com.trainh.quizsystem.model.CourseSections;

import java.util.List;

public interface CourseSectionServices {
    List<CourseSections> getAllByCourseId(Long courseId);
    CourseSections getCourseSectionById(Long courseSectionId);
    void initCourseSection(Course course);
    boolean addSection(CourseSections courseSections);
    boolean addSection(Long courseId , int numberOfSections);
    boolean editSection(CourseSections courseSections);
    boolean hiddenShowSection(Long courseSectionId);
    boolean disableSection(Long courseSectionId);
}
