package com.trainh.quizsystem.services.impl;

import com.trainh.quizsystem.model.Course;
import com.trainh.quizsystem.model.CourseSections;
import com.trainh.quizsystem.repository.CourseSectionRepository;
import com.trainh.quizsystem.services.CourseSectionServices;
import com.trainh.quizsystem.services.CourseServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseSectionServicesImpl implements CourseSectionServices {

    @Autowired
    private CourseServices courseServices;
    @Autowired
    private CourseSectionRepository courseSectionRepository;

    @Override
    public List<CourseSections> getAllByCourseId(Long courseId) {
        return courseSectionRepository.findAllByStatusIsTrueAndCourse_CourseId(courseId);
    }

    @Override
    public CourseSections getCourseSectionById(Long courseSectionId) {
        return courseSectionRepository.findByCourseSectionId(courseSectionId);
    }

    @Override
    public void initCourseSection(Course course) {
        for (int i = 1; i <= 5; i++) {
            CourseSections courseSections = CourseSections.builder()
                    .course(course)
                    .courseSectionName("Topic " + i)
                    .courseSummary("")
                    .visible(true)
                    .status(true)
            .build();
            addSection(courseSections);
        }
    }



    @Override
    public boolean addSection(CourseSections courseSections) {
        courseSections.setStatus(true);
        courseSections.setVisible(true);
        courseSectionRepository.save(courseSections);
        return true;
    }

    @Override
    public boolean addSection(Long courseId, int numberOfSections) {
        Course courseDB = courseServices.getCourseById(courseId);
        List<CourseSections> courseSectionsList = courseSectionRepository.findAllByCourse_CourseId(courseId);
        int continuous = courseSectionsList.size() + 1;
        for (int i = continuous; i < continuous + numberOfSections ; i++) {
            CourseSections courseSections = CourseSections.builder()
                    .course(courseDB)
                    .courseSectionName("Topic " + i)
                    .courseSummary("")
                    .visible(true)
                    .status(true)
                    .build();
            addSection(courseSections);
        }
        return true;
    }

    @Override
    public boolean editSection(CourseSections courseSections) {
        CourseSections courseSectionsDB = courseSectionRepository.findByCourseSectionId(courseSections.getCourseSectionId());
        courseSectionsDB.setCourseSectionName(courseSections.getCourseSectionName());
        courseSectionsDB.setCourseSummary(courseSections.getCourseSummary());
        courseSectionRepository.save(courseSectionsDB);
        return true;
    }

    @Override
    public boolean hiddenShowSection(Long courseSectionId) {
        CourseSections courseSectionsDB = courseSectionRepository.findByCourseSectionId(courseSectionId);
        boolean visible = courseSectionsDB.isVisible();
        courseSectionsDB.setVisible(!visible);
        courseSectionRepository.save(courseSectionsDB);
        return visible;
    }

    @Override
    public boolean disableSection(Long courseSectionId) {
        CourseSections courseSectionsDB = courseSectionRepository.findByCourseSectionId(courseSectionId);
        courseSectionsDB.setStatus(false);
        courseSectionRepository.save(courseSectionsDB);
        return true;
    }
}
