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


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gatering_id")
    private Gatering gatering;

    public User(String username) {
        this(username, 0);
    }

    public User(String username, int age) {
        this(username, age, null);
    }

    public User(String username, int age, Gatering gatering) {
        this.username = username;
        this.age = age;
        if (gatering != null) {
            changeGatering(gatering);
        }
    }

    public void changeGatering (Gatering gatering){
        this.gatering = gatering;
        gatering.getUsers().add(this);
    }
}


