package com.Mastermind.userRecord;

import com.google.cloud.spring.data.datastore.repository.DatastoreRepository;


public interface UserRecordRepository extends DatastoreRepository<UserRecord, Long> {

  /** declare find the user's record by userId*/
  UserRecord findByUserId(String userId);

  /** declare delete the user's record by userId*/
  void deleteByUserId(String userId);

}