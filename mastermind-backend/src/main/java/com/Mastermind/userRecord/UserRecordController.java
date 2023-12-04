package com.Mastermind.userRecord;

import java.util.Map;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class UserRecordController {

    private final UserRecordRepository userRecordRepository;

    /**
     * Constructor
     * @param userRecordRepository
     */
    public UserRecordController(UserRecordRepository userRecordRepository) {
        this.userRecordRepository = userRecordRepository;
    }

    /**
     * saveOrUpdateHandle
     * @param userRecord (userId handle)
     * @return message
     */
    @PostMapping("/user/saveOrUpdateHandle")
    @CrossOrigin(origins = "*")
    public String saveOrUpdateHandle(@RequestBody UserRecord userRecord) {
        if (userRecord == null) {
            return "This user record is invalid";
        }
        String userId = userRecord.getUserId();
        UserRecord record = userRecordRepository.findByUserId(userId);
        if (record == null) {
            userRecord.setTotalScore(0);
            this.userRecordRepository.save(userRecord);
        } else {
            this.userRecordRepository.deleteByUserId(userId);
            record.setHandle(userRecord.getHandle());
            this.userRecordRepository.save(record);
        }
        return "save/update success";
    }

    /**
     * findAllRecords
     * @return all the records (JSON by url)
     */
    @GetMapping("/user/findAllRecords")
    @ResponseBody
    @CrossOrigin(origins = "*")
    public List<UserRecord> findAllRecords() {
        Iterable<UserRecord> records = this.userRecordRepository.findAll();
        List<UserRecord> recordList = new ArrayList<>();
        records.forEach(recordList::add);
        return recordList;
    }

    /**
     * find the records By UserId
     * @param userId
     * @return record (JSON by url)
     */
    @GetMapping("/user/findByUserId")
    @ResponseBody
    @CrossOrigin(origins = "*")
    public UserRecord findByUserId(@RequestParam String userId) {
        UserRecord record = this.userRecordRepository.findByUserId(userId);
        return record;
    }

    /**
     * saveOrUpdateTotalScore
     * @param requestBody (userId score)
     * @return message
     */
    @PostMapping("/user/saveOrUpdateTotalScore")
    @CrossOrigin(origins = "*")
    public String saveOrUpdateTotalScore(@RequestBody Map<String, Object> requestBody) {
        String userId = (String) requestBody.get("userId");
        int score = (int) requestBody.get("score");
        UserRecord record = userRecordRepository.findByUserId(userId);
        if (record == null) {
            return "no such userRecord";
        } else {
            record.setTotalScore(record.getTotalScore() + score);
            this.userRecordRepository.save(record);
        }
        return "save/update score success";
    }

}