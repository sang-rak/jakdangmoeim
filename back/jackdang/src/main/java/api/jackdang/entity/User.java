package api.jackdang.entity;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

    @Id
    @GeneratedValue
    @Column(name = "user_id")
    private Long id;
    private String username;
    private int age;
    private String password;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gathering_id")
    private Gathering gathering;
    private String authority;
    private String roles;
    public User(String username, int age, String role) {

        this(username, age, "", role);
    }

    public User(String username, int age, String password, String roles) {
        this.username = username;
        this.age = age;
        this.password = password;
        this.roles = roles;
    }


    public User(String username, int age, Gathering gathering, String roles) {
        this(username, age, "", gathering, roles); // password 초기화
    }
    public User(String username, int age, String password, Gathering gathering, String roles) { // password 파라미터 추가
        this.username = username;
        this.age = age;
        this.password = password;
        if (gathering != null) {
            changeGathering(gathering);
        }
        this.roles = roles;
    }

    public void changeGathering(Gathering gathering) {
        if (this.gathering != null) {
            this.gathering.getUsers().remove(this);
        }
        this.gathering = gathering;
        gathering.getUsers().add(this);
    }

}


