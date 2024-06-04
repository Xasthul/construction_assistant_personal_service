import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Site } from "./site.entity";
import { User } from "./user.entity";

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

    @OneToMany(() => Site, (site) => site.project)
    sites: Site[]
}
