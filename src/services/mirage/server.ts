import { Server, Model, Factory, belongsTo, hasMany, Response } from 'miragejs';

import user from './routes/user';
import * as diary from './routes/diary';


export const handleErrors = (error: any, message = 'An error ocurred') => {
  return new Response(400, undefined, {
    data: {
      message,
      isError: true,
    },
  });
};

export const setupServer = (env?: string): Server => {
  return new Server({
    // ...
    routes(): void {
      this.urlPrefix = 'https://diaries.app';

      this.get('/diaries/entries/:id', diary.getEntries);
      this.get('/diaries/:id', diary.getDiaries);

      this.post('/auth/login', user.login);
      this.post('/auth/signup', user.signup);

      this.post('/diaries/', diary.create);
      this.post('/diaries/entry/:id', diary.addEntry);

      this.put('/diaries/entry/:id', diary.updateEntry);
      this.put('/diaries/:id', diary.updateDiary);
    },
  });
};