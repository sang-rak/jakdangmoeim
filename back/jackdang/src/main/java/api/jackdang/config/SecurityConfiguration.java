package api.jackdang.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

/**
 * spring security
 */
@Configuration
@EnableWebSecurity // Spring Security 설정 클래스
public class SecurityConfiguration {


    /*
     비밀번호 암호화
     */
    @Bean
    public BCryptPasswordEncoder encoder() {
        // 비밀번호를 DB에 저장하기 전 사용할 암호화
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
//                .antMatchers("/api/v1/admin/**").hasRole("ADMIN")
//                .antMatchers("/api/v1/user/**").hasRole("USER")
                .antMatchers("/api/**").permitAll()  // 인증절차 없이 허용 추후 /auth 만 예외로 변경
                .anyRequest().authenticated();

        return http.build();
    }

    /*
    authenticationManager 사용시 config 세팅 필요
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }



}