import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";

@Entity('steps')
export class Step {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('uuid')
    projectId: string

    @ManyToOne(() => Project, (project) => project.steps, { onDelete: 'CASCADE' })
    project: Project

    @Column()
    title: string

    @Column({ nullable: true })
    details: string

    @Column('varchar', { array: true, nullable: true })
    assets: string[]

    @Column()
    priority: number

    @Column({ default: false })
    isCompleted: boolean

    @Column({ nullable: true })
    completedBy: string
}
