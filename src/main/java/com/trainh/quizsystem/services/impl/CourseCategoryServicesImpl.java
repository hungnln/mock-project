package com.trainh.quizsystem.services.impl;

import com.trainh.quizsystem.model.CourseCategory;
import com.trainh.quizsystem.repository.CourseCategoryRepository;
import com.trainh.quizsystem.services.CourseCategoryServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CourseCategoryServicesImpl implements CourseCategoryServices {
    @Autowired
    private CourseCategoryRepository courseCategoryRepository;

    @Override
    public List<CourseCategory> getAllCourseCategories() {
        return courseCategoryRepository.findAll();
    }

    @Override
    public CourseCategory getCourseCategoryByName(String courseCategoryName) {
        return courseCategoryRepository.findByCategoryName(courseCategoryName);
    }

    @Override
    public CourseCategory getCourseCategoryById(Long courseCategoryId) {
        return courseCategoryRepository.findByCategoryId(courseCategoryId);
    }

    @Override
    public boolean addCourseCategory(CourseCategory courseCategory) {
        courseCategoryRepository.save(courseCategory);
        return true;
    }

    @Override
    public boolean updateCourseCategory(CourseCategory courseCategory) {
        CourseCategory courseCategoryDB = courseCategoryRepository.findByCategoryId(courseCategory.getCategoryId());
        courseCategoryDB.setCategoryName(courseCategory.getCategoryName());
        courseCategoryDB.setCategoryDescription(courseCategory.getCategoryDescription());
        courseCategoryRepository.save(courseCategoryDB);
        return true;
    }

    @Override
    public boolean deleteCourseCategory(CourseCategory courseCategory) {
        courseCategoryRepository.deleteById(courseCategory.getCategoryId());
        return true;
    }
}
