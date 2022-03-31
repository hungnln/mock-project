package com.trainh.quizsystem.services;

import com.trainh.quizsystem.model.module.AssignmentSubmission;

import java.util.List;

public interface AssignmentSubmissionServices {
    AssignmentSubmission getSubmissionById(Long assignedSubmissionId);
    AssignmentSubmission getByAssignmentIdAndUsername(Long assignmentId, String username);
    List<AssignmentSubmission> getSubmissionByAssId(Long assignedSubmissionId);
    boolean addUpdateSubmission(AssignmentSubmission assignmentSubmission);
    boolean gradeAssignmentSubmission(Long assignedSubmissionId, Float gradeScore);
}
