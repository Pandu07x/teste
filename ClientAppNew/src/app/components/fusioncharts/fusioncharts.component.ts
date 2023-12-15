import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-fusioncharts',
  templateUrl: './fusioncharts.component.html',
  styleUrls: ['./fusioncharts.component.css']
})
export class FusionchartsComponent implements OnInit{
  dataSourceAir: any;
  dataSourceTemperature: any;
  dataSourceHumidity: any;

  constructor(
    public dialogRef: MatDialogRef<FusionchartsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dataSourceAir = data.dataSourceAir;
    this.dataSourceTemperature = data.dataSourceTemperature;
    this.dataSourceHumidity = data.dataSourceHumidity
  }
  ngOnInit(): void {
   
  }

  onClose(): void {
    this.dialogRef.close();
  }
}