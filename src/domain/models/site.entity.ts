import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Step } from "./step.entity";
import { Project } from "./project.entity";

@Entity('sites')
export class Site {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column('uuid')
    projectId: string

    @ManyToOne(() => Project, (project) => project.sites, { onDelete: 'CASCADE' })
    project: Project

    @OneToMany(() => Step, (step) => step.site)
    steps: Step[]
}
