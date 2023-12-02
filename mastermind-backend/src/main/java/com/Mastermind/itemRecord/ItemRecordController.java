package com.Mastermind.itemRecord;

import java.util.ArrayList;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
public class ItemRecordController {
  private final ItemRecordRepository itemRecordRepository;

  public ItemRecordController(ItemRecordRepository itemRecordRepository) {
    this.itemRecordRepository = itemRecordRepository;
  }

  /**
   * save item record
   * @param itemRecord
   * @return message
   */
  @PostMapping("/item/saveRecord")
  @CrossOrigin(origins = "*")
  public String saveRecord(@RequestBody ItemRecord itemRecord) {
    if (itemRecord == null) {
      return "This item record is invalid";
    }
    this.itemRecordRepository.save(itemRecord);
    return "save success";
  }


  /**
   * find findAllItemRecords
   *
   * @return JSON all ItemRecords
   */
  @GetMapping("/item/findAllItemRecords")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public List<ItemRecord> findAllItemRecords() {
    Iterable<ItemRecord> books = this.itemRecordRepository.findAll();
    List<ItemRecord> userRecordList = new ArrayList<>();
    books.forEach(userRecordList::add);
    return userRecordList;
  }

  /**
   * buy 1 item and update the record
   * @param id
   * @return message
   */
  @GetMapping("/item/buyById")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public String buyById(@RequestParam long id) {
    //find the record by id
    List<ItemRecord> exitingRecord = this.itemRecordRepository.findById(id);
    if (!exitingRecord.isEmpty()) {
      ItemRecord record = exitingRecord.get(0);
      // stock -1 if stock >0
      if (record.getStock() > 0) {
        record.setStock(record.getStock() - 1);
        this.itemRecordRepository.save(record);
        return "buy 1 successfully";
      } else {
        return "no stock";
      }
    } else {
      return "no such item ";
    }
  }
}