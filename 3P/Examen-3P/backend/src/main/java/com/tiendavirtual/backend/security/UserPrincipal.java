package com.tiendavirtual.backend.security;

import com.tiendavirtual.backend.model.Role;
import com.tiendavirtual.backend.model.User;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

// security/UserPrincipal.java
public class UserPrincipal implements UserDetails {
    // Getters para los campos
    @Getter
    private Integer id;
    @Getter
    private String name;
    private String email;
    private String password;
    @Getter
    private Role role;
    private Collection<? extends GrantedAuthority> authorities;

    // Constructor
    public UserPrincipal(Integer id, String name, String email, String password,
                         Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
    }

    public static UserPrincipal create(User user) {
        List<GrantedAuthority> authorities = Collections.singletonList(
                new SimpleGrantedAuthority(user.getRole().name())
        );
        return new UserPrincipal(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPassword(),
                authorities
        );
    }

    // Implementación de UserDetails
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() { return password; }

    @Override
    public String getUsername() { return email; }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return true; }
}