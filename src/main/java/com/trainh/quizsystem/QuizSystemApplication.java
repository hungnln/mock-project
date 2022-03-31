package com.trainh.quizsystem;

import com.trainh.quizsystem.model.*;
import com.trainh.quizsystem.model.module.Quiz;
import com.trainh.quizsystem.repository.*;
import com.trainh.quizsystem.services.impl.CourseModulesServicesImpl;
import com.trainh.quizsystem.services.impl.CourseSectionServicesImpl;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.ApplicationContext;

import java.util.Date;

@SpringBootApplication
@EnableConfigurationProperties
public class QuizSystemApplication {

    @Value("${hl.init}")
    static boolean init;

    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(QuizSystemApplication.class, args);
        //            initAll(context);
    }

//    public static void initAll(ApplicationContext context) {
//        initRole_User(context);
////        initCourseCategory_Course(context);
////        initUserEnrolments(context);
////        initSection(context);
////        initEmptyModule(context);
//    }
//
//    public static void initRole_User(ApplicationContext context) {
//        RoleRepository repository = context.getBean(RoleRepository.class);
//        Role admin = Role.builder().roleName("Admin").roleDescription("Managing accounts, role and permisions").build();
//        Role teacher = Role.builder().roleName("Teacher").roleDescription("Managing course, resource, quiz, question, grade and student in course").build();
//        Role student = Role.builder().roleName("Student").roleDescription("Learning, Do exercises, Access resource").build();
//        admin = repository.save(admin);
//        teacher = repository.save(teacher);
//        student = repository.save(student);
//        System.out.println("-------------- Init Role");
//        UserRepository userRepository = context.getBean(UserRepository.class);
//        User adminUser = User.builder().username("admin").password("1").lastName("Ho").firstName("Lam").email("Yuu@gmail.com").status(true).joinedDate(new Date()).role(admin).build();
//        User teacherUser = User.builder().username("teacher").password("1").lastName("Tung").firstName("Nhi").email("Yuu1@gmail.com").status(true).joinedDate(new Date()).role(teacher).build();
//        User studentUser = User.builder().username("student").password("1").lastName("Ho").firstName("Hoang").email("Yuu2@gmail.com").status(true).joinedDate(new Date()).role(student).build();
//        adminUser = userRepository.save(adminUser);
//        teacherUser = userRepository.save(teacherUser);
//        studentUser = userRepository.save(studentUser);
//        System.out.println("------------  Init User");
//    }
//
//    public static void initCourseCategory_Course(ApplicationContext context) {
//        CourseCategoryRepository courseCategoryRepository = context.getBean(CourseCategoryRepository.class);
//        CourseCategory courseCategory = CourseCategory.builder().categoryName("Công nghệ thông tin").categoryDescription("Software Engineer").build();
//        CourseCategory courseCategory1 = CourseCategory.builder().categoryName("Ngôn ngữ anh").categoryDescription("Ngành ngôn ngữ").build();
//        CourseCategory courseCategory2 = CourseCategory.builder().categoryName("Quản trị kinh doanh").categoryDescription("Ngành quản trị").build();
//        courseCategoryRepository.save(courseCategory);
//        courseCategoryRepository.save(courseCategory1);
//        courseCategoryRepository.save(courseCategory2);
//        System.out.println("---------- Init Course");
//        CourseRepository courseRepository = context.getBean(CourseRepository.class);
//        Course course = Course.builder()
//                .courseCategory(courseCategory)
//                .shortName("PRF192")
//                .fullName("Program Fundamental")
//                .startDate(new Date()).endDate(new Date())
//                .description("Details for course")
//                .active(true)
//                .password("123")
//                .visible(true)
//                .user(User.builder().username("teacher").build())
//                .build();
//        courseRepository.save(course);
//
//
//    }
//
//    public static void initUserEnrolments(ApplicationContext context) {
//        UserRepository userRepository = context.getBean(UserRepository.class);
//        CourseRepository courseRepository = context.getBean(CourseRepository.class);
//        UserEnrolmentsRepository enrolmentsRepository = context.getBean(UserEnrolmentsRepository.class);
//        User student = userRepository.findByUsername("student");
//        Course course = courseRepository.findByCourseId(1L);
//        UserEnrolments userEnrolments = UserEnrolments.builder()
//                .id(UserEnrolmentsKey.builder().courseId(course.getCourseId()).username(student.getUsername()).build())
//                .user(student)
//                .course(course)
//                .status(true)
//                .dateEnrolled(new Date()).build();
//        enrolmentsRepository.save(userEnrolments);
//        System.out.println("------- Init UserEnrolment");
//
//    }
//
//    public static void initSection(ApplicationContext context) {
//        CourseSectionServicesImpl sectionServices = context.getBean(CourseSectionServicesImpl.class);
//        CourseRepository courseRepository = context.getBean(CourseRepository.class);
//        Course course = courseRepository.getById(1L);
//        sectionServices.addSection(course.getCourseId(), 2);
//        System.out.println("----- Init Course Section");
//    }
//
//    public static void initEmptyModule(ApplicationContext context) {
//        CourseSectionServicesImpl courseSectionServices = context.getBean(CourseSectionServicesImpl.class);
//        CourseSections courseSections = courseSectionServices.getCourseSectionById(1L);
//        CourseModulesServicesImpl courseModulesServices = context.getBean(CourseModulesServicesImpl.class);
//        CourseModules courseModules = CourseModules.builder()
//                .name("Quiz 1")
//                .description("hihi haha")
//                .visible(true)
//                .typeName("Quiz")
//                .status(true)
//                .build();
//        Quiz quiz = Quiz.builder().attempt(1)
//                .gradeToPass(10f)
//                .review(true)
//                .start(false)
//                .build();
//        CourseModules courseModules1 = CourseModules.builder()
//                .name("Assignment 1")
//                .description("hihi haha")
//                .visible(true)
//                .typeName("Assignment")
//                .status(true)
//                .build();
//        courseModulesServices.addModule(courseModules, courseSections.getCourseSectionId(), quiz);
//
//        courseModulesServices.addModule(courseModules1, courseSections.getCourseSectionId());
//        System.out.println("--- Init Empty Module");
//        System.out.println(Quiz.class.getSimpleName());
//    }
}
