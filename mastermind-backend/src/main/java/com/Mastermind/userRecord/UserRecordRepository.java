package com.Mastermind.userRecord;

import com.google.cloud.spring.data.datastore.repository.DatastoreRepository;


public interface UserRecordRepository extends DatastoreRepository<UserRecord, Long> {

  UserRecord findByUserId(String userId);

  void deleteByUserId(String userId);

}