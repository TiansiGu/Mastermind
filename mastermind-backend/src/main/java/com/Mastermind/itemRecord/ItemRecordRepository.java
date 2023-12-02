package com.Mastermind.itemRecord;

import com.Mastermind.gameRecord.GameRecord;
import com.google.cloud.spring.data.datastore.repository.DatastoreRepository;
import java.util.List;


public interface ItemRecordRepository extends DatastoreRepository<ItemRecord, Long> {
  List<ItemRecord> findById(long Id);

}