package com.Mastermind.itemRecord;

import com.google.common.collect.Lists;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;

@ShellComponent
//@SpringBootApplication
public class ItemRecordDemoApplication {

    @Autowired
    ItemRecordRepository itemRecordRepository;

    public static void main(String[] args) {
        SpringApplication.run(ItemRecordDemoApplication.class, args);
    }

    /**
     * Shell test method corresponding to "/item/saveRecord"
     * @param category
     * @param item
     * @param price
     * @param stock
     * @return the saved item record
     */
    @ShellMethod("Saves a item record to Cloud Datastore: save-record <category> <item> <price> <stock>")
    public String saveItem(String category, String item, int price, int stock) {
        ItemRecord savedRecord = this.itemRecordRepository.save(
                new ItemRecord(category, item, price, stock));
        return savedRecord.toString();
    }

    /**
     * Shell test method corresponding to "/item/findAllItemRecords"
     * @return all the fetched items
     */
    @ShellMethod("Loads all records: find-all-item-records")
    public String findAllItemRecords() {
        Iterable<ItemRecord> records = this.itemRecordRepository.findAll();
        return Lists.newArrayList(records).toString();
    }

    /**
     * Shell test method corresponding to "/item/buyById"
     * @param id
     * @return a message
     */
    @ShellMethod("Buy 1 item and update the record: buy-by-Id <id>")
    public String buyById(long id) {
        List<ItemRecord> existingRecord = this.itemRecordRepository.findById(id);
        if (!existingRecord.isEmpty()) {
            ItemRecord record = existingRecord.get(0);
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



