package com.trainh.quizsystem.model.module;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "wfh_file")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class FileModule implements Serializable {
    @Id
    private Long fileId;
    private String fileName;
    @Lob
    private byte[] fileData;
}
