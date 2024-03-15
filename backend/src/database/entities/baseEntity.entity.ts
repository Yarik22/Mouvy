import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'The unique identifier of the entity.' })
  id: string;

  @CreateDateColumn()
  @ApiProperty({ description: 'The timestamp when the entity was created.' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'The timestamp when the entity was last updated.' })
  updatedAt: Date;
}