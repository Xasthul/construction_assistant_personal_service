import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Step } from "./step.entity";

@Entity('projects')
export class Project {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column('uuid')
    userId: string

    @ManyToOne(() => User, (user) => user.projects, { onDelete: 'CASCADE' })
    user: User

    @OneToMany(() => Step, (step) => step.project)
    steps: Step[]
}
