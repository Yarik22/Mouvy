import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { DatabaseService } from 'src/database/database.service';
import { Observable, from } from 'rxjs';

@Injectable()
export class UserService extends DatabaseService<User> {
  constructor(
    @InjectRepository(User)
    protected readonly repository: Repository<User>,
  ) {
    super(repository);
  }
  getUserByEmail(email: string): Observable<User> {
    return from(this.repository.findOne({ where: { email } }));
  }
  activateUser(id: string): Observable<UpdateResult> {
    return from(this.repository.update(id, { isActivated: true }));
  }
}
