import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {LabTestEntity} from '../LabTest/LabTest.entity';
import {ContactsEntity} from '../Contacts/Contacts.entity';
import {AppointmentsEntity} from '../Appointments/Appointments.entity';
import {TrackersEntity} from '../Trackers/Trackers.entity';
import {HistoryEntity} from '../History/History.entity';
@Entity()
export class UsersEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    securityQuestion: string;

    @Column()
    securityAnswer: string;

    @Column({ nullable: true })
    firstname: string;

    @Column({ nullable: true })
    lastname: string;

    @Column({ nullable: true })
    tel: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    gender: string;

    @Column({ nullable: true })
    race: string;

    @Column({ nullable: true })
    birthday: string;

    @OneToMany(type => AppointmentsEntity, appointment => appointment.user)
    appointments: AppointmentsEntity[];

    @OneToMany(type => LabTestEntity, labTest => labTest.user)
    labTests: labTest[];

    @OneToMany(type => ContactsEntity, contact => contact.user)
    contacts: contact[];

    @OneToMany(type => TrackersEntity, tracker => tracker.user)
    trackers: tracker[];

    @OneToMany(type => HistoryEntity, history => history.user)
    historys: history[];

}