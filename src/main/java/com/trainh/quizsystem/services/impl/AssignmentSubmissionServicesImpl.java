package com.trainh.quizsystem.services.impl;

import com.trainh.quizsystem.model.module.AssignmentSubmission;
import com.trainh.quizsystem.repository.AssignmentSubmissionRepository;
import com.trainh.quizsystem.services.AssignmentSubmissionServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class AssignmentSubmissionServicesImpl implements AssignmentSubmissionServices {

    @Autowired
    private AssignmentSubmissionRepository assignmentSubmissionRepository;

    @Override
    public AssignmentSubmission getSubmissionById(Long assignedSubmissionId) {
        return assignmentSubmissionRepository.findByAssignmentSubmissionId(assignedSubmissionId);
    }

    @Override
    public AssignmentSubmission getByAssignmentIdAndUsername(Long assignmentId, String username) {
        return assignmentSubmissionRepository.findByAssignment_AssignmentIdAndUser_Username(assignmentId,username);
    }

    @Override
    public List<AssignmentSubmission> getSubmissionByAssId(Long assignmentId) {
        return assignmentSubmissionRepository.findAllByAssignment_AssignmentId(assignmentId);
    }

    @Override
    public boolean addUpdateSubmission(AssignmentSubmission assignmentSubmission) {
        AssignmentSubmission assignmentSubmissionDB;
        if(assignmentSubmission.getAssignmentSubmissionId() != null){
            assignmentSubmissionDB = assignmentSubmissionRepository.findByAssignmentSubmissionId(assignmentSubmission.getAssignmentSubmissionId());
            assignmentSubmissionDB.setTimeModified(new Date());
            assignmentSubmissionDB.setAssignment(assignmentSubmission.getAssignment());
            assignmentSubmissionDB.setUser(assignmentSubmission.getUser());
            if(assignmentSubmission.getFileName()!= null)
            assignmentSubmissionDB.setFileName(assignmentSubmission.getFileName());
            if(assignmentSubmission.getFileData() !=null)
            assignmentSubmissionDB.setFileData(assignmentSubmission.getFileData());

            assignmentSubmissionDB.setText(assignmentSubmission.getText());
            assignmentSubmissionDB.setGrade(false);
        }else assignmentSubmissionDB = assignmentSubmission;
        assignmentSubmissionRepository.save(assignmentSubmissionDB);
        return true;
    }

    @Override
    public boolean gradeAssignmentSubmission(Long assignedSubmissionId, Float gradeScore) {
        AssignmentSubmission assignmentSubmission = assignmentSubmissionRepository.findByAssignmentSubmissionId(assignedSubmissionId);
        assignmentSubmission.setGradeScore(gradeScore);
        assignmentSubmission.setGrade(true);
        assignmentSubmissionRepository.save(assignmentSubmission);
        return true;
    }
}
