import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSelectChange } from '@angular/material/select';
import data from '../../assets/data.json';
import { SignalValueModel } from './signalValueModel';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  public formules: string[] = data.formules;
  public signes: Array<string[]> = data.signes;
  public selectedSignes: any = [];
  public selectedFormules: any = [];
  public model: any;
  public val1: any;
  public val2: any;
  public letters2: any= [];
  public operator2: any;
  public i: any;
  // public signalValue:  Array<SignalValueModel[]> = [];
  public values:Array<Number> = [];
  disabled = true


  constructor() { }

  ngOnInit(): void {
    this.formule_reader();
    this.initializeValues();
  }

  onCheckboxChange(event: MatCheckboxChange) {
    if (event.checked) {
      this.selectedSignes.push(event.source.value);
    }
    else {
      if (this.selectedSignes.includes(event.source.value)) {
        let index = this.selectedSignes.indexOf(event.source.value);
        if (index > -1) {
          this.selectedSignes.splice(index, 1);
        }
      }
    }
  }

  initializeValues(){
    this.values.length = this.signes.length;
    this.i=this.signes.length;
  }
  

  public formula: any;
  public helpingFormula: any = '';
  public results: any = [];
  formule_reader() {
    this.results = [];
    this.formules.forEach(formule => {
      let formuleArray = formule.split('=');
      // let formula = '';
      if (this.selectedSignes.every((s: any) => formuleArray[1].split('').indexOf(s) > -1 && formuleArray[0] == this.model)) {
        this.formula = formule;
        console.log(this.formula);
        this.helpingFormula = null;
      }
      else {
        let letterToBeReplaced = formuleArray[1].split('').find((o) => this.selectedSignes.indexOf(o) === -1 && formuleArray[0] == this.model && o.match(/[a-z]/i));

        if (letterToBeReplaced) {
          console.log(letterToBeReplaced);
          this.helpingFormula = this.formules.find(formule => formule.split('=')[0] == letterToBeReplaced && this.selectedSignes.every((s: any) => formule.split('=')[1].split('').indexOf(s) > -1));
          console.log(this.helpingFormula);
          console.log(this.formula);

        }

      }

    })
  }
  calculate() {
    this.formule_reader();
    this.results.push(this.helpingFormula, this.formula);
    console.log(this.results);

  }

  public finalRes: any;
  public finalRes2: any;

  finalResult() {

    if (this.results[0] == null && !this.results[1].includes("Math.sqrt")) {
      let res = this.results[1].split('=');
      this.letters2 = res[1].split(/[*,/]/); // get only letters
      this.operator2 = res[1].match(/[*,/]/g); // save the operator

      let finalExp = this.val1 + this.operator2 + this.val2

      this.finalRes2 = eval(finalExp);


    } else if (this.results[0] == null && this.results[1].includes("Math.sqrt")) {
      
      let res2 = this.results[1].split('=');
      this.letters2 = res2[1].split(/[*,/]/); // get only letters
      this.operator2 = res2[1].match(/[*,/]/g); // save the operator
      let exp = this.val1 + this.operator2 + this.val2  // part inside ()
      exp=eval(exp)

      this.finalRes2= Math.sqrt(exp)


    } else if (this.results[0] != null && !this.results[0].includes("Math.sqrt") &&
      this.results[1] != null && !this.results[1].includes("Math.sqrt")) {
      // first formula
      let res = this.results[0].split('=');
      let operator = res[1].match(/[*,/]/g); // save the operator
      let finalExp = this.val1 + operator+ this.val2
      this.finalRes = eval(finalExp);

      // // second formula
      let res2 = this.results[1].split('=');
      this.letters2 = res2[1].split(/[*,/]/); // get only letters
      this.operator2 = res2[1].match(/[*,/]/g); // save the operator
      let finalExp2 = this.finalRes + this.operator2 + this.val2
      this.finalRes2 = eval(finalExp2);


    } else if (this.results[0].includes("Math.sqrt") && !this.results[1].includes("Math.sqrt")) {
      // first formula
      let res = this.results[0].split('=');
      let subExp = res[1].substring(10,13); // get only expression
      let letters = subExp.split(/[*,/]/); // get only letters 
      console.log(letters);
      
      let operator = subExp.match(/[*,/]/g); // save the operator      
      let exp = this.val1 + operator + this.val2  // part inside ()
      exp=eval(exp)
      this.finalRes = Math.sqrt(exp)


      // second formula
      let res2 = this.results[1].split('=');
      this.letters2 = res2[1].split(/[*,/]/); // get only letters
      this.operator2 = "/";

      this.letters2[1] = letters[0];
      let finalExp2 = this.val1 + this.operator2 + this.finalRes 
    
      this.finalRes2 = eval(finalExp2)



    }


  }


}
