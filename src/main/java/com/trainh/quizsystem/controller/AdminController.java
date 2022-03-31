package com.trainh.quizsystem.controller;

import com.trainh.quizsystem.model.*;
import com.trainh.quizsystem.services.RoleServices;
import com.trainh.quizsystem.services.UserServices;
import com.trainh.quizsystem.services.impl.CourseCategoryServicesImpl;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/admin")
@PropertySource("classpath:adminConfig.properties")
@Data
public class AdminController {
    @Value("${lms.admin.defaultPassword}")
    private String defaultPassword;

    @Autowired
    private UserServices userServicesImpl;

    @Autowired
    private RoleServices roleServicesImpl;
    //Init Attriute
    @ModelAttribute("userLogin")
    User userLogin(Principal principal) {
        return userServicesImpl.getUserByUsername(principal.getName());
    }
    //Page
    @GetMapping(value = {"","/"})
    public String adminPage(Model model,Principal principal){
        List<String> classList = new ArrayList<>(List.of("warning","success","danger","info"));
        User user = userServicesImpl.getUserByUsername(principal.getName());
        List<CourseCategory> courseCategoryList = courseCategoryServicesImpl.getAllCourseCategories();

        model.addAttribute("CLASS_LIST",classList);
        model.addAttribute("module","home");
        model.addAttribute("userLogin",user);
        model.addAttribute("LIST_COURSE_CATEGORY", courseCategoryList);
        return "admin/admin";
    }
    //Begin Manage Account
    @GetMapping("/userList")
    public String userListPage(Model model){
        List<User> userList = userServicesImpl.getAllUsers();
        List<Role> roleList = roleServicesImpl.getAllRoleList();
        List<String> classList = new ArrayList<>(List.of("bg-light-warning text-warning",
                "bg-light-danger text-danger",
                " bg-light-primary text-primary",
                "bg-light-info text-info",
                "bg-light-success text-success"));
        model.addAttribute("LIST_USER",userList);
        model.addAttribute("LIST_ROLE", roleList);
        model.addAttribute("CLASS_IMG", classList);
        model.addAttribute("module","userList");
        return "admin/userList";
    }

    @GetMapping("/userList/{username}")
    public String userDetailsPage(@PathVariable("username") String username, Model model){

        User user = userServicesImpl.getUserByUsername(username);
        if(user == null) return "404";
        int role = 2;
        if(user.getRole().getRoleName().equals("Teacher")) role = 1; else role = 0;
        List<Course> courseList = role == 1 ? (List<Course>) user.getListCourses() : (user.getUserEnrolments() != null ? user.getUserEnrolments().stream().map(UserEnrolments::getCourse).collect(Collectors.toList()) : null);
        Map<CourseCategory, List<Course>> courseMap = courseList != null ? new HashMap<>() : null;
        if(courseList != null)
        for (Course course: courseList) {
            if(courseMap.containsKey(course.getCourseCategory())){
                List<Course> lC = courseMap.get(course.getCourseCategory());
                lC.add(course);
                courseMap.put(course.getCourseCategory(),lC);
            }else{
                List<Course> lC = new ArrayList<>();
                lC.add(course);
                courseMap.put(course.getCourseCategory(),lC);
            }
        }
        System.out.println(courseMap);
        model.addAttribute("role",role);
        model.addAttribute("user", user);
        model.addAttribute("courseMap",courseMap);
        model.addAttribute("module","userDetails");
        return "admin/userDetails";
    }

    @GetMapping("/addUser")
    public String addUserPage(Model model){
        List<Role> roleList = roleServicesImpl.getAllRoleList();
        model.addAttribute("LIST_ROLE", roleList);
        model.addAttribute("newUser", new User());
        model.addAttribute("module","addUser");
        model.addAttribute("DEFAULT_PASS", defaultPassword);
        return "admin/addUser";
    }

    @PostMapping("/addUser")
    @ResponseBody
    public ResponseEntity<String> addUser(@RequestBody User user){
        boolean result = userServicesImpl.addUser(user);
        if(result){
            return new ResponseEntity<String>("Thêm thành viên thành công", HttpStatus.OK);
        }
        else{
            return new ResponseEntity<String>("Tên tài khoản đã tồn tại", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/deleteUser")
    @ResponseBody
    public ResponseEntity<String> addUser(@RequestBody List<String> user) throws SQLException {
        boolean result = false;
        result = userServicesImpl.deleteUserByUsername(user);
        if(result){
            return new ResponseEntity<String>("Xóa thành viên thành công", HttpStatus.OK);
        }
        else{
            return new ResponseEntity<String>("Xóa thành viên thất bại", HttpStatus.BAD_REQUEST);
        }
    }
    //End Manager Account
    //Begin Permission
    @GetMapping("/permission")
    public String permission(Model model){
        List<Role> roleList = roleServicesImpl.getAllRoleList();
        List<User> userList = userServicesImpl.getAllUsers();
        model.addAttribute("module","permission");
        model.addAttribute("LIST_USER",userList);
        model.addAttribute("LIST_ROLE", roleList);
        return "admin/permission";
    }

    @PutMapping("/permission")
    @ResponseBody
    public ResponseEntity<Object> assignRole(@RequestBody User user){
        if(userServicesImpl.changeRole(user)){
            return new ResponseEntity<Object>("Cập nhật vai trò thành công", HttpStatus.OK);
        }else{
            return new ResponseEntity<Object>("Cập nhật vai trò thất bại", HttpStatus.BAD_REQUEST);
        }
    }
    //End Permission
    //Begin Course Category
    @Autowired
    private CourseCategoryServicesImpl courseCategoryServicesImpl;

    @GetMapping("/courseCategory")
    public String courseCategoryPage(Model model){
        model.addAttribute("module","courseCategory");
        List<CourseCategory> courseCategoryList = courseCategoryServicesImpl.getAllCourseCategories();
        model.addAttribute("LIST_COURSE_CATEGORY", courseCategoryList);
        return "admin/courseCategory";
    }

    @PostMapping("/courseCategory")
    @ResponseBody
    public ResponseEntity<Object> addCourseCategory(@RequestBody CourseCategory courseCategory){
        if(courseCategoryServicesImpl.addCourseCategory(courseCategory)){
            return new ResponseEntity<Object>("Thêm danh mục khóa học thành công", HttpStatus.OK);
        }else{
            return new ResponseEntity<Object>("Thêm danh mục khóa học thất bại", HttpStatus.BAD_REQUEST);
        }

    }

    @PutMapping("/courseCategory")
    @ResponseBody
    public ResponseEntity<Object> updateCourseCategory(@RequestBody CourseCategory courseCategory){
        if(courseCategoryServicesImpl.updateCourseCategory(courseCategory)){
            return new ResponseEntity<Object>("Cập nhật danh mục khóa học thành công", HttpStatus.OK);
        }else{
            return new ResponseEntity<Object>("Cập nhật danh mục khóa học thất bại", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/courseCategory")
    @ResponseBody
    public ResponseEntity<Object> deleteCourseCategory(@RequestBody CourseCategory courseCategory){
        if(courseCategoryServicesImpl.deleteCourseCategory(courseCategory)){
            return new ResponseEntity<Object>("Bạn đã xóa danh mục khóa học thành công", HttpStatus.OK);
        }else{
            return new ResponseEntity<Object>("Bạn đã xóa danh mục khóa học thất bại", HttpStatus.BAD_REQUEST);
        }
    }
    //End CourseCategory

}
