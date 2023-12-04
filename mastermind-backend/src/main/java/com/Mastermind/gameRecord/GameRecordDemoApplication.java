package com.Mastermind.gameRecord;

import java.util.List;

import com.google.common.collect.Lists;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;

@ShellComponent
//@SpringBootApplication
public class GameRecordDemoApplication {
  @Autowired
  GameRecordRepository gameRecordRepository;

  public static void main(String[] args) {
     SpringApplication.run(GameRecordDemoApplication.class, args);
  }

    /**
     * Shell test method corresponding to "/game/saveRecord"
     * @param userId
     * @param score
     * @param date
     * @return the saved game record
     */
  @ShellMethod("Saves a game record to Cloud Datastore: save-record <userId> <score> <MM/DD/YY>")
  public String saveRecord(String userId, int score, String date) {
      GameRecord savedRecord = this.gameRecordRepository.save(new GameRecord(userId, score, date));
      return savedRecord.toString();
  }

    /**
     * Shell test method corresponding to "/game/findAllRecords"
     * @param page
     * @param size
     * @return all the fetched game records (in the page you want with a specific count)
     */
  @ShellMethod("Loads all records: find-all-game-records <page> <size> (page begins at 0)")
  public String findAllGameRecords(int page, int size) {
      Pageable pageable = PageRequest.of(page, size, Sort.by("score").descending()); //pagination and sorting
      Iterable<GameRecord> records = this.gameRecordRepository.findAll(pageable);
      return Lists.newArrayList(records).toString();
  }

    /**
     * Shell test method corresponding to "/game/findRecordCount"
     * @return the number of all the game records
     */
  @ShellMethod("find the total number of records: find-Record-Count")
  public int findRecordCount() {
      Iterable<GameRecord> records = this.gameRecordRepository.findAll();
      return Lists.newArrayList(records).size();
  }

    /**
     * Shell test method corresponding to "/game/findByUserId"
     * @param userId
     * @param page
     * @param size
     * @return fetched game records of a user (specific page and size)
     */
  @ShellMethod("Loads records by userId: find-by-userId <userId> <page> <size>")
  public String findGameRecordsByUserId(String userId, int page, int size) {
      Pageable pageable = PageRequest.of(page, size, Sort.by("score").descending());
      List<GameRecord> records = this.gameRecordRepository.findByUserId(userId, pageable);
      return records.toString();
  }

    /**
     * Shell test method corresponding to "/game/findUserIdCount"
     * @param userId
     * @return the total number of the game records of a specific user
     */
  @ShellMethod("Loads records by userId: find-by-userId <userId> <page> <size>")
  public int findUserIdCount(String userId) {
      List<GameRecord> records = this.gameRecordRepository.findByUserId(userId);
      return records.size();
  }

    /**
     * Shell method of delete all game records
     * @return a message
     */
  @ShellMethod("Removes all records")
  public String removeAllRecords() {
      this.gameRecordRepository.deleteAll();
      return "remove all success";
  }

    /**
     * Shell test method corresponding to "/game/deleteByUserId"
     * @param userId
     * @return a delete message
     */
  @ShellMethod("Removes records by userId: <userId>")
  public String removeByUserId(String userId) {
      this.gameRecordRepository.deleteByUserId(userId);
      return "remove by user id success";
  }

    /**
     * Shell test method corresponding to "/game/deleteById"
     * @param id
     * @return a delete message
     */
  @ShellMethod("Removes records by Id: <Id>")
  public String removeById(Long id) {
      this.gameRecordRepository.deleteById(id);
      return "remove by id success";
  }
}



