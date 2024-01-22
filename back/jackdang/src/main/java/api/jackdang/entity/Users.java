package api.jackdang.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Users {

    @Id
    @GeneratedValue
    @Column(name = "users_id")
    private Long id;
    private String username;
    private String nickname;
    private String phone;
    private String password;
    private String gender;
    private String birthday;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gathering_id")
    private Gathering gathering;
    private String authority;
    private String roles;

    public Users(String username, String nickname, String phone, String password, String gender, String birthday) {
        this.username = username;
        this.nickname = nickname;
        this.phone = phone;
        this.gender = gender;
        this.password = password;
        this.birthday = birthday;
    }


    public Users(String username, String birthday, Gathering gathering, String roles) {
        this(username, birthday, "", gathering, roles); // password 초기화
    }
    public Users(String username, String birthday, String password, Gathering gathering, String roles) { // password 파라미터 추가
        this.username = username;
        this.birthday = birthday;
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

    // ENUM으로 안하고 ,로 해서 구분해서 ROLE을 입력
    public List<String> getRoleList(){
        if(this.roles.length() > 0){
            return Arrays.asList(this.roles.split(","));
        }
        return new ArrayList<>();
    }

}


