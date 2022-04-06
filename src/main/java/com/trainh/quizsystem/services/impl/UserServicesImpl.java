package com.trainh.quizsystem.services.impl;

import com.trainh.quizsystem.model.CustomUserDetails;
import com.trainh.quizsystem.model.Role;
import com.trainh.quizsystem.model.User;
import com.trainh.quizsystem.repository.CourseRepository;
import com.trainh.quizsystem.repository.RoleRepository;
import com.trainh.quizsystem.repository.UserRepository;
import com.trainh.quizsystem.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServicesImpl implements UserDetailsService, UserServices {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private CourseRepository courseRepository;

    private static final String STUDENT_ROLE_NAME = "Student";

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) throw new UsernameNotFoundException(username);
        return new CustomUserDetails(user);
    }

    public boolean registerUser(User user) {
        User userDB = userRepository.findByUsername(user.getUsername());
        if (userDB != null)
            return false;
        else {
            Role studentRole = roleRepository.findByRoleName(STUDENT_ROLE_NAME);
            user.setRole(studentRole);
            userRepository.save(user);
            return true;
        }
    }

    public boolean addUser(User user) {
        User userDB = userRepository.findByUsername(user.getUsername());
        if (userDB != null)
            return false;
        else {
            Role studentRole = roleRepository.findByRoleName(user.getRole().getRoleName());
            user.setRole(studentRole);
            userRepository.save(user);
            return true;
        }
    }

    public List<User> getAllUsers() {
        return userRepository.findAllByStatusTrue();
    }

    public User getUserByUsername(String username) {

        return userRepository.findByUsername(username);
    }

    public boolean deleteUserByUsername(List<String> usernames) {
        for (String username: usernames) {
            User user = userRepository.findByUsername(username);
            if (user == null) return false;
            user.setStatus(false);
            userRepository.save(user);
        }
        return true;
    }

    public boolean deactivateListUsers(List<String> usernames) throws SQLException {
        boolean result = false;

           for (String username : usernames) {
               User user = userRepository.findByUsername(username);
               if (user == null)
                 result = false;
               user.setStatus(false);
               userRepository.save(user);
               result = true;
           }
        return result;
    }

    @Override
    public List<User> listAddCourses(List<User> list) {
        List<String> uNotIn = list != null ? list.stream().map(User::getUsername).collect(Collectors.toList()) : null;
        List<User> listAddCourse = userRepository.findAllByRole_RoleName("Student");
        if(uNotIn != null)
        if(listAddCourse != null)
            listAddCourse.removeIf(user -> uNotIn.contains(user.getUsername()));
        return listAddCourse;
    }

    @Override
    public List<User> getUserByLikeUsername(String search) {

        return userRepository.findByUsernameLike(search);
    }

    public boolean changeRole(User user){
        Role role = roleRepository.findByRoleName(user.getRole().getRoleName());
        User userDB = userRepository.findByUsername(user.getUsername());
        userDB.setRole(role);
        userRepository.save(userDB);
        return true;
    }
}
