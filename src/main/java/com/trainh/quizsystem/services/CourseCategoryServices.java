package com.trainh.quizsystem.services;

import com.trainh.quizsystem.model.CourseCategory;

import java.util.List;

public interface CourseCategoryServices {
    List<CourseCategory> getAllCourseCategories();
    CourseCategory getCourseCategoryByName(String courseCategoryName);
    CourseCategory getCourseCategoryById(Long courseCategoryId);
    boolean addCourseCategory(CourseCategory courseCategory);
    boolean updateCourseCategory(CourseCategory courseCategory);
    boolean deleteCourseCategory(CourseCategory courseCategory);
}
