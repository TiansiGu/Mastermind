package com.Mastermind.userRecord;

import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;

@ShellComponent
//@SpringBootApplication
public class UserRecordDemoApplication {
  @Autowired
  UserRecordRepository userRecordRepository;
  @Autowired
  UserRecordController userRecordController;

  public static void main(String[] args) {
      SpringApplication.run(UserRecordDemoApplication.class, args);
  }

  @ShellMethod("Save(new userId)/Update(userId already exists) a user record to Cloud Datastore: save-record <userId> <handle>")
  public String saveOrUpdateHandle(String userId, String handle) {
     String savedRecord = this.userRecordController.saveOrUpdateHandle(new UserRecord(userId, handle));
     return savedRecord;
  }

  @ShellMethod("Loads all records")
  public String findAllRecords() {
      Iterable<UserRecord> records = this.userRecordRepository.findAll();
      return Lists.newArrayList(records).toString();
  }

  @ShellMethod("Loads records by userId: find-by-userId <userId>")
  public String findByUserId(String userId) {
     UserRecord record = this.userRecordRepository.findByUserId(userId);
     return record.toString();
  }

  @ShellMethod("Removes all records")
  public String removeAllRecords() {
      this.userRecordRepository.deleteAll();
      return "remove all success";
  }
}



