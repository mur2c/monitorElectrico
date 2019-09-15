import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.page.html',
  styleUrls: ['./monitor.page.scss'],
})
export class MonitorPage implements OnInit {
  @ViewChild("lineCanvas", {static: true}) lineCanvas: ElementRef;
  private lineChart: Chart;
  private intervalUpdate: any = null;
  public chart: any = null;
  public chargeload: any;

  //#############  GAUGE VARS #####################
  public canvasWidth = 300
  public transform = 10                                 //Initial Value and will be updated by showData()  method line 113
  public needleValue = (this.transform*100/18)           // this is to update gauge from 0 - 100v(default) to 0 - 18V
  public centralLabel = '' + this.transform + 'V'        // Central Label
  public name = 'Voltage del Banco'
  public bottomLabel = 'Voltios'
  public options = {
      hasNeedle: true,
      outerNeedle: false,
      needleColor: 'gray',
      needleUpdateSpeed: 10,
      arcColors: ['rgb(44, 151, 222)', 'lightgray'],
      rangeLabel: ["0","18"],
      arcDelimiters: [10],                                 //Initial Value and will be updated by showData()  method line 114
      arcPadding: 2,
      needleStartValue: 0,
      arcPaddingColor: 'white',
      arcLabels: ['10']                                    //Initial Value and will be updated by showData()  method line 116
  }

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            label: "Voltaje",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [],
            spanGaps: false
          }
        ]
      }
    });

    this.showData();		
		this.intervalUpdate = setInterval(function(){
			this.showData();
    }.bind(this), 5000);
  }

  // ############# CHARTJS Methods ###################
  private ngOnDestroy(): void {
    console.log("destruido");
		clearInterval(this.intervalUpdate);
  }

  private showData(): void {
		this.getFromAPI().subscribe(response => {
      if(response) {
				let chartTime: any = new Date();
        chartTime = chartTime.getHours() + ':' + ((chartTime.getMinutes() < 10) ? '0' + chartTime.getMinutes() : chartTime.getMinutes()) + ':' + ((chartTime.getSeconds() < 10) ? '0' + chartTime.getSeconds() : chartTime.getSeconds());
				if(this.lineChart.data.labels.length > 20) {        //15 pasos o labels a mostrar
						this.lineChart.data.labels.shift();             //Si hay mas de 15 labels , borra el primero y pon el ultimo
						this.lineChart.data.datasets[0].data.shift();   //Desplaza la data tambien
				}
				this.lineChart.data.labels.push(chartTime);
				this.lineChart.data.datasets[0].data.push(response[0].value);
        this.lineChart.update();
        
        //########### Update Volt Gauge #########################
        this.transform = response[0].value                            //Update retrieved from  io.adafruit and assigned to this.transform var
        //this.transform = 10.51
        this.options.arcDelimiters[0]=this.needleValue
        this.options.arcLabels[0]= String(this.transform)              // Change to string
        this.centralLabel = '' + this.transform                        //( '' + ) => esta expresion convierte un string a Number
        //########### % Carga Bateria #################
        if (this.transform >= 12.73) {
            console.log("100%")
            this.chargeload = "100%"
        } else if (this.transform >= 12.62 && this.transform < 12.73){
            console.log("90%")
            this.chargeload = "90%"
        } else if (this.transform >= 12.50 && this.transform < 12.62){
          console.log("80%")
          this.chargeload = "80%"
        } else if (this.transform >= 12.37 && this.transform < 12.50){
          console.log("70%")
          this.chargeload = "70%"
        } else if (this.transform >= 12.24 && this.transform < 12.37){
          console.log("60%")
          this.chargeload = "60%"
        } else if (this.transform >= 12.10 && this.transform < 12.24){
          console.log("50%")
          this.chargeload = "50%"
        } else if (this.transform >= 11.96 && this.transform < 12.10){
          console.log("40%")
          this.chargeload = "40%"
        } else if (this.transform >= 11.81 && this.transform < 11.96){
          console.log("30%")
          this.chargeload = "30%"
        } else if (this.transform >= 11.66 && this.transform < 11.81){
          console.log("20%")
          this.chargeload = "20%"
        } else if (this.transform >= 11.51 && this.transform < 11.66){
          console.log("10%")
          this.chargeload = "10%"
        }  else if (this.transform < 11.51){
          console.log("0%")
          this.chargeload = "0%"
        }
			} else {
				console.error("ERROR: The response had an error, retrying");
			}
		}, error => {
			console.error("ERROR: Unexpected response");
		});
  }
  
  private getFromAPI(): Observable<any>{
	  return this.http.get(
    //'http://localhost:3000',
    'https://io.adafruit.com/api/v2/Orlis/feeds/voltage/data?x-aio-key=dcac6c472ff64e1a8e16781e17c19877&limit=1',
		{ responseType: 'json' }
	  );
  }

  //########### Go Back #############
  gotoHome() {
    this.router.navigate(['/home']);
  }

}
