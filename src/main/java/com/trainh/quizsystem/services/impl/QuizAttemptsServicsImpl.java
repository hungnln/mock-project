package com.trainh.quizsystem.services.impl;

import com.trainh.quizsystem.model.CourseModules;
import com.trainh.quizsystem.model.User;
import com.trainh.quizsystem.model.module.QuizAttempts;
import com.trainh.quizsystem.repository.QuizAttemptsRepository;
import com.trainh.quizsystem.services.CourseModulesServices;
import com.trainh.quizsystem.services.QuizAttemptsServices;
import com.trainh.quizsystem.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class QuizAttemptsServicsImpl implements QuizAttemptsServices {

    @Autowired
    private QuizAttemptsRepository quizAttemptsRepository;

    @Autowired
    private UserServices userServices;

    @Autowired
    private CourseModulesServices courseModulesServices;

    @Override
    public QuizAttempts getAttemptsById(Long quizAttemptId) {
        return quizAttemptsRepository.findByQuizAttemptId(quizAttemptId);
    }

    @Override
    public QuizAttempts getOnProgressAttempts(String username, Long quizId) {
        return quizAttemptsRepository.findByUser_UsernameAndQuiz_QuizIdAndFinishedIsFalse(username,quizId);
    }

    @Override
    public List<QuizAttempts> getAllQuizAttempts(String username, Long quizId) {
        return quizAttemptsRepository.findAllByUser_UsernameAndQuiz_QuizId(username, quizId);
    }

    @Override
    public List<QuizAttempts> getAllFinishedQuizAttempts(String username, Long quizId) {
        return quizAttemptsRepository.findAllByUser_UsernameAndQuiz_QuizIdAndFinishedIsTrue(username,quizId);
    }

    @Override
    public QuizAttempts addQuizAttempts(String username, Long quizId, List<Long> listQuestionsID) {
        User user = userServices.getUserByUsername(username);
        CourseModules courseModules = courseModulesServices.getCourseModulesByCourseModulesId(quizId);
        QuizAttempts quizAttempts = QuizAttempts.builder()
                .quiz(courseModules.getQuiz())
                .user(user)
                .timeStart(new Date())
                .finished(false)
                .listQuestions(listQuestionsID.toString())
                .build();

      return  quizAttemptsRepository.save(quizAttempts);

    }

    @Override
    public boolean makeFinished(Long quizAttemptId) {
        QuizAttempts quizAttempts = quizAttemptsRepository.findByQuizAttemptId(quizAttemptId);
        quizAttempts.setFinished(true);
        quizAttempts.setTimeFinish(new Date());
        quizAttemptsRepository.save(quizAttempts);
        return true;
    }

    public boolean saveGrade(QuizAttempts quizAttempts){
        quizAttemptsRepository.save(quizAttempts);
        return true;
    }
}
