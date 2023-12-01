package com.Mastermind.userRecord;

import com.google.cloud.spring.data.datastore.core.mapping.Entity;
import org.springframework.data.annotation.Id;

/**
 * Persistent Class UserRecord
 * UserRecord entity in the DB has 2 columns: "userId", "handle"
 */
@Entity(name = "UserRecord")
public class UserRecord {
  @Id
  Long id;

  String userId;

  String handle;

  public UserRecord(String userId, String handle) {
    this.userId = userId;
    this.handle = handle;
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
  
  public String getHandle() {
  	return this.handle;
  }
  
  public void setHandle(String handle) {
  	this.handle=handle;
  }
  

  @Override
  public String toString() {
    return "{" +
        "id:" + this.id +
        ", userId:'" + this.userId + '\'' +
        ", handle:" + this.handle +
        '}';
  }
}