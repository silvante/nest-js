import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import bcryptjs from 'bcryptjs';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column({ unique: true, length: 50 })
  username: string;

  @Column({ default: "user's name", length: 100 })
  name: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcryptjs.hash(this.password, 10);
  }
}
