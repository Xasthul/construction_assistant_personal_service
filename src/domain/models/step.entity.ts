import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Site } from "./site.entity";

@Entity('steps')
export class Step {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column({ nullable: true })
    details: string

    @Column('varchar', { array: true, nullable: true })
    assets: string[]

    @Column({ default: false })
    isCompleted: boolean

    @Column('uuid')
    siteId: string

    @ManyToOne(() => Site, (site) => site.steps, { onDelete: 'CASCADE' })
    site: Site
}
