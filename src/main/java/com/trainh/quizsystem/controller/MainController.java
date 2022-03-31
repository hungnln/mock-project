package com.trainh.quizsystem.controller;

import com.trainh.quizsystem.model.Course;
import com.trainh.quizsystem.model.User;
import com.trainh.quizsystem.services.CourseServices;
import com.trainh.quizsystem.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.Collection;
import java.util.List;

@Controller
public class MainController {

    @Autowired
    private UserServices userServicesImpl;

    @Autowired
    private CourseServices courseServicesImpl;
    //Layout
    @GetMapping("/header")
    public String header(Model model, Principal principal){
        User user = userServicesImpl.getUserByUsername(principal.getName());
        model.addAttribute("userLogin", user);
        return "layout/header";
    }
    @GetMapping("/aside")
    public String aside(Model model, Principal principal){
        User user = userServicesImpl.getUserByUsername(principal.getName());
        model.addAttribute("userLogin", user);
//        List<Course> courseList =courseServicesImpl.getAllActiveCoursesByUsernameCourses(true, user.getUsername());
        List<Course> courseList =courseServicesImpl.getAllActiveCoursesByUsernameCourses(user.getUsername());
        System.out.println(courseList.size());
        model.addAttribute("myCourses", courseList);
        return "layout/aside";
    }


    //Page
    @GetMapping(value = {"/", "/login"})
    public String loginPage() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.isAuthenticated()) {
            return "redirect:/afterLogin";
        }
        return "login";
    }

    @GetMapping("/register")
    public String signUpPage(Principal principal) {
        if (principal != null) return "redirect:/afterLogin";
        return "register";
    }

    @GetMapping("/403")
    public String accessDenied() {
        return "403";
    }

    @RequestMapping("/afterLogin")
    public String defaultAfterLogin(HttpServletRequest request, Model model) {
        Collection<? extends GrantedAuthority> authorities;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        authorities = authentication.getAuthorities();
        String role = authorities.toArray()[0].toString();
        if ("Admin".equals(role)) return "redirect:/admin";
        if ("Teacher".equals(role)) return "redirect:/teacher";
        if ("Student".equals(role)) return "redirect:/student";
        model.addAttribute("Noti", "Bạn phải đăng nhập để tiếp tục");
        return "login";
    }
    //Rest
    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity<String> registerAccount(@RequestBody User user) {
        boolean result = userServicesImpl.registerUser(user);
        if (result) {
            return new ResponseEntity<String>("Bạn đã tạo tài khoản thành công", HttpStatus.OK);
        } else {
            return new ResponseEntity<String>("Tên tài khoản đã tồn tại", HttpStatus.BAD_REQUEST);
        }
    }

}
