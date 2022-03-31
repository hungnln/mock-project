package com.trainh.quizsystem.controller;

import com.trainh.quizsystem.mapper.ModuleMapper;
import com.trainh.quizsystem.mapper.QuestionMapper;
import com.trainh.quizsystem.model.*;
import com.trainh.quizsystem.model.module.AssignmentSubmission;
import com.trainh.quizsystem.model.module.FileModule;
import com.trainh.quizsystem.model.module.Question;
import com.trainh.quizsystem.model.module.QuizAttempts;
import com.trainh.quizsystem.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.lang.reflect.Method;
import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/teacher")
public class TeacherController {

    @Autowired
    private UserServices userServicesImpl;

    @Autowired
    private RoleServices roleServices;

    @Autowired
    private CourseCategoryServices courseCategoryServicesImpl;

    @Autowired
    private CourseServices courseServicesImpl;

    @Autowired
    private CourseSectionServices courseSectionServicesImpl;

    @Autowired
    private UserEnrolmentsServices userEnrolmentsServicesImpl;

    @Autowired
    private CourseModulesServices courseModulesServicesImpl;

    @Autowired
    private QuestionServices questionServices;

    @Autowired
    private QuizQuestionServices quizQuestionServices;

    @Autowired
    private QuizAttemptsServices quizAttemptsServices;

    @Autowired
    private AssignmentSubmissionServices assignmentSubmissionServices;


    @GetMapping(value = {"", "/"})
    public String teacherPage(Model model, Principal principal) {
        String username = principal != null ? principal.getName() : null;
        if (username == null) return "redirect://afterLogin";
        List<Course> course = courseServicesImpl.getAllCourseByUsername(username);
        model.addAttribute("module", "home");
        model.addAttribute("lCourse", course);
        return "teacher/teacher";
    }

    //Init Attribute
    @ModelAttribute("userLogin")
    User userLogin(Principal principal) {
        return userServicesImpl.getUserByUsername(principal.getName());
    }

    @ModelAttribute("myCourses")
    List<Course> getCourseActiveByUser(Principal principal) {
        String username = principal.getName();

        return courseServicesImpl.getAllActiveCoursesByUsernameCourses(username);
    }

    //Course
    @GetMapping("/course")
    public String coursePage(Model model, Principal principal) {
        model.addAttribute("module", "course");
        String username = principal.getName();
        List<Course> courseList = courseServicesImpl.getAllCourseByUsername(username);
        model.addAttribute("LIST_COURSE", courseList);
        return "teacher/course";
    }

    @GetMapping("/addCourse")
    public String addCoursePage(Model model) {
        List<CourseCategory> courseCategoryList = courseCategoryServicesImpl.getAllCourseCategories();
        model.addAttribute("module", "addCourse");
        model.addAttribute("LIST_CATEGORY", courseCategoryList);
        return "teacher/addCourse";
    }

    @GetMapping("/editCourse/{courseId}")
    public String editCoursePage(Model model, @PathVariable("courseId") Long courseId, Principal principal) {
        Course courseDB = courseServicesImpl.getCourseById(courseId);
        List<CourseCategory> courseCategoryList = courseCategoryServicesImpl.getAllCourseCategories();
        model.addAttribute("LIST_CATEGORY", courseCategoryList);
        model.addAttribute("module", "addCourse");
        String username = principal.getName();
        if (username == null) return "login";
        if (!courseDB.getUser().getUsername().equals(username))
            return "403";
        model.addAttribute("eCourse", courseDB);
        return "teacher/editCourse";

    }

    @PostMapping("/addCourse")
    @ResponseBody
    public ResponseEntity<Object> addEditCourse(@RequestBody Course course) {
        CourseCategory category = courseCategoryServicesImpl.getCourseCategoryById(course.getCourseCategory().getCategoryId());
        User user = userServicesImpl.getUserByUsername(course.getUser().getUsername());
        course.setUser(user);
        course.setCourseCategory(category);
        String success = course.getCourseId() != null ? "Sửa khóa học thành công" : "Thêm khóa học thành công";
        String fail = course.getCourseId() != null ? "Sửa khóa học thất bại" : "Thêm khóa học thất bại";

        boolean result = course.getCourseId() != null ? courseServicesImpl.updateCourse(course) : courseServicesImpl.addCourse(course);
        if (result) {
            return new ResponseEntity<>(success, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(fail, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/course")
    @ResponseBody
    public ResponseEntity<Object> deleteCourse(@RequestBody Course course) {
        if (courseServicesImpl.deleteCourse(course)) {
            return new ResponseEntity<>("Xóa khóa học thành công", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Xóa khóa học thất bại", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/viewCourse")
    public String viewCoursePage(Model model, @RequestParam("id") Long courseId) {
        model.addAttribute("module", "" + courseId);
        Course course = courseServicesImpl.getCourseById(courseId);
        model.addAttribute("oCourse", course);
        return "teacher/viewCourse";
    }

    //Course Sections
    @PostMapping("/section")
    @ResponseBody
    public ResponseEntity<Object> addCourseSection(@RequestParam("courseID") Long courseId,
                                                   @RequestParam("num") int numberOfSection) {
        boolean result = courseSectionServicesImpl.addSection(courseId, numberOfSection);
        if (result) {
            return new ResponseEntity<>("Thêm chủ đề thành công", HttpStatus.OK);
        } else
            return new ResponseEntity<>("Thêm chủ đề thất bại", HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/section")
    @ResponseBody
    public ResponseEntity<Object> editCourseSection(@RequestBody CourseSections courseSections) {
        boolean result = courseSectionServicesImpl.editSection(courseSections);
        if (result) {
            return new ResponseEntity<>("Sửa chủ đề thành công", HttpStatus.OK);
        } else
            return new ResponseEntity<>("Sửa chủ đề thất bại", HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/section/{id}")
    @ResponseBody
    public ResponseEntity<Object> hiddenShowCourseSection(@PathVariable("id") Long courseSectionId) {
        boolean result = courseSectionServicesImpl.hiddenShowSection(courseSectionId);
        String msg = result ? "Ẩn chủ đề thành công" : "Hiện chủ đề thành công";
        return new ResponseEntity<>(msg, HttpStatus.OK);
    }

    @DeleteMapping("/section/{id}")
    @ResponseBody
    public ResponseEntity<Object> disableCourseSection(@PathVariable("id") Long courseSectionId) {
        boolean result = courseSectionServicesImpl.disableSection(courseSectionId);
        if (result) {
            return new ResponseEntity<>("Xóa chủ đề thành công", HttpStatus.OK);
        } else
            return new ResponseEntity<>("Xóa chủ đề thất bại", HttpStatus.BAD_REQUEST);
    }

    //UserEnrolments
    @GetMapping("/member")
    public String memberPage(Model model, @RequestParam("id") Long courseId) {
        List<User> userList = userEnrolmentsServicesImpl.getAllEnrolmentsByCourseId(courseId);
        List<Role> roleList = roleServices.getAllRoleList();
        Course course = courseServicesImpl.getCourseById(courseId);
        List<String> classList = new ArrayList<>(List.of("bg-light-warning text-warning",
                "bg-light-danger text-danger",
                "bg-light-primary text-primary",
                "bg-light-info text-info",
                "bg-light-success text-success"));
        List<User> userListAdd = userServicesImpl.listAddCourses(userList);
        model.addAttribute("module", "mb" + courseId);
        model.addAttribute("CLASS_IMG", classList);
        model.addAttribute("LIST_USER", userList);
        model.addAttribute("LIST_ROLE", roleList);
        model.addAttribute("USER_ADD", userListAdd);
        model.addAttribute("CourseSelected", course);
        return "teacher/member";
    }

    @PostMapping("/member")
    public ResponseEntity<Object> addMembers(@RequestBody List<String> usernameList, @RequestParam("id") Long courseId) {
        boolean result = userEnrolmentsServicesImpl.addEnrolment(courseId, usernameList);
        if (result) {
            return new ResponseEntity<>("Thêm thành viên vào khóa học thành công", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Thêm thành viên vào khóa học thất bại", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/member")
    public ResponseEntity<Object> deleteMembers(@RequestBody List<String> usernameList, @RequestParam("id") Long courseId) {
        boolean result = userEnrolmentsServicesImpl.deleteEnrolment(usernameList, courseId);
        if (result) {
            return new ResponseEntity<>("Xóa thành viên khỏi khóa học thành công", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Xóa thành viên khỏi khóa học thất bại", HttpStatus.BAD_REQUEST);
        }
    }

    //Module
    @GetMapping("/addModule")
    public String addModulePage(Model model, @RequestParam("type") String type, @RequestParam("id") Long courseSectionId) {
        CourseSections courseSections = courseSectionServicesImpl.getCourseSectionById(courseSectionId);
        model.addAttribute("addPage", true);
        model.addAttribute("courseSection", courseSections);
        return "teacher/addModule";
    }

    @GetMapping("/editModule")
    public String editModulePage(Model model, @RequestParam("type") String type, @RequestParam("id") Long courseModuleId) {
        CourseModules courseModules = courseModulesServicesImpl.getCourseModulesByCourseModulesId(courseModuleId);
        CourseSections courseSections = courseModules.getCourseSections();
        model.addAttribute("addPage", false);
        model.addAttribute("courseSection", courseSections);
        model.addAttribute("courseModule", courseModules);
        return "teacher/addModule";
//        return "layout/addModuleChild";
    }

    @GetMapping("/editLayout")
    public String editLayoutPage(Model model, @RequestParam("type") String type, @RequestParam("id") Long courseModuleId) {
        CourseModules courseModules = courseModulesServicesImpl.getCourseModulesByCourseModulesId(courseModuleId);
        CourseSections courseSections = courseModules.getCourseSections();
        model.addAttribute("addPage", false);
        model.addAttribute("courseSection", courseSections);
        model.addAttribute("courseModule", courseModules);
//        return "teacher/addModule";
        return "layout/addModuleChild";
    }

    @PostMapping("/addModule")
    @ResponseBody
    public ResponseEntity<Object> addModule(@RequestBody ModuleMapper module) {
        CourseModules courseModules = module.getCourseModules();
        Object moduleChild = null;
        try {
            Method method = module.getClass().getMethod("get" + courseModules.getTypeName());
            moduleChild = method.invoke(module);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error Type", HttpStatus.BAD_REQUEST);
        }
        boolean result = courseModulesServicesImpl.addModule(courseModules, courseModules.getCourseSections().getCourseSectionId(), moduleChild);
        if (result) {
            return new ResponseEntity<>(" Thành công", HttpStatus.OK);
        } else {
            return new ResponseEntity<>(" Thất bại", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/hiddenShowModule/{id}")
    public ResponseEntity<Object> hiddenShowModule(@PathVariable("id") Long moduleId) {
        boolean result = courseModulesServicesImpl.hiddenShowModule(moduleId);
        if (result) {
            return new ResponseEntity<>("Ẩn thành công", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Hiện thành công", HttpStatus.OK);
        }
    }

    @DeleteMapping("/module/{id}")
    public ResponseEntity<Object> disableModule(@PathVariable("id") Long moduleId) {
        boolean result = courseModulesServicesImpl.deleteModule(moduleId);
        if (result) {
            return new ResponseEntity<>("Xóa thành công", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Xóa thất bại", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/viewModule")
    public String viewModule(Model model, @RequestParam("id") Long courseModuleId, HttpServletResponse response) {
        CourseModules courseModules = courseModulesServicesImpl.getCourseModulesByCourseModulesId(courseModuleId);
        model.addAttribute("module", "" + courseModules.getCourseSections().getCourse().getCourseId());
        model.addAttribute("courseModule", courseModules);
        switch (courseModules.getTypeName()) {
            case "Assignment":
                int totalMember = courseModules.getCourseSections().getCourse().getUserEnrolments() != null ? courseModules.getCourseSections().getCourse().getUserEnrolments().size() : 0;
                int totalSubmission = 0;
                List<AssignmentSubmission> listGrade = assignmentSubmissionServices.getSubmissionByAssId(courseModuleId);
                Long continueGrade = listGrade.get(0).getAssignmentSubmissionId();
                for (AssignmentSubmission assignmentSubmission : listGrade) {
                    if (!assignmentSubmission.isGrade()) {
                        continueGrade = assignmentSubmission.getAssignmentSubmissionId();
                        break;
                    }
                }
                model.addAttribute("cGrade",continueGrade);
                model.addAttribute("totalMember", totalMember);
                model.addAttribute("totalSubmission", totalSubmission);
                return "teacher/viewAssignment";
            case "Quiz":
                List<Question> questionList = questionServices.getQuestionsByQuizId(courseModules.getCourseModuleId());
                model.addAttribute("listQuestion", questionList);
                double totalMark = questionList.stream().mapToDouble(Question::getDefaultMark).sum();
                model.addAttribute("totalMark", totalMark);
                return "teacher/viewQuiz";
            case "FileModule":
                FileModule fileModule = courseModules.getFile();
                try {
                    byte[] fileData = fileModule.getFileData();
                    // config response
                    response.setContentType("application/octet-stream");
                    response.setHeader("Content-Disposition", "attachment; filename=" + fileModule.getFileName());
                    response.setContentLength(fileData.length);
                    InputStream inputStream = new BufferedInputStream(new ByteArrayInputStream(fileData));
                    FileCopyUtils.copy(inputStream, response.getOutputStream());
                } catch (Exception x) {
                    x.printStackTrace();
                }
                break;
            case "Url":
                return "redirect://" + courseModules.getUrl().getLink();
        }
        return "404";
    }

    @GetMapping("/viewSubmission")
    public String viewSubmissionPage(Model model, @RequestParam("id") Long assignmentId) {
        List<String> classList = new ArrayList<>(List.of("bg-light-warning text-warning",
                "bg-light-danger text-danger",
                "bg-light-primary text-primary",
                "bg-light-info text-info",
                "bg-light-success text-success"));
        CourseModules courseModules = courseModulesServicesImpl.getCourseModulesByCourseModulesId(assignmentId);
        List<AssignmentSubmission> listGrade = assignmentSubmissionServices.getSubmissionByAssId(assignmentId);
        model.addAttribute("CLASS_IMG", classList);
        model.addAttribute("CourseSelected", courseModules.getCourseSections().getCourse());
        model.addAttribute("LIST_AssGrade", listGrade);
        return "teacher/viewSubmission";
    }

    @GetMapping("/addQuestion")
    public String addQuestionPage(@RequestParam("question_type") String questionType, @RequestParam("quizID") Long quizID, Model model) {
        CourseModules courseModules = courseModulesServicesImpl.getCourseModulesByCourseModulesId(quizID);
        model.addAttribute("addQuestion", true);
        model.addAttribute("courseModule", courseModules);
        model.addAttribute("question_type", questionType);
        String questionName = "";
        switch (questionType) {
            case "QuestionMultichoice":
                questionName = "Câu hỏi lựa chọn(MultiChoice)";
                break;
            case "QuestionTrueFalse":
                questionName = "Câu hỏi đúng sai(True/False)";
                break;
            case "QuestionEssay":
                questionName = "Câu hỏi bài văn(Essay)";
                break;
        }
        model.addAttribute("questionName", questionName);
        model.addAttribute("question", new Question());
        System.out.println(questionType);
        System.out.println(quizID);
        return "teacher/editQuestion";
    }

    @GetMapping("/editQuestion")
    public String editQuestionPage(@RequestParam("quizID") Long quizID, @RequestParam("id") Long questionID, Model model) {
        CourseModules courseModules = courseModulesServicesImpl.getCourseModulesByCourseModulesId(quizID);
        Question question = questionServices.getQuestionById(questionID);
        String questionType = question.getQuestionType();
        model.addAttribute("addQuestion", false);
        model.addAttribute("courseModule", courseModules);
        model.addAttribute("question_type", questionType);
        String questionName = "";
        switch (questionType) {
            case "QuestionMultichoice":
                questionName = "Câu hỏi lựa chọn(MultiChoice)";
                break;
            case "QuestionTrueFalse":
                questionName = "Câu hỏi đúng sai(True/False)";
                break;
            case "QuestionEssay":
                questionName = "Câu hỏi bài văn(Essay)";
                break;
        }
        model.addAttribute("questionName", questionName);
        model.addAttribute("question", question);
        return "teacher/editQuestion";
    }

    @GetMapping("/editQuestionLayout")
    public String editQuestionLayout(@RequestParam("quizID") Long quizID, @RequestParam("id") Long questionID, Model model) {
        CourseModules courseModules = courseModulesServicesImpl.getCourseModulesByCourseModulesId(quizID);
        Question question = questionServices.getQuestionById(questionID);
        String questionType = question.getQuestionType();
        model.addAttribute("addQuestion", false);
        model.addAttribute("courseModule", courseModules);
        model.addAttribute("question_type", questionType);
        String questionName = "";
        switch (questionType) {
            case "QuestionMultichoice":
                questionName = "Câu hỏi lựa chọn(MultiChoice)";
                break;
            case "QuestionTrueFalse":
                questionName = "Câu hỏi đúng sai(True/False)";
                break;
            case "QuestionEssay":
                questionName = "Câu hỏi bài văn(Essay)";
                break;
        }
        model.addAttribute("questionName", questionName);
        question.getAnswers();
        model.addAttribute("question", question);
        return "layout/questionChild";
    }

    @PostMapping("/addQuestion/{id}")
    public ResponseEntity<Object> addUpdateQuestion(@RequestBody QuestionMapper questionMapper, @PathVariable("id") Long quizId, Principal principal) {
        boolean result;
        Question question = questionMapper.getQuestion();
        String username = principal != null ? principal.getName() : null;
        if (username == null) return new ResponseEntity<>("Vui lòng đăng nhập", HttpStatus.BAD_REQUEST);
        Object questionType = null;
        try {
            Method method = questionMapper.getClass().getMethod("get" + question.getQuestionType());
            questionType = method.invoke(questionMapper);
            result = questionServices.addUpdateQuestion(question, quizId, questionType, username);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error Type", HttpStatus.BAD_REQUEST);
        }

        if (result) {
            return new ResponseEntity<>(" Thành công", HttpStatus.OK);
        } else {
            return new ResponseEntity<>(" Thất bại", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/deleteQuestion/{id}")
    public ResponseEntity<Object> deleteQuestion(@RequestBody Long questionId, @PathVariable("id") Long quizId) {
        try {
            quizQuestionServices.removeQuestionFromQuiz(questionId, quizId);
            questionServices.deleteQuestion(questionId);
        } catch (Exception e) {
            return new ResponseEntity<>("Xóa câu hỏi thất bại", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("Xóa câu hỏi thành công", HttpStatus.OK);
    }

    @GetMapping("/quizAttemp")
    public String viewAttempt(Model model, @RequestParam("id") Long courseId, @RequestParam("quiz") Long quizId) {
        List<User> userList = userEnrolmentsServicesImpl.getAllEnrolmentsByCourseId(courseId);
        List<Role> roleList = roleServices.getAllRoleList();
        Course course = courseServicesImpl.getCourseById(courseId);
        List<String> classList = new ArrayList<>(List.of("bg-light-warning text-warning",
                "bg-light-danger text-danger",
                "bg-light-primary text-primary",
                "bg-light-info text-info",
                "bg-light-success text-success"));
        Map<User, List<QuizAttempts>> listGrade = new HashMap<>();
        for (User user : userList) {
            List<QuizAttempts> attempts = quizAttemptsServices.getAllFinishedQuizAttempts(user.getUsername(), quizId);
            listGrade.put(user, attempts);
        }
        model.addAttribute("CLASS_IMG", classList);
        model.addAttribute("LIST_USER", listGrade);
        model.addAttribute("LIST_ROLE", roleList);
        model.addAttribute("CourseSelected", course);


        return "teacher/listGradeQuiz";
    }

    @GetMapping("/fileAssignment")
    public void downloadAssignmentFile(HttpServletResponse response, @RequestParam("id") Long assignmentId) {
        CourseModules courseModules = courseModulesServicesImpl.getCourseModulesByCourseModulesId(assignmentId);
        try {
            byte[] fileData = courseModules.getAssignment().getFileData();
            // config response
            response.setContentType("application/octet-stream");
            response.setHeader("Content-Disposition", "attachment; filename=" + courseModules.getAssignment().getFile());
            response.setContentLength(fileData.length);
            InputStream inputStream = new BufferedInputStream(new ByteArrayInputStream(fileData));
            FileCopyUtils.copy(inputStream, response.getOutputStream());
        } catch (Exception x) {
            x.printStackTrace();
        }
    }

    @GetMapping("/fileSubmitAssignment")
    public void downloadSubmitAssignmentFile(HttpServletResponse response, @RequestParam("id") Long assignmentSubmissionId) {
        AssignmentSubmission assignmentSubmission = assignmentSubmissionServices.getSubmissionById(assignmentSubmissionId);
        try {
            byte[] fileData = assignmentSubmission.getFileData();
            // config response
            response.setContentType("application/octet-stream");
            response.setHeader("Content-Disposition", "attachment; filename=" + assignmentSubmission.getFileName());
            response.setContentLength(fileData.length);
            InputStream inputStream = new BufferedInputStream(new ByteArrayInputStream(fileData));
            FileCopyUtils.copy(inputStream, response.getOutputStream());
        } catch (Exception x) {
            x.printStackTrace();
        }
    }


    @GetMapping("/grade")
    public String gradeAssignment(Model model, @RequestParam("id") Long assignmentSubmissionId, @RequestParam(name = "goto", required = false) String turn) {
        AssignmentSubmission assignmentSubmission = assignmentSubmissionServices.getSubmissionById(assignmentSubmissionId);
        CourseModules courseModules = courseModulesServicesImpl.getCourseModulesByCourseModulesId(assignmentSubmission.getAssignment().getAssignmentId());
        List<AssignmentSubmission> assignmentSubmissionList = assignmentSubmissionServices.getSubmissionByAssId(courseModules.getCourseModuleId());
        int maxElement = assignmentSubmissionList.size();
        if (turn != null) {
            for (int i = 0; i < assignmentSubmissionList.size(); i++) {
                if (assignmentSubmissionList.get(i).getAssignmentSubmissionId() == assignmentSubmissionId) {
                    int index = turn.equals("next") ? i + 1 : i - 1;
                    if(index < 0 || index >= assignmentSubmissionList.size()) index = i;
                    assignmentSubmission = assignmentSubmissionList.get(index);
                    break;
                }
            }
        }
        model.addAttribute("minP", assignmentSubmissionList.get(0).getAssignmentSubmissionId());
        model.addAttribute("maxP", assignmentSubmissionList.get(maxElement - 1).getAssignmentSubmissionId());
        model.addAttribute("courseModule", courseModules);
        model.addAttribute("submit", assignmentSubmission);
        return "teacher/gradeAssignment";
    }

    @PostMapping("/grade")
    @ResponseBody
    public ResponseEntity<Object> gradeAssignment(@RequestBody Float gradeScore, @RequestParam("id") Long assignmentSubmissionId) {
        try {
            assignmentSubmissionServices.gradeAssignmentSubmission(assignmentSubmissionId, gradeScore);
        } catch (Exception e) {
            return new ResponseEntity<>("Thất bại", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>("Chấm điểm thành công", HttpStatus.OK);
    }
}
