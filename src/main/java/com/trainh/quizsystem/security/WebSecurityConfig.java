package com.trainh.quizsystem.security;

import com.trainh.quizsystem.services.impl.UserServicesImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserServicesImpl userServicesImpl;

    @Bean
    public PasswordEncoder passwordEncoder(){
        return NoOpPasswordEncoder.getInstance();
    }



        @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userServicesImpl).passwordEncoder(passwordEncoder());
    }




    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().cors().disable();
        http
                .authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers("/admin/**").hasAuthority("Admin")
                .antMatchers("/teacher/**").hasAuthority("Teacher")
                .antMatchers("/student/**").hasAuthority("Student")
                .and()
                .exceptionHandling().accessDeniedPage("/403")
                .and()
                .formLogin()
                .loginPage("/login")
                .loginProcessingUrl("/loginUrl")
                .defaultSuccessUrl("/afterLogin")
                .permitAll()
                .usernameParameter("username")
                .passwordParameter("password")
                .failureUrl("/login?message=error")
                .and()
                .logout().logoutUrl("/logout").logoutSuccessUrl("/login?message=logout");
    }
}
