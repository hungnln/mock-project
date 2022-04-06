package com.trainh.quizsystem.controller;

import com.trainh.quizsystem.model.Course;
import com.trainh.quizsystem.model.CourseModules;
import com.trainh.quizsystem.model.User;
import com.trainh.quizsystem.model.UserEnrolments;
import com.trainh.quizsystem.model.module.*;
import com.trainh.quizsystem.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.security.Principal;
import java.util.*;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/student")
public class StudentController {
    @Autowired
    private UserServices userServicesImpl;

    @Autowired
    private CourseServices courseServices;

    @Autowired
    private UserEnrolmentsServices userEnrolmentsServices;

    @Autowired
    private CourseModulesServices courseModulesServicesImpl;

    @Autowired
    private AssignmentSubmissionServices assignmentSubmissionServices;

    @Autowired
    private QuizAttemptsServices quizAttemptsServices;

    @Autowired
    private QuestionServices questionServices;

    @Autowired
    private QuestionAnswersServices questionAnswersServices;

    @Autowired
    private AttemptsAnswersServices attemptsAnswersServices;

    @Autowired
    private QuizServices quizServices;

    //Init Attriute
    @ModelAttribute("userLogin")
    User userLogin(Principal principal) {
        return userServicesImpl.getUserByUsername(principal.getName());
    }

    @ModelAttribute("myCourses")
    List<Course> getCourseActiveByUser(Principal principal) {
        User user = userServicesImpl.getUserByUsername(principal.getName());
        return user.getUserEnrolments() != null ? user.getUserEnrolments().stream().map(UserEnrolments::getCourse).collect(Collectors.toList()) : null;
    }

    @GetMapping(value = {"", "/"})
    public String studentPage(Model model, Principal principal) {
        User user = userServicesImpl.getUserByUsername(principal.getName());
        List<Course> list_AllCourse = courseServices.getAllCourses();
        List<Course> list_EnrollmentCourse = user.getUserEnrolments() != null ? user.getUserEnrolments().stream().map(UserEnrolments::getCourse).collect(Collectors.toList()) : null;
        List<Course> list_NotEnrolled = (new ArrayList<>(list_AllCourse));
        if (list_EnrollmentCourse != null) {
            for (Course course : list_EnrollmentCourse) {
                list_NotEnrolled.remove(course);
            }
        }
        model.addAttribute("module", "home");
        model.addAttribute("allC", list_AllCourse);
        model.addAttribute("enrollC", list_EnrollmentCourse);
        model.addAttribute("nEnrollC", list_NotEnrolled);
        model.addAttribute("userLogin", user);
        return "student/student";
    }

    @GetMapping("/view")
    public String viewDetail(@RequestParam("id") Long courseId, Model model, Principal principal) {
        Course course = courseServices.getCourseById(courseId);
        User user = userServicesImpl.getUserByUsername(principal.getName());
        List<Course> list_EnrollmentCourse = user.getUserEnrolments() != null ? user.getUserEnrolments().stream().map(UserEnrolments::getCourse).collect(Collectors.toList()) : null;
        boolean earlyEnrol = false;
        boolean expiredEnrol = false;
        if (course.getStartDate().getTime() - (new Date()).getTime() > 0) {
            earlyEnrol = true;
        }
        if (course.getEndDate() != null) {
            if (course.getEndDate().getTime() - (new Date()).getTime() < 0) {
                expiredEnrol = true;
            }
        }
        model.addAttribute("module", "" + courseId);
        model.addAttribute("earlyEnrol", earlyEnrol);
        model.addAttribute("expiredEnrol", expiredEnrol);
        model.addAttribute("course", course);
        if (list_EnrollmentCourse != null)
            if (list_EnrollmentCourse.contains(course)) {
                return "student/view";
            }
        return "student/enrollCourse";
    }

