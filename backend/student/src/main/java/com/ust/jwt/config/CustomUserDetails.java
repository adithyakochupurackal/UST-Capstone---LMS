package com.ust.jwt.config;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.ust.finalproject.model.Student;
import java.util.Collection;
public class CustomUserDetails implements UserDetails {
    private String username;
    private String password;
    public CustomUserDetails(Student userCredential) {
        this.username=userCredential.getStudentName();
        this.password=userCredential.getStudentPassword();
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }
    @Override
    public String getPassword() {
        return password;
    }
    @Override
    public String getUsername() {
        return username;
    }
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    @Override
    public boolean isEnabled() {
        return true;
    }
}