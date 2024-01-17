import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 2, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

//accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    console.log('PUT to the db');
    const jateDb = await openDB('jate', 3);
    const tx = jateDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.put({ content: content });
    const result = await request;
    console.log('Data saved to the db', result);
  } catch (err) {
    console.error('Something went wrong', err);
  }
};

// gets all the content from the database
export const getDb = async (id, content) => {
  try {
    const jateDb = await openDB('jate', 3);
    const tx = jateDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.getAll();
    const result = await request;
    console.log('result.value', result);
  } catch (err) {
    console.error('Something went wrong', err);
  }
};

initdb();