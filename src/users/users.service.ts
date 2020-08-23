import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
    private readonly users: User[];
  
    constructor() {
      this.users = [
        {
          userId: 1,
          username: 'john@gm.co',
          password: 'changeme', // Never actually do this. Use bcrypt. Store hashed passwords
        },
        {
          userId: 2,
          username: 'chris@gm.co',
          password: 'secret', // Never actually do this. Use bcrypt. Store hashed passwords
        },
        {
          userId: 3,
          username: 'maria@gm.co',
          password: 'guess', // Never actually do this. Use bcrypt. Store hashed passwords
        },
        {
          userId: 4,
          username: 'john',
          password: 'changeme', // Never actually do this. Use bcrypt. Store hashed passwords
        },
      ];
    }
  
    async findOne(username: string): Promise<User | undefined> {
      return this.users.find(user => user.username === username);
    }
  }