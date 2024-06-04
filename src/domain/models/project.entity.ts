import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Step } from "./step.entity";

@Entity('projects')
export class Project {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToMany(() => User, (user) => user.projects)
    users: User[]

    @Column()
    title: string

    @OneToMany(() => Step, (step) => step.project)
    steps: Step[]

    @ManyToOne(() => User, (user) => user.createdProjects, { onDelete: 'CASCADE' })
    createdBy: User

    @Column('uuid')
    createdById: string
}
