package com.trainh.quizsystem.services;

import com.trainh.quizsystem.model.Course;

import java.util.List;

public interface CourseServices {
    List<Course> getAllCourses();
    List<Course> getAllCourseByUsername(String username);
    List<Course> getAllActiveCoursesByUsernameCourses(String username);
    Course getCourseById(Long courseId);
    boolean addCourse(Course course);
    boolean updateCourse(Course course);
    boolean deleteCourse(Course course);
}