    @PostMapping("/enroll")
    @ResponseBody
    public ResponseEntity<Object> enrollCourse(@RequestBody UserEnrolments userEnrolments) {
        Course course = courseServices.getCourseById(userEnrolments.getCourse().getCourseId());
        User user = userServicesImpl.getUserByUsername(userEnrolments.getUser().getUsername());
        if (course.getPassword() != null) {
            if (!userEnrolments.getCourse().getPassword().equals(course.getPassword())) {
                return new ResponseEntity<>("Mật khẩu bạn nhập không đúng", HttpStatus.BAD_REQUEST);
            }
        }
        try {
            userEnrolmentsServices.addEnrolment(user.getUsername(), course.getCourseId());
        } catch (Exception e) {
            return new ResponseEntity<>("Đăng ký thất bại", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("Đăng ký thành công", HttpStatus.OK);
    }

    @GetMapping("/viewModule")
    public String viewModule(Model model, @RequestParam("id") Long courseModuleId, HttpServletResponse response, Principal principal) {
        CourseModules courseModules = courseModulesServicesImpl.getCourseModulesByCourseModulesId(courseModuleId);
        User user = userServicesImpl.getUserByUsername(principal.getName());
        model.addAttribute("courseModule", courseModules);
        switch (courseModules.getTypeName()) {
            case "Assignment":
                AssignmentSubmission assignmentSubmission = assignmentSubmissionServices.getByAssignmentIdAndUsername(courseModuleId, user.getUsername());
                Date timeRemaining = null;
                boolean submission = true;
                if (courseModules.getAssignment().getDueDate() != null)
                    if (courseModules.getAssignment().getDueDate().getTime() - (new Date()).getTime() > 0) {
                        long diff = courseModules.getAssignment().getDueDate().getTime() - (new Date()).getTime();
                        long noDay = diff / (24 * 3600 * 1000);
                        long hours = (diff % (24 * 3600 * 1000)) / 3600000;
                        long minutes = ((diff % (24 * 3600 * 1000)) % 3600000) / 60000;
                        model.addAttribute("dayR", noDay);
                        model.addAttribute("hourR", hours);
                        model.addAttribute("minuteR", minutes);
                        timeRemaining = new Date(diff);

                    } else submission = false;
                model.addAttribute("module", "" + courseModules.getCourseSections().getCourse().getCourseId());
                model.addAttribute("submission", submission);
                model.addAttribute("timeRemaining", timeRemaining);
                model.addAttribute("assignmentSubmission", assignmentSubmission);
                return "student/viewAssignment";
            case "Quiz":
                boolean earlyQuiz = false;
                boolean expiredQuiz = false;
                Quiz quiz = courseModules.getQuiz();
                if (quiz.getTimeOpen() != null)
                    if (quiz.getTimeOpen().getTime() - (new Date()).getTime() > 0) earlyQuiz = true;
                if (quiz.getTimeClose() != null)
                    if (quiz.getTimeClose().getTime() - (new Date()).getTime() < 0) expiredQuiz = true;
                List<QuizAttempts> quizAttemptsList = quizAttemptsServices.getAllFinishedQuizAttempts(principal.getName(),quiz.getQuizId());
                if(quizAttemptsList != null && quizAttemptsList.size() !=0){
                    for (QuizAttempts quizAttempt:quizAttemptsList) {
                        float totalScore = quizAttempt.getAttemptsAnswers().stream().map(AttemptsAnswers::getGrade).reduce(0f,Float::sum);
                        quizAttempt.setGradeScore(totalScore);
                    }
                    model.addAttribute("listAttempts",quizAttemptsList);
                }
                model.addAttribute("earlyQuiz", earlyQuiz);
                model.addAttribute("expiredQuiz", expiredQuiz);
                return "student/viewQuiz";
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

    @GetMapping("/submission")
    public String submissionAssignment(@RequestParam("id") Long assignmentId, Model model, Principal principal) {
        CourseModules courseModules = courseModulesServicesImpl.getCourseModulesByCourseModulesId(assignmentId);
        AssignmentSubmission assignmentSubmission = assignmentSubmissionServices.getByAssignmentIdAndUsername(assignmentId, principal.getName());

        if (courseModules.getAssignment().getDueDate() != null) {
            long timeLeft = courseModules.getAssignment().getDueDate().getTime() - (new Date()).getTime();
            model.addAttribute("timeLeft", timeLeft);
        }
        model.addAttribute("assignmentSubmission", assignmentSubmission);
        model.addAttribute("courseModule", courseModules);
        return "student/submission";
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

    @PostMapping("/submission")
    @ResponseBody
    public ResponseEntity<Object> submissionAss(@RequestBody AssignmentSubmission assignmentSubmission, Principal principal) {
        User user = userServicesImpl.getUserByUsername(principal.getName());
        CourseModules courseModules = courseModulesServicesImpl.getCourseModulesByCourseModulesId(assignmentSubmission.getAssignment().getAssignmentId());
        assignmentSubmission.setUser(user);
        assignmentSubmission.setAssignment(courseModules.getAssignment());
        try {
            assignmentSubmissionServices.addUpdateSubmission(assignmentSubmission);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Nộp bài thất bại", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>("Nộp bài thành công", HttpStatus.OK);
    }

    //Quiz
    @PostMapping("/takeQuiz")
    @ResponseBody
    public ResponseEntity<Object> takeQuiz(@RequestBody Quiz quiz, Principal principal) {
        User user = userServicesImpl.getUserByUsername(principal.getName());
        CourseModules courseModules = courseModulesServicesImpl.getCourseModulesByCourseModulesId(quiz.getQuizId());
        if (courseModules.getQuiz().getPassword() != null) {
            if (!courseModules.getQuiz().getPassword().equals(quiz.getPassword())) {
                return new ResponseEntity<>("Mật khẩu không chính xác", HttpStatus.BAD_REQUEST);
            }
        }

        QuizAttempts onProgress = quizAttemptsServices.getOnProgressAttempts(principal.getName(), courseModules.getCourseModuleId());
        boolean progress = true;
        if (onProgress != null) {
            if (onProgress.getQuiz().getTimeLimit() != null) {
                Date timeR = new Date(onProgress.getTimeStart().getTime());
                timeR.setHours(timeR.getHours() + onProgress.getQuiz().getTimeLimit().getHours());
                timeR.setMinutes(timeR.getMinutes() + onProgress.getQuiz().getTimeLimit().getMinutes());
                if (timeR.getTime() - (new Date()).getTime() <= 0) {
                    quizAttemptsServices.makeFinished(onProgress.getQuizAttemptId());
                    progress = false;
                }
            }
            if (onProgress.getQuiz().getTimeClose() != null) {
                if (onProgress.getQuiz().getTimeClose().getTime() - (new Date()).getTime() <= 0) {
                    quizAttemptsServices.makeFinished(onProgress.getQuizAttemptId());
                    System.out.println("-------");
                    progress = false;
                }
            }
            if (progress) {
                return new ResponseEntity<>("/student/takeQuiz?id=" + onProgress.getQuizAttemptId(), HttpStatus.OK);
            }
        }
        List<QuizAttempts> quizAttemptsList = quizAttemptsServices.getAllFinishedQuizAttempts(principal.getName(), courseModules.getCourseModuleId());
        if (quizAttemptsList != null) {
            if (courseModules.getQuiz().getAttempt() != 0 && quizAttemptsList.size() >= courseModules.getQuiz().getAttempt()) {
                return new ResponseEntity<>("Bạn đã hết số lần được làm lại", HttpStatus.BAD_REQUEST);
            }
        }
        List<QuizQuestion> questionList = (List<QuizQuestion>) courseModules.getQuiz().getQuizQuestion();
        if (courseModules.getQuiz().isShuffleQuestions())
            Collections.shuffle(questionList);
        List<Long> questionIds = questionList.stream().map(qq -> qq.getQuestion().getQuestionId()).collect(Collectors.toList());
        QuizAttempts quizAttempts = quizAttemptsServices.addQuizAttempts(principal.getName(), courseModules.getCourseModuleId(), questionIds);
        quizServices.makeStarted(courseModules.getQuiz().getQuizId());
        return new ResponseEntity<>("/student/takeQuiz?id=" + quizAttempts.getQuizAttemptId(), HttpStatus.OK);
    }

    @GetMapping("/takeQuiz")
    public String takeQuiz(@RequestParam("id") Long quizAttemptId, Model model, Principal principal) {
        if (quizAttemptId == null) return "404";
        QuizAttempts quizAttempts = quizAttemptsServices.getAttemptsById(quizAttemptId);
        if (quizAttempts != null) {
            CourseModules courseModules = courseModulesServicesImpl.getCourseModulesByCourseModulesId(quizAttempts.getQuiz().getQuizId());
            String listIDStr = quizAttempts.getListQuestions().substring(1, quizAttempts.getListQuestions().length() - 1);
            List<Long> listIdQues = Arrays.stream(listIDStr.split(",")).map(id -> Long.parseLong(id.trim())).collect(Collectors.toList());
            Quiz quiz = courseModules.getQuiz();
            Long timeRemaining = null;
            if (quiz.getTimeLimit() != null) {
                Date timeR = new Date(quizAttempts.getTimeStart().getTime());
                timeR.setHours(timeR.getHours() + quiz.getTimeLimit().getHours());
                timeR.setMinutes(timeR.getMinutes() + quiz.getTimeLimit().getMinutes());
                timeRemaining = timeR.getTime() - (new Date()).getTime();
            } else {
                if (quiz.getTimeClose() != null) {
                    timeRemaining = quiz.getTimeClose().getTime() - (new Date()).getTime();
                }
            }
            if (timeRemaining >= 0) {
                List<Question> questionList = null;
                if (listIdQues != null) {
                    for (Long id : listIdQues) {
                        Question q = questionServices.getQuestionById(id);
                        if (questionList == null) questionList = new ArrayList<>();
                        questionList.add(q);
                    }
                    model.addAttribute("lQuestion", questionList);
                }
            }
            model.addAttribute("module", "" + courseModules.getCourseSections().getCourse().getCourseId());
            model.addAttribute("quizAttempt", quizAttempts);
            model.addAttribute("timeLeft", timeRemaining);
            model.addAttribute("courseModule", courseModules);
        } else return "404";
        return "student/takeQuiz";
    }

    @PostMapping("/submitQuiz/{id}")
    @ResponseBody
    @Transactional
    public ResponseEntity<Object> submitQuiz(@RequestBody List<AttemptsAnswers> attemptsAnswers, @PathVariable("id") Long quizAttemptId) {
        QuizAttempts quizAttempts = quizAttemptsServices.getAttemptsById(quizAttemptId);
        for (AttemptsAnswers aans : attemptsAnswers) {
            aans.setQuizAttempts(quizAttempts);
            Question question = questionServices.getQuestionById(aans.getQuestion().getQuestionId());
            aans.setQuestion(question);
            switch (question.getQuestionType()) {
                case "QuestionMultichoice":
                    QuestionAnswers questionAnswers = questionAnswersServices.getAnswerById(aans.getQuestionAnswers().getQuestionAnswersId());
                    aans.setQuestionAnswers(questionAnswers);
                    if(questionAnswers.isCorrect()){
                       if(question.getQuestionMultichoice().isSingleAnswer())
                           aans.setGrade(question.getDefaultMark());
                       else {
                           List<QuestionAnswers> qA = (List<QuestionAnswers>) question.getAnswers().stream().filter(QuestionAnswers::isCorrect).collect(Collectors.toList());
                           aans.setGrade(question.getDefaultMark() / qA.size());
                       }
                    }
                    break;
                case "QuestionTrueFalse":
                    if(question.getQuestionTrueFalse().isSelection() == aans.isAnswerTF())
                        aans.setGrade(question.getDefaultMark());
                    break;
                case "QuestionEssay":
                    break;
            }

            attemptsAnswersServices.addUpdateAnswer(aans);
        }
        float totalScore = quizAttempts.getAttemptsAnswers().stream().map(AttemptsAnswers::getGrade).reduce(0f,Float::sum);
        quizAttempts.setGradeScore(totalScore);
        quizAttemptsServices.saveGrade(quizAttempts);
        quizAttemptsServices.makeFinished(quizAttemptId);
        return new ResponseEntity<>("Nộp bài thành công",HttpStatus.OK);
    }
}
