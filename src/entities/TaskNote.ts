import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
  } from "typeorm"
  import { TaskCard } from "./TaskCard"
  
  @Entity()
  export class TaskNote {
    @PrimaryGeneratedColumn()
    id: number
  
    @Column({ length: 255 })
    content: string
  
    @CreateDateColumn()
    created_at: Date
  
    @UpdateDateColumn()
    updated_at: Date
  
    @ManyToOne(() => TaskCard, (taskCard) => taskCard.notes, { onDelete: 'SET NULL' }) 

    @JoinColumn({ name: 'taskId' })
    taskCard: TaskCard | null;
  }
  