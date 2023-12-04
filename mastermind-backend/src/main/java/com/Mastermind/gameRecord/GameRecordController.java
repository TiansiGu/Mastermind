package com.Mastermind.gameRecord;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

@RestController
public class GameRecordController {
  private final GameRecordRepository gameRecordRepository;

  /**
   * Constructor
   * @param gameRecordRepository
   */
  public GameRecordController(GameRecordRepository gameRecordRepository) {
    this.gameRecordRepository = gameRecordRepository;
  }

  /**
   * saveOrUpdateHandle
   * @param gameRecord (userId score date)
   * @return message
   */
  @PostMapping("/game/saveRecord")
  @CrossOrigin(origins = "*")
  public String saveRecord(@RequestBody GameRecord gameRecord) {
    if (gameRecord == null) {
      return "This game record is invalid";
    }
    this.gameRecordRepository.save(gameRecord);
    return "save success";
  }

  /**
   * findAllRecords
   * @param page,size
   * @return the records in a particular page with a particular number of records in a page (JSON by url)
   */
  @GetMapping("/game/findAllRecords")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public List<GameRecord> findAllRecords(int page, int size) {
    Pageable pageable = PageRequest.of(page, size, Sort.by("score").descending());
  	Iterable<GameRecord> records = this.gameRecordRepository.findAll(pageable);
    List<GameRecord> recordList = new ArrayList<>();
    records.forEach(recordList::add);
    return recordList;
  }

  /**
   * findRecordCount
   * @return the total number of all game records in DB (JSON by url)
   */
  @GetMapping("/game/findRecordCount")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public int findRecordCount() {
    Iterable<GameRecord> records = this.gameRecordRepository.findAll();
    List<GameRecord> recordList = new ArrayList<>();
    records.forEach(recordList::add);
    return recordList.size();
  }

  /**
   * findByUserId
   * @param userId
   * @param page
   * @param size
   * @return the records of a specific user in a particular page with a particular number of records in a page (JSON by url)
   */
  @GetMapping("/game/findByUserId")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public List<GameRecord> findByUserId(@RequestParam String userId, int page, int size) {
    Pageable pageable = PageRequest.of(page, size, Sort.by("score").descending());
    Iterable<GameRecord> records = this.gameRecordRepository.findByUserId(userId, pageable);
    List<GameRecord> recordList = new ArrayList<>();
    records.forEach(recordList::add);
    return recordList;
  }

  /**
   * findUserIdCount
   * @return the total number of the game records of a specific user (JSON by url)
   */
  @GetMapping("/game/findUserIdCount")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public int findUserIdCount(@RequestParam String userId) {
    Iterable<GameRecord> records = this.gameRecordRepository.findByUserId(userId);
    List<GameRecord> recordList = new ArrayList<>();
    records.forEach(recordList::add);
    return recordList.size();
  }

  /**
   * Delete the game records of a user in DB
   * @param userId
   * @return a delete message
   */
  @DeleteMapping("/game/deleteByUserId")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public String deleteByUserId(@RequestParam String userId) {
    this.gameRecordRepository.deleteByUserId(userId);
    return "delete success";
  }

  /**
   * Delete a game record identified by its id
   * @param id
   * @return a delete message
   */
  @DeleteMapping("/game/deleteById")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public String deleteById(@RequestParam Long id) {
    this.gameRecordRepository.deleteById(id);
    return "delete success";
  }

}