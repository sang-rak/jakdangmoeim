package api.jackdang.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QGathering is a Querydsl query type for Gathering
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QGathering extends EntityPathBase<Gathering> {

    private static final long serialVersionUID = 1441215041L;

    public static final QGathering gathering = new QGathering("gathering");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath name = createString("name");

    public final ListPath<User, QUser> users = this.<User, QUser>createList("users", User.class, QUser.class, PathInits.DIRECT2);

    public QGathering(String variable) {
        super(Gathering.class, forVariable(variable));
    }

    public QGathering(Path<? extends Gathering> path) {
        super(path.getType(), path.getMetadata());
    }

    public QGathering(PathMetadata metadata) {
        super(Gathering.class, metadata);
    }

}

