package com.finnegans.gestioncrisalis.controllers;

import com.finnegans.gestioncrisalis.dtos.LoginDTO;
import com.finnegans.gestioncrisalis.services.LoginService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/login")
public class LoginController {
    private final LoginService loginService;
    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping
    public ResponseEntity<?> attempt(@RequestBody @Valid LoginDTO loginDTO){
        return this.loginService.attempt(loginDTO);
    }
}
