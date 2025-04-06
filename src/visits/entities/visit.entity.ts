import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Link } from '../../links/entities/link.entity';

@Entity()
export class Visit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Link, (link) => link.visits)
  link: Link;

  @Column({ nullable: true })
  ipAddress: string; // Changed from 'ip' to 'ipAddress'

  @Column()
  userAgent: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}
