import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that acceps some content and adds it to the database
export const putDb = async (content) => {
console.log('put to db');

try{
const jateDB = await openDB('jate',1);
const transaction = jateDB.transaction('jate', 'readwrite');
const store = transaction.objectStore('jate');
const request = store.put({note: content});
const result = await request;
console.log('data saved to database', result);
} catch (err){
  console.error('putDb not implemented',err);

}
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
console.log('Get from db');
try{

  const jateDB = await openDB('jate',1);
  const transaction = jateDB.transaction('jate','readonly');
  const store = transaction.objectStore('jate');
  const request = store.getAll(id);
  const result = await request;
  console.log('result.value', result);
  const lastItem = result.length > 0 ? result[result.length - 1].note : null;
  return lastItem;

} catch (err){
  console.error('getDb not implemented', err);
}
}

initdb();
