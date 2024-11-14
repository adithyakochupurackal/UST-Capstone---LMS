package com.ust.finalproject.service;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    // This method should interact with a database or another service to fetch user data
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Example user for demo purposes (use actual user data from your database)
        if ("user".equals(username)) {
            return User.builder()
                    .username("user")
                    .password("{bcrypt}$2a$10$XJQh3K8BhHL1MB7KvBPkru4Xy3cFQgndEXbUyOrhEu5Gp8szB66fK") // bcrypt-encrypted password
                    .roles("USER")
                    .build();
        } else {
            throw new UsernameNotFoundException("User not found");
        }
    }
}
