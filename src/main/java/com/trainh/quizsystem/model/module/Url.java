package com.trainh.quizsystem.model.module;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "wfh_url")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Url implements Serializable {
    @Id
    Long urlId;
    String link;
}
