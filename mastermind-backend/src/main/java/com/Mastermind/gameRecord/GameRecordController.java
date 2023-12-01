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

  public GameRecordController(GameRecordRepository gameRecordRepository) {
    this.gameRecordRepository = gameRecordRepository;
  }

  @PostMapping("/game/saveRecord")
  @CrossOrigin(origins = "*")
  public String saveRecord(@RequestBody GameRecord gameRecord) {
    if (gameRecord == null) {
      return "This game record is invalid";
    }
    this.gameRecordRepository.save(gameRecord);
    return "save success";
  }

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

  @GetMapping("/game/findRecordCount")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public int findRecordCount() {
    Iterable<GameRecord> records = this.gameRecordRepository.findAll();
    List<GameRecord> recordList = new ArrayList<>();
    records.forEach(recordList::add);
    return recordList.size();
  }

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

  @GetMapping("/game/findUserIdCount")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public int findUserIdCount(@RequestParam String userId) {
    Iterable<GameRecord> records = this.gameRecordRepository.findByUserId(userId);
    List<GameRecord> recordList = new ArrayList<>();
    records.forEach(recordList::add);
    return recordList.size();
  }


  @DeleteMapping("/game/deleteByUserId")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public String deleteByUserId(@RequestParam String userId) {
    this.gameRecordRepository.deleteByUserId(userId);
    return "delete success";
  }

  @DeleteMapping("/game/deleteById")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public String deleteById(@RequestParam Long id) {
    this.gameRecordRepository.deleteById(id);
    return "delete success";
  }

}