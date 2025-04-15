import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
  } from "typeorm";
  import { TaskNote } from "./TaskNote";
  
  @Entity()
  export class TaskCard {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 100 })
    title: string;
  
    @Column({ length: 255 })
    description: string;
  
    @Column({ length: 50 })
    category: string;
  
    @Column({ length: 20 })
    priority: string;
  
    @Column({ length: 20 })
    status: string; 

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @OneToMany(() => TaskNote, (note) => note.task, { cascade: true })
    notes: TaskNote[];
  }
  