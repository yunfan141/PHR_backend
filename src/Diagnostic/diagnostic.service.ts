import { Component , Inject} from '@nestjs/common';
import {Repository, getRepository, getConnection} from 'typeorm';
import {UsersEntity} from '../User/users.entity';
import {DiagnosticEntity} from '../Diagnostic/Diagnostic.entity';

@Component()
export class DiagnosticsService {
    constructor(
    ){}

    public async addDiagnostics(id: number, typeid: number, info: any){
        const theUser = await getRepository(UsersEntity)
        .createQueryBuilder('user')
        .where('user.id = :name', { name: id })
        .getOne();
        const diagnostic = new Object();
        diagnostic.user = theUser;
        diagnostic.info = info;
        diagnostic.typeid = typeid;
        return await getRepository(DiagnosticEntity).save(diagnostic);
    }

    public async getDiagnostics(id: number, typeid: number){
        const userAndDiagnostics = await getRepository(UsersEntity)
        .createQueryBuilder('users')
        .leftJoinAndSelect('users.diagnostics', 'diagnostics')
        .where('users.id = :name', {name: id})
        .andWhere('diagnostics.typeid = :typename', {typename: typeid})
        .getOne();
        if (userAndDiagnostics === undefined){
            return null;
        }
        const DiagnosticsInfo = userAndDiagnostics.diagnostics.map((item) => item.info);
        DiagnosticsInfo.sort(function compare(a, b) {
            if (a.date < b.date) {
              return -1;
            }
            if (a.date > b.date) {
              return 1;
            }
            return 0;
        });
        const finalresult = [];
        if (typeid == 2 || typeid == 3 || typeid == 4 || typeid == 5){
            function diagnosticItem(organ, results){
                this.organ = organ;
                this.results = results;
            }
            const organSet = new Set();
            DiagnosticsInfo.forEach( (item) => {
                organSet.add(item.organ);
                console.log(item);
            });
            console.log(organSet);
            for (const organ of organSet){
                const results = [];
                DiagnosticsInfo.forEach( (item) => {
                    if (item.organ === organ){
                        delete item.organ;
                        results.push(item);
                    }
                });
                finalresult.push(new diagnosticItem(organ, results));
            }
        }
        else{
            function diagnosticItem2(name, results){
                this.name = name;
                this.results = results;
            }
            const nameSet = new Set();
            DiagnosticsInfo.forEach( (item) => {
                nameSet.add(item.name);
                console.log(item);
            });
            for (const name of nameSet){
                const results = [];
                DiagnosticsInfo.forEach( (item) => {
                    if (item.name === name){
                        delete item.name;
                        results.push(item);
                    }
                });
                finalresult.push(new diagnosticItem2(name, results));
            }
        }
        return finalresult;
    }
}