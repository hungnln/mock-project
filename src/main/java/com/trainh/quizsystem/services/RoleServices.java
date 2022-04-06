package com.trainh.quizsystem.services;

import com.trainh.quizsystem.model.Role;

import java.util.List;

public interface RoleServices {
    List<Role> getAllRoleList();
    Role findRoleByName(String roleName);
}
