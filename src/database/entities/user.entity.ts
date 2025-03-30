import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  // @Column({ default: Date.now() })
  @Column()
  created_at: Date;

  @Column({ nullable: true })
  name: string;
}
