import PouchDB from 'pouchdb-browser';
import PouchDBAsyncStorageAdapter from 'pouchdb-adapter-asyncstorage';
import PouchDBFind from 'pouchdb-find';
import { ShoppingListFactory, ShoppingListRepositoryPouchDB } from 'ibm-shopping-list-model';

global.navigator.mimeTypes = ''; //browser-fingerprint only checks the length property so an empty string is fine
global.navigator.userAgent = 'reactnative';    

PouchDB.plugin(PouchDBAsyncStorageAdapter);
PouchDB.plugin(PouchDBFind);
const remoteDbUrl = "http://admin:pass@9.24.7.248:35984/testdb";
//const remoteDbUrl = "http://admin:pass@192.168.1.70:35984/testdb";
const remoteDb = new PouchDB(remoteDbUrl);
const db = new PouchDB('testdb', { adapter: 'asyncstorage' });
const shoppingListFactory = new ShoppingListFactory(); 
const shoppingListRepository = new ShoppingListRepositoryPouchDB(db);

export { db, remoteDb, shoppingListFactory, shoppingListRepository }