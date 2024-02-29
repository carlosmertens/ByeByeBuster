import debug from 'debug';

// app spacename
// to enable, use terminal
// $export DEBUG=app:*
// or $export DEBUG=app:server,app:http
const server = debug('app:server');
const db = debug('app:db');
const http = debug('app:http');
const error = debug('app:error');

export const log = { server, db, http, error };
