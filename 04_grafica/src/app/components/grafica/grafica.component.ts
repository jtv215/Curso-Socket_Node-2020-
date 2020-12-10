import { WebSocketService } from './../../services/web-socket.service';
import { Component, OnInit, HttpClientModule } from '@angular/core';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { BaseChartDirective } from 'ng2-charts';
import Chart from 'chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {


  public x;
  public y;


  constructor(
    private _http:HttpClient,
    private wsService: WebSocketService){
    this.x = ['enero', 'febrero', 'marzo', 'abril'];
    this.y = [5, 100, 40, 20];
  }

  // setInterval(() => {
  //   var datosNew = [
  //     Math.round(Math.random() * 100),
  //     Math.round(Math.random() * 100),
  //     Math.round(Math.random() * 100),
  //     Math.round(Math.random() * 100)
  //   ]

  //   this.y = datosNew;
  //   this.grafica1();

  // }, 3000);
  ngOnInit(): void {
    this.getdata();
    this.escucharSocket();

    this.grafica1();
  }

  grafica1() {
    /** de los ultimos 7 dias poner el numero de avisos que se han realizado***/
    var ctx = document.getElementById('myChart1');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.x,
        datasets: [{
          label: 'Nº de avisos',
          data: this.y,
          backgroundColor: [
            'rgba(63, 165, 157)'
          ],
          borderColor: [
            'rgba(63, 165, 157)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }


  getdata(){
    this._http.get('http://localhost:3977/api/grafica').subscribe(
      resp=>{
        this.y= resp;
        this.grafica1()
        
      }
    )

  }


  escucharSocket(){
    this.wsService.listen('cambio-grafica').subscribe(
      resp=>{
        this.y= resp;
        console.log(resp);
        
        this.grafica1();
      }
    )
  }

} 
