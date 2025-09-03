import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface DadosFuncionario {
  salario: number;
  dataAdmissao: string;
  dataDemissao: string;
  tipoRescisao: string;
  temAvisoPrevio: string;
  tipoAvisoPrevio: string;
  diasFeriasVencidas: number;
  saldoFgts: number;
}

interface ItemResultado {
  descricao: string;
  valor: number;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  dadosFuncionario: DadosFuncionario = {
    salario: 0,
    dataAdmissao: '',
    dataDemissao: '',
    tipoRescisao: '',
    temAvisoPrevio: '',
    tipoAvisoPrevio: '',
    diasFeriasVencidas: 0,
    saldoFgts: 0
  };

  resultado: ItemResultado[] = [];
  valoresReceber: ItemResultado[] = [];
  valoresFgts: ItemResultado[] = [];
  valoresDescontos: ItemResultado[] = [];
  totalLiquido: number = 0;
  totalReceber: number = 0;
  totalFgts: number = 0;
  totalDescontos: number = 0;
  resultadoCalculado: boolean = false;

  calcularRescisao(): void {
    this.limparResultados();

    const salario = this.dadosFuncionario.salario;
    const dataAdmissao = new Date(this.dadosFuncionario.dataAdmissao);
    const dataDemissao = new Date(this.dadosFuncionario.dataDemissao);
    const tipoRescisao = this.dadosFuncionario.tipoRescisao;
    
    // Validar se as datas são válidas
    if (isNaN(dataAdmissao.getTime()) || isNaN(dataDemissao.getTime())) {
      return;
    }

    // Calcular tempo de trabalho
    const tempoTrabalho = this.calcularTempoTrabalho(dataAdmissao, dataDemissao);
    const mesesTrabalhados = tempoTrabalho.meses;
    const diasTrabalhados = tempoTrabalho.dias;

    let totalBrutoReceber = 0;
    let totalBrutoFgts = 0;
    let totalBrutoDescontos = 0;

    // === VALORES A RECEBER ===
    
    // Saldo de salário (dias trabalhados no mês da demissão)
    const saldoSalario = this.calcularSaldoSalario(salario, dataDemissao);
    if (saldoSalario > 0) {
      this.valoresReceber.push({ descricao: 'Saldo de Salário', valor: saldoSalario });
      totalBrutoReceber += saldoSalario;
    }

    // 13º salário proporcional
    const decimoTerceiro = this.calcularDecimoTerceiro(salario, mesesTrabalhados, diasTrabalhados);
    if (decimoTerceiro > 0) {
      this.valoresReceber.push({ descricao: '13º Salário Proporcional', valor: decimoTerceiro });
      totalBrutoReceber += decimoTerceiro;
    }

    // Férias vencidas
    const feriasVencidas = this.calcularFeriasVencidas(salario, this.dadosFuncionario.diasFeriasVencidas);
    if (feriasVencidas > 0) {
      this.valoresReceber.push({ descricao: 'Férias Vencidas', valor: feriasVencidas });
      totalBrutoReceber += feriasVencidas;
    }

    // Férias proporcionais
    const feriasProporcionais = this.calcularFeriasProporcionais(salario, mesesTrabalhados, diasTrabalhados);
    if (feriasProporcionais > 0) {
      this.valoresReceber.push({ descricao: 'Férias Proporcionais', valor: feriasProporcionais });
      totalBrutoReceber += feriasProporcionais;
    }

    // 1/3 de férias vencidas
    const umTercoFeriasVencidas = feriasVencidas / 3;
    if (umTercoFeriasVencidas > 0) {
      this.valoresReceber.push({ descricao: '1/3 Férias Vencidas', valor: umTercoFeriasVencidas });
      totalBrutoReceber += umTercoFeriasVencidas;
    }

    // 1/3 de férias proporcionais
    const umTercoFeriasProporcionais = feriasProporcionais / 3;
    if (umTercoFeriasProporcionais > 0) {
      this.valoresReceber.push({ descricao: '1/3 Férias Proporcionais', valor: umTercoFeriasProporcionais });
      totalBrutoReceber += umTercoFeriasProporcionais;
    }

    // Aviso prévio
    const avisoPrevio = this.calcularAvisoPrevio(salario, tipoRescisao, mesesTrabalhados);
    if (avisoPrevio > 0 && this.dadosFuncionario.temAvisoPrevio === 'sim') {
      const descricaoAviso = this.dadosFuncionario.tipoAvisoPrevio === 'indenizado' ? 'Aviso Prévio Indenizado' : 'Aviso Prévio Trabalhado';
      this.valoresReceber.push({ descricao: descricaoAviso, valor: avisoPrevio });
      totalBrutoReceber += avisoPrevio;
    }

    // === VALORES FGTS ===
    
    // FGTS do mês
    const fgtsMes = (totalBrutoReceber * 0.08);
    if (fgtsMes > 0) {
      this.valoresFgts.push({ descricao: 'FGTS do Mês da Rescisão', valor: fgtsMes });
      totalBrutoFgts += fgtsMes;
    }

    // Saldo FGTS anterior
    if (this.dadosFuncionario.saldoFgts > 0) {
      this.valoresFgts.push({ descricao: 'Saldo FGTS Anterior', valor: this.dadosFuncionario.saldoFgts });
      totalBrutoFgts += this.dadosFuncionario.saldoFgts;
    }

    // Multa FGTS
    const multaFgts = this.calcularMultaFgts(this.dadosFuncionario.saldoFgts, tipoRescisao);
    if (multaFgts > 0) {
      this.valoresFgts.push({ descricao: 'Multa FGTS 40%', valor: multaFgts });
      totalBrutoFgts += multaFgts;
    }

    // === DESCONTOS ===
    
    // Calcular INSS
    const inss = this.calcularINSS(totalBrutoReceber);
    if (inss > 0) {
      this.valoresDescontos.push({ descricao: 'INSS', valor: inss });
      totalBrutoDescontos += inss;
    }

    // Calcular IRRF
    const irrf = this.calcularIRRF(totalBrutoReceber - inss);
    if (irrf > 0) {
      this.valoresDescontos.push({ descricao: 'IRRF', valor: irrf });
      totalBrutoDescontos += irrf;
    }

    // Atualizar totais
    this.totalReceber = totalBrutoReceber;
    this.totalFgts = totalBrutoFgts;
    this.totalDescontos = totalBrutoDescontos;
    this.totalLiquido = totalBrutoReceber - totalBrutoDescontos;
    this.resultadoCalculado = true;
  }

  private calcularTempoTrabalho(dataAdmissao: Date, dataDemissao: Date): { meses: number, dias: number } {
    let anos = dataDemissao.getFullYear() - dataAdmissao.getFullYear();
    let meses = dataDemissao.getMonth() - dataAdmissao.getMonth();
    let dias = dataDemissao.getDate() - dataAdmissao.getDate();
    
    if (dias < 0) {
      meses--;
      const ultimoDiaMesAnterior = new Date(dataDemissao.getFullYear(), dataDemissao.getMonth(), 0).getDate();
      dias += ultimoDiaMesAnterior;
    }
    
    if (meses < 0) {
      anos--;
      meses += 12;
    }
    
    const totalMeses = anos * 12 + meses;
    return { meses: totalMeses, dias };
  }

  private calcularSaldoSalario(salario: number, dataDemissao: Date): number {
    const diasMes = new Date(dataDemissao.getFullYear(), dataDemissao.getMonth() + 1, 0).getDate();
    const diasTrabalhados = dataDemissao.getDate();
    return (salario / diasMes) * diasTrabalhados;
  }

  private calcularDecimoTerceiro(salario: number, meses: number, dias: number): number {
    const mesesCompletos = meses + (dias >= 15 ? 1 : 0);
    return (salario / 12) * mesesCompletos;
  }

  private calcularFeriasVencidas(salario: number, diasVencidas: number): number {
    return (salario / 30) * diasVencidas;
  }

  private calcularFeriasProporcionais(salario: number, meses: number, dias: number): number {
    const mesesCompletos = meses + (dias >= 15 ? 1 : 0);
    return (salario / 12) * mesesCompletos;
  }

  private calcularAvisoPrevio(salario: number, tipoRescisao: string, mesesTrabalhados: number): number {
    if (tipoRescisao === 'demissao-sem-justa-causa' || tipoRescisao === 'acordo-mutuo') {
      // Para aviso prévio trabalhado, é apenas o salário do mês
      if (this.dadosFuncionario.tipoAvisoPrevio === 'trabalhado') {
        return salario;
      }
      // Para aviso prévio indenizado, calcula com dias adicionais
      const diasAdicionais = Math.min(mesesTrabalhados * 3, 60);
      const diasTotais = 30 + diasAdicionais;
      return (salario / 30) * diasTotais;
    }
    return 0;
  }

  private calcularMultaFgts(saldoFgts: number, tipoRescisao: string): number {
    if (tipoRescisao === 'demissao-sem-justa-causa') {
      return saldoFgts * 0.4;
    } else if (tipoRescisao === 'acordo-mutuo') {
      return saldoFgts * 0.2;
    }
    return 0;
  }

  private limparResultados(): void {
    this.valoresReceber = [];
    this.valoresFgts = [];
    this.valoresDescontos = [];
    this.resultado = [];
    this.totalReceber = 0;
    this.totalFgts = 0;
    this.totalDescontos = 0;
    this.totalLiquido = 0;
  }

  private calcularINSS(salarioBase: number): number {
    // Tabela INSS 2024
    if (salarioBase <= 1412.00) {
      return salarioBase * 0.075;
    } else if (salarioBase <= 2666.68) {
      return (1412.00 * 0.075) + ((salarioBase - 1412.00) * 0.09);
    } else if (salarioBase <= 4000.03) {
      return (1412.00 * 0.075) + ((2666.68 - 1412.00) * 0.09) + ((salarioBase - 2666.68) * 0.12);
    } else if (salarioBase <= 7786.02) {
      return (1412.00 * 0.075) + ((2666.68 - 1412.00) * 0.09) + ((4000.03 - 2666.68) * 0.12) + ((salarioBase - 4000.03) * 0.14);
    } else {
      return (1412.00 * 0.075) + ((2666.68 - 1412.00) * 0.09) + ((4000.03 - 2666.68) * 0.12) + ((7786.02 - 4000.03) * 0.14);
    }
  }

  private calcularIRRF(baseCalculo: number): number {
    // Tabela IRRF 2024
    if (baseCalculo <= 2259.20) {
      return 0;
    } else if (baseCalculo <= 2826.65) {
      return (baseCalculo * 0.075) - 169.44;
    } else if (baseCalculo <= 3751.05) {
      return (baseCalculo * 0.15) - 381.44;
    } else if (baseCalculo <= 4664.68) {
      return (baseCalculo * 0.225) - 662.77;
    } else {
      return (baseCalculo * 0.275) - 896.00;
    }
  }

  limparCalculos(): void {
    this.dadosFuncionario = {
      salario: 0,
      dataAdmissao: '',
      dataDemissao: '',
      tipoRescisao: '',
      temAvisoPrevio: '',
      tipoAvisoPrevio: '',
      diasFeriasVencidas: 0,
      saldoFgts: 0
    };
    this.limparResultados();
    this.resultadoCalculado = false;
  }
}
