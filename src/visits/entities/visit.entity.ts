import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Link } from '../../links/entities/link.entity'; // Relación con enlaces

@Entity()
export class Visit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Link, (link) => link.id)
  link: Link;

  @Column()
  ip: string;

  @Column()
  userAgent: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}
