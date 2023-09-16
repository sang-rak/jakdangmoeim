package api.jackdang.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

@Data
@NoArgsConstructor
public class LoginForm {

    private String username;
    private String password;

    public Authentication toAuthentication() {
        return new UsernamePasswordAuthenticationToken(username, password);
    }
}
