package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.common.DTO.apiRequest.LoginRequest;
import com.openclassrooms.mddapi.common.DTO.apiRequest.UserRequestDTO;
import com.openclassrooms.mddapi.common.DTO.apiResponse.ApiTokenResponse;
import com.openclassrooms.mddapi.common.DTO.apiResponse.UserResponseDTO;
import com.openclassrooms.mddapi.configuration.security.JwtService;
import com.openclassrooms.mddapi.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    private final UserService userService;

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;

    public UserController(UserService userService, AuthenticationManager authenticationManager, JwtService jwtService) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @PostMapping("user/register")
    public ResponseEntity<String> register(@Valid @RequestBody UserRequestDTO userRequestDTO) {
        userService.register(userRequestDTO);
        return ResponseEntity.ok("User correctly saved !");
    }

    @PostMapping("user/login")
    public ResponseEntity<ApiTokenResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );
        String token = jwtService.generateToken(authentication);
        return ResponseEntity.ok(new ApiTokenResponse(token));
    }

    @GetMapping("user/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long id) {
        UserResponseDTO user = userService.findUserById(id);
        return ResponseEntity.ok(user);
    }
}
