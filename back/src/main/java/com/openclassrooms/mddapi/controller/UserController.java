package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.business.entity.User;
import com.openclassrooms.mddapi.common.DTO.apiRequest.LoginRequest;
import com.openclassrooms.mddapi.common.DTO.apiRequest.RegisterRequestDTO;
import com.openclassrooms.mddapi.common.DTO.apiRequest.UserUpdateRequestDTO;
import com.openclassrooms.mddapi.common.DTO.apiResponse.ApiTokenResponse;
import com.openclassrooms.mddapi.common.DTO.apiResponse.UserResponseDTO;
import com.openclassrooms.mddapi.configuration.security.JwtService;
import com.openclassrooms.mddapi.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
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
    @Tag(name = "User")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterRequestDTO registerRequestDTO) {
        userService.register(registerRequestDTO);
        return ResponseEntity.ok("User correctly saved !");
    }

    @PostMapping("user/login")
    @Tag(name = "User")
    public ResponseEntity<ApiTokenResponse> login(@Valid @RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );
        String token = jwtService.generateToken(authentication);
        return ResponseEntity.ok(new ApiTokenResponse(token));
    }

    @GetMapping("user")
    @Tag(name = "User")
    public ResponseEntity<UserResponseDTO> getUser() {
        UserResponseDTO user = userService.getUserDTOByAuthentication();
        return ResponseEntity.ok(user);
    }

    @PutMapping("user")
    @Tag(name = "User")
    public ResponseEntity<ApiTokenResponse> updateUser(@Valid @RequestBody UserUpdateRequestDTO userUpdateRequestDTO, HttpServletResponse response) {
        User oldUser = userService.getUserEntityByAuthentication();
        userService.updateUser(oldUser, userUpdateRequestDTO);

        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail(userUpdateRequestDTO.getEmail());
        loginRequest.setPassword(oldUser.getPassword());
        System.out.println(oldUser.getPassword());

        return login(loginRequest, response);
    }
}
