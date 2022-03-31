package com.trainh.quizsystem.services.impl;

import com.trainh.quizsystem.model.User;
import com.trainh.quizsystem.model.module.*;
import com.trainh.quizsystem.repository.QuestionRepository;
import com.trainh.quizsystem.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
public class QuestionServicesImpl implements QuestionServices {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private QuizQuestionServices quizQuestionServices;

    @Autowired
    private QuizServices quizServices;

    @Autowired
    private UserServices userServices;

    @Autowired
    private QuestionAnswersServices questionAnswersServices;

    @Autowired
    private QuestionTypeServices questionTypeServices;

    private Date fixDate(Date datetime){
        if(datetime == null) return null;
        int month = datetime.getMonth() -1;
        datetime.setMonth(month);
        return datetime;
    }

    @Override
    public Question getQuestionById(Long questionId) {
        return questionRepository.findByQuestionId(questionId);
    }

    @Override
    public List<Question> getQuestionsByQuizId(Long quizId) {
        return quizQuestionServices.getAllQuestionsByQuizId(quizId);
    }

    @Transactional
    @Override
    public boolean addUpdateQuestion(Question question, Long quizId, Object questionType, String username) {
        Quiz quiz = quizServices.getQuizById(quizId);
        User user = userServices.getUserByUsername(username);
        Question questionDB;
        if(question.getQuestionId() != null){
            questionDB = questionRepository.findByQuestionId(question.getQuestionId());
            questionDB.setQuestionName(question.getQuestionName());
            questionDB.setQuestionText(question.getQuestionText());
            questionDB.setDefaultMark(question.getDefaultMark());
            questionDB.setStatus(question.isStatus());
            questionDB.setHidden(question.isHidden());
            questionDB.setCreatedBy(question.getCreatedBy());
            questionDB.setQuestionMultichoice(question.getQuestionMultichoice());
            questionDB.setQuestionTrueFalse(question.getQuestionTrueFalse());
            questionDB.setQuestionEssay(question.getQuestionEssay());
            questionDB.setTimeModified(new Date());
            questionDB.setAnswers(question.getAnswers());
            questionDB.setQuestionType(question.getQuestionType());
        }else questionDB = question;
        questionDB.setCreatedBy(user);
        System.out.println("----");
        Question afterSave = questionRepository.save(questionDB);
        if(questionDB.getAnswers() != null)
        for (QuestionAnswers answer: question.getAnswers()) {
            answer.setQuestion(questionDB);
            System.out.println(answer);
            questionAnswersServices.addAnswer(answer);
        }
        switch (afterSave.getQuestionType()){
            case "QuestionMultichoice":
                ((QuestionMultichoice)questionType).setQuestionId(afterSave.getQuestionId());
                QuestionMultichoice questionMultichoice = questionTypeServices.auQuestionMultichoice((QuestionMultichoice) questionType);
                afterSave.setQuestionMultichoice(questionMultichoice);
                break;
            case "QuestionTrueFalse":
                ((QuestionTrueFalse)questionType).setQuestionId(afterSave.getQuestionId());
                QuestionTrueFalse questionTrueFalse = questionTypeServices.auQuestionTrueFalse((QuestionTrueFalse) questionType);
                afterSave.setQuestionTrueFalse(questionTrueFalse);
                break;
            case "QuestionEssay":
                ((QuestionEssay)questionType).setQuestionId(afterSave.getQuestionId());
                QuestionEssay questionEssay = questionTypeServices.auQuestionEssay((QuestionEssay) questionType);
                afterSave.setQuestionEssay(questionEssay);
                break;
            default:
                return false;
        }
        if(questionDB.getAnswers() != null) {
            List<QuestionAnswers> listAnswers = questionAnswersServices.getAllAnswerByQuestionId(afterSave.getQuestionId());
            afterSave.setAnswers(listAnswers);
        }
        questionRepository.save(questionDB);
        quizQuestionServices.addQuestionToQuiz(afterSave,quiz);
        return true;
    }

    @Override
    public boolean deleteQuestion(Long questionId) {
        Question question = questionRepository.getById(questionId);
        question.setStatus(false);
        questionRepository.save(question);
        return true;
    }
}
