package com.Mastermind.gameRecord;

import java.util.List;

import com.google.cloud.spring.data.datastore.repository.DatastoreRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;


public interface GameRecordRepository extends DatastoreRepository<GameRecord, Long>, PagingAndSortingRepository<GameRecord, Long> {

  List<GameRecord> findByUserId(String userId);

  List<GameRecord> findByUserId(String userId, Pageable pageable);

  void deleteByUserId(String userId);

}