package com.trainh.quizsystem.services.impl;

import com.trainh.quizsystem.model.Course;
import com.trainh.quizsystem.model.CourseCategory;
import com.trainh.quizsystem.repository.CourseCategoryRepository;
import com.trainh.quizsystem.repository.CourseRepository;
import com.trainh.quizsystem.services.CourseSectionServices;
import com.trainh.quizsystem.services.CourseServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CourseServicesImpl implements CourseServices {

    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private CourseCategoryRepository courseCategoryRepository;
    @Autowired
    private CourseSectionServices courseSectionServicesImpl;

    @Override
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @Override
    public List<Course> getAllCourseByUsername(String username) {
        return courseRepository.findAllByUser_Username(username);
    }

    @Override
    public List<Course> getAllActiveCoursesByUsernameCourses(String username) {
        return courseRepository.findAllByActiveIsTrueAndVisibleIsTrueAndUser_Username(username);
    }

    @Override
    public Course getCourseById(Long courseId) {
        return courseRepository.findByCourseId(courseId);
    }

    @Override
    public boolean addCourse(Course course) {
        Course courseDB = courseRepository.save(course);
        System.out.println("---- Begin Init Section");
        courseSectionServicesImpl.initCourseSection(courseDB);
        System.out.println("--- End Init Section");
        return true;
    }

    @Override
    public boolean updateCourse(Course course) {
        Course courseDB = courseRepository.findByCourseId(course.getCourseId());
        CourseCategory category = courseCategoryRepository.findByCategoryId(course.getCourseCategory().getCategoryId());
        courseDB.setCourseCategory(category);
        courseDB.setFullName(course.getFullName());
        courseDB.setShortName(course.getShortName());
        courseDB.setVisible(course.isVisible());
        courseDB.setStartDate(course.getStartDate());
        courseDB.setEndDate(course.getEndDate());
        courseDB.setDescription(course.getDescription());
        courseDB.setImage(course.getImage());
        courseDB.setPassword(course.getPassword());
        courseDB.setActive(course.isActive());
        courseRepository.save(courseDB);
        return true;
    }

    @Override
    public boolean deleteCourse(Course course) {
        courseRepository.deleteById(course.getCourseId());
        return true;
    }
}
