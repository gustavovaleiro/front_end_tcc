/**
 * Filtro/Pipe de formatação de CPF/CNPJ.
 *
 * @author Márcio Casale de Souza <contato@kazale.com>
 * @since 0.0.1
 */

import { Pipe, PipeTransform } from '@angular/core';

 
@Pipe({
	name: 'kzCpfCnpj'
})
export class KzCpfCnpjPipe implements PipeTransform {

    private kzCpfPipe: KzCpfPipe;
    private kzCnpjPipe: KzCnpjPipe;

    /**
     * Construtor da classe.
     */
    constructor() {
        this.kzCpfPipe = new KzCpfPipe();
        this.kzCnpjPipe = new KzCnpjPipe();
    }

	/**
	 * Formata um CPF/CNPJ ou retorna seu valor passado caso inválido. 
     * O CPF/CNPJ informado deve ser composto por 11 ou 14 caracteres 
     * numéricos respectivamente.
	 *
	 * @param string cpfCnpj
	 * @return string
	 */
	transform(cpfCnpj: string): string {
 		 if (!cpfCnpj) {
            return '';
        }
    
        var cpfCnpjValor = cpfCnpj.replace(/\D/g, '');
    
        if (cpfCnpjValor.length === 11) {
            cpfCnpj = this.kzCpfPipe.transform(cpfCnpjValor);
        } else if (cpfCnpjValor.length === 14) {
            cpfCnpj = this.kzCnpjPipe.transform(cpfCnpjValor);
        }
        
        return cpfCnpj;
	}
}

@Pipe({
	name: 'kzCpf'
})
export class KzCpfPipe implements PipeTransform {

	/**
	 * Formata um CPF ou retorna seu valor passado caso inválido. 
     * O CPF informado deve ser composto por 11 caracteres numéricos.
	 *
	 * @param string cpf
	 * @return string
	 */
	transform(cpf: string): string {
 		if (!cpf) {
            return '';
        }
    
        var cpfValor = cpf.replace(/\D/g, '');
    
        if (cpfValor.length !== 11) {
            return cpf;
        }
        
        var cpfLista = cpfValor.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
        
        if (cpfLista && cpfLista.length === 5) {
            cpf = cpfLista[1] + '.' + cpfLista[2] + '.' + cpfLista[3] + '-' + cpfLista[4];
        }
        
        return cpf;
	}
}

@Pipe({
	name: 'kzCnpj'
})
export class KzCnpjPipe implements PipeTransform {

	/**
	 * Formata um CNPJ ou retorna o valor passado caso inválido. 
     * O CNPJ informado deve ser composto por 14 caracteres numéricos.
	 *
	 * @param string cnpj
	 * @return string
	 */
	transform(cnpj: string): string {
 		if (!cnpj) {
            return '';
        }
    
        var cnpjValor = cnpj.replace(/\D/g, '');
    
        if (cnpjValor.length !== 14) {
            return cnpj;
        }
        
        var cnpjLista = cnpjValor.match(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/);
        
        if (cnpjLista && cnpjLista.length === 6) {
            cnpj = cnpjLista[1] + '.' + cnpjLista[2] + '.' + cnpjLista[3] + '/' + cnpjLista[4] + '-' + cnpjLista[5];
        }
        
        return cnpj;
	}
}