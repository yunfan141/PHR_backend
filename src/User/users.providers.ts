import {Connection} from 'typeorm';
import {UsersEntity} from './users.entity';

export const UsersProvider = {
    provide: 'UsersRepository',
    useFactory: (connection: Connection) => connection.getRepository(UsersEntity),
    inject: ['TypeORMInstance'],
};