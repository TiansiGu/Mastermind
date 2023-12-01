package com.Mastermind.userRecord;

import com.Mastermind.gameRecord.GameRecord;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class UserRecordController {
  private final UserRecordRepository userRecordRepository;

  public UserRecordController(UserRecordRepository userRecordRepository) {
    this.userRecordRepository = userRecordRepository;
  }

  @PostMapping("/user/saveOrUpdateHandle")
  @CrossOrigin(origins = "*")
  public String saveOrUpdateHandle(@RequestBody UserRecord userRecord) {
    if (userRecord == null) {
      return "This user record is invalid";
    }
    String userId = userRecord.getUserId();
    UserRecord record = userRecordRepository.findByUserId(userId);
    if (record == null) {
      this.userRecordRepository.save(userRecord);
    } else {
      this.userRecordRepository.deleteByUserId(userId);
      record.setHandle(userRecord.getHandle());
      this.userRecordRepository.save(record);
    }
    return "save/update success";
  }

  @GetMapping("/user/findAllRecords")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public List<UserRecord> findAllRecords() {
    Iterable<UserRecord> records = this.userRecordRepository.findAll();
    List<UserRecord> recordList = new ArrayList<>();
    records.forEach(recordList::add);
    return recordList;
  }

  @GetMapping("/user/findByUserId")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public UserRecord findByUserId(@RequestParam String userId) {
    UserRecord record = this.userRecordRepository.findByUserId(userId);
    return record;
  }

}