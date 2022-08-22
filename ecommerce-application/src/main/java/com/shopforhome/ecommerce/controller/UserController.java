package com.shopforhome.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shopforhome.ecommerce.dto.ResponseDto;
import com.shopforhome.ecommerce.dto.user.SignInDto;
import com.shopforhome.ecommerce.dto.user.SignInReponseDto;
import com.shopforhome.ecommerce.dto.user.SignupDto;
import com.shopforhome.ecommerce.model.User;
import com.shopforhome.ecommerce.repository.UserRepository;
import com.shopforhome.ecommerce.service.UserService;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("user")
@RestController
public class UserController {

	 @Autowired
	    UserRepository userRepository;
	
    @Autowired
    UserService userService;

    // two apis

    // signup

    @PostMapping("/signup")
    public ResponseDto signup(@RequestBody SignupDto signupDto) {
        return userService.signUp(signupDto);
    }


    // signin

    @PostMapping("/signin")
    public SignInReponseDto signIn(@RequestBody SignInDto signInDto) {
        return userService.signIn(signInDto);
    }
    
    @GetMapping("/get")
	public List<User> getUsers() {
		return userService.getUser();
	}
    
	@DeleteMapping("/user/{id}")
	public void deleteUser(@PathVariable("id") int id) {
		userService.deleteUser(id);
	}

}
