/* Data synchronization flags */
export const LOCAL_SYNCRONIZED = 'L'; // Data only persisted on local device but not persisted on remote repository
export const REMOTE_SYNCRONIZED = 'R'; // Data persisted locally but generated from remote repository

export function generatePersistanceKey(remote, timestamp){
  if (remote) return REMOTE_SYNCRONIZED + ":" + timestamp 
  return LOCAL_SYNCRONIZED + ":" + timestamp;
}
