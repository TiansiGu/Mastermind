package com.Mastermind.userRecord;

import com.google.cloud.spring.data.datastore.core.mapping.Entity;
import org.springframework.data.annotation.Id;

/**
 * Persistent Class UserRecord UserRecord entity in the DB has 3 propweties: "userId", "handle","totalScore"
 */
@Entity(name = "UserRecord")
public class UserRecord {

    @Id
    Long id;

    String userId;

    String handle;
    int totalScore;

    public UserRecord(String userId, String handle, int totalScore) {
        this.userId = userId;
        this.handle = handle;
        this.totalScore = totalScore;
    }

    public long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserId() {
        return this.userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getHandle() {
        return this.handle;
    }

    public void setHandle(String handle) {
        this.handle = handle;
    }

    public int getTotalScore() {
        return this.totalScore;
    }

    public void setTotalScore(int totalScore) {
        this.totalScore = totalScore;
    }


    @Override
    public String toString() {
        return "{" +
                "id:" + this.id +
                ", userId:'" + this.userId + '\'' +
                ", handle:" + this.handle +'\'' +
                ", totalScore:" + this.totalScore +
                '}';
    }
}