package api.jackdang.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(of = {"id", "username", "age"}) // 무한루프 위험성으로 조인이 없는것만 ToString 추가
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

    public User(String username, int age) {

        this(username, age, "");
    }

    public User(String username, int age, String password) {
        this.username = username;
        this.age = age;
        this.password = password;
    }


    public User(String username, int age, Gathering gathering) {
        this(username, age, "", gathering); // password 초기화
    }
    public User(String username, int age, String password, Gathering gathering) { // password 파라미터 추가
        this.username = username;
        this.age = age;
        this.password = password;
        if (gathering != null) {
            changeGathering(gathering);
        }
    }

    public void changeGathering(Gathering gathering) {
        if (this.gathering != null) {
            this.gathering.getUsers().remove(this);
        }
        this.gathering = gathering;
        gathering.getUsers().add(this);
    }
}


