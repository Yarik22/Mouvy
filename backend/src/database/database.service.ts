import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService {
  private pool: Pool;

  constructor(private configService: ConfigService) {
    this.pool = new Pool({
      user: configService.get<string>('database.user'),
      host: configService.get<string>('database.host'),
      database: configService.get<string>('database.database'),
      password: configService.get<string>('database.password'),
      port: configService.get<number>('database.port'),
    });
  }

  async query(queryText: string, params?: any[]): Promise<any> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(queryText, params);
      return result.rows;
    } finally {
      client.release();
    }
  }
}
