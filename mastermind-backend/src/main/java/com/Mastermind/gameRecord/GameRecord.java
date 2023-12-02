package com.Mastermind.gameRecord;
import com.google.cloud.spring.data.datastore.core.mapping.Entity;
import org.springframework.data.annotation.Id;

/**
 * Persistent Class ItemRecord
 * ItemRecord entity in the DB has 2 columns: userId and score
 */
@Entity(name = "GameRecord")
public class GameRecord {
  @Id
  Long id;

  String userId;

  int score;

  String date;

  public GameRecord(String userId, int score, String date) {
    this.userId = userId;
    this.score = score;
    this.date = date;
  }

  public long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
  	this.id=id;
  }
  
  public String getUserId() {
  	return this.userId;
  }
  
  public void setUserId(String userId) {
  	this.userId=userId;
  }
  
  public int getScore() {
  	return this.score;
  }
  
  public void setScore(int score) {
  	this.score=score;
  }

  public String getDate() {
    return this.date;
  }

  public void setDate(String date) {
    this.date=date;
  }
  

  @Override
  public String toString() {
    return "{" +
        "id:" + this.id +
        ", userId:'" + this.userId + '\'' +
        ", score:" + this.score +
        ", date:" + this.date +
        '}';
  }
}