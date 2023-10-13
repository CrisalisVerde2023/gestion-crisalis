package com.finnegans.gestioncrisalis.services;

import com.finnegans.gestioncrisalis.dtos.LoginDTO;
import org.springframework.http.ResponseEntity;

public interface LoginService {
    ResponseEntity<?> attempt(LoginDTO loginDTO);
}
