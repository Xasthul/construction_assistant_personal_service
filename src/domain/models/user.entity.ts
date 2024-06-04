import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @ManyToMany(() => Project, (project) => project.users)
    @JoinTable()
    projects: Project[]

    @OneToMany(() => Project, (project) => project.createdBy)
    createdProjects: Project[]
}
