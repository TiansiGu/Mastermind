package com.Mastermind.gameRecord;

import java.util.List;

import com.google.cloud.spring.data.datastore.repository.DatastoreRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;


public interface GameRecordRepository extends DatastoreRepository<GameRecord, Long>, PagingAndSortingRepository<GameRecord, Long> {
  /** declare find game records by userId*/
  List<GameRecord> findByUserId(String userId);

  /** declare find the game records in a specific page by userId*/
  List<GameRecord> findByUserId(String userId, Pageable pageable);

  /** declare delete game records by userId*/
  void deleteByUserId(String userId);

}