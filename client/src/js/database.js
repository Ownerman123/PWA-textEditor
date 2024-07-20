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
const request = store.put({id: 1,  note: content});
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
  const tx = jateDB.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll(1);
  const result = await request;
  return result?.value;

} catch (err){
  console.error('getDb not implemented', err);
}
}

initdb();
