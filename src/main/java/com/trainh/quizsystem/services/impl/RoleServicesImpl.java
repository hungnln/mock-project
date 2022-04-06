package com.trainh.quizsystem.services.impl;

import com.trainh.quizsystem.model.Role;
import com.trainh.quizsystem.repository.RoleRepository;
import com.trainh.quizsystem.services.RoleServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServicesImpl implements RoleServices {
    @Autowired
    private RoleRepository roleRepository;

    public List<Role> getAllRoleList(){
        return roleRepository.findAll();
    }
    public Role findRoleByName(String roleName){ return  roleRepository.findByRoleName(roleName);}
}
