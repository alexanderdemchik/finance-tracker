import { createStore, set as s, values, del as remove } from 'idb-keyval';
import { IRecord } from '../store/types';

const recordsStore = createStore('records', 'records');

export function set(record: IRecord) {
  return s(record.id, record, recordsStore);
}

export function del(id: string) {
  return remove(id, recordsStore);
}

export function getAll() {
  return values<IRecord>(recordsStore);
}
