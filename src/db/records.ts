import { createStore, set, values } from 'idb-keyval';
import { IRecord } from '../store/types';

const recordsStore = createStore('records', 'records');

export function add(record: IRecord) {
  return set(record.id, record, recordsStore);
}

export function getAll() {
  return values<IRecord>(recordsStore);
}
