import {InMemoryDbService} from 'angular-in-memory-web-api';

export class InMemoryDatabase implements InMemoryDbService{

    createDb(){
        const categories = [
            {id:1, name: "Moradia", description: 'Pagementos de contas de casa'},
            {id:2, name: "Saúde", description: 'Plano de Saúde e Remédios'},
            {id:3, name: "Lazer", description: 'Cinema, parques, praia, etc'},
            {id:4, name: "Salário", description: 'Recebimento de Salári'},
            {id:5, name: "Freelas", description: 'Trabalhos como freelancer'}
        ];

        return {categories};
    }
}