package com.trainh.quizsystem.services;

import com.trainh.quizsystem.model.User;

import java.sql.SQLException;
import java.util.List;

public interface UserServices {
    boolean registerUser(User user);
    boolean addUser(User user);
    List<User> getAllUsers();
    User getUserByUsername(String username);
    boolean deleteUserByUsername(List<String> usernames);
    boolean changeRole(User user);
    boolean deactivateListUsers(List<String> usernames) throws SQLException;
    List<User> listAddCourses(List<User> list);

    List<User> getUserByLikeUsername(String search);

}
