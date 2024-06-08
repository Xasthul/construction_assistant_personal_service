import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";

@Entity('steps')
export class Step {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Project, (project) => project.steps, { onDelete: 'CASCADE' })
    project: Project

    @Column('uuid')
    projectId: string

    @Column()
    title: string

    @Column({ default: '' })
    details: string

    @Column('varchar', { array: true, default: [] })
    assets: string[]

    @Column()
    order: number

    @Column({ default: false })
    isCompleted: boolean

    @Column({ nullable: true })
    completedBy: string
}
