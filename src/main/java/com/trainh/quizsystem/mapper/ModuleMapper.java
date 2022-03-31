package com.trainh.quizsystem.mapper;

import com.trainh.quizsystem.model.CourseModules;
import com.trainh.quizsystem.model.module.Assignment;
import com.trainh.quizsystem.model.module.FileModule;
import com.trainh.quizsystem.model.module.Quiz;
import com.trainh.quizsystem.model.module.Url;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

@Data
@AllArgsConstructor
public class ModuleMapper implements Serializable {
    private CourseModules courseModules;
    private Assignment assignment;
    private Quiz quiz;
    private FileModule fileModule;
    private Url url;
}
