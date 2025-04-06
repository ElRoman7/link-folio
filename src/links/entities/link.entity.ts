import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity'; // Relación con usuarios

@Entity()
export class Link {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  url: string;

  @ManyToOne(() => User, (user) => user.links)
  user: User;

  @OneToMany(() => Visit, (visit) => visit.link)
  visits: Visit[];

  @Column({ default: 0 })
  order: number; // Orden de los enlaces

  @Column({ default: true })
  isVisible: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
