import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ColumnMaster, FilterTemplateDto } from 'src/app/_model/report.model';
import { ReportServicesService } from 'src/app/_services/report-services.service';
import { CreateTemplateComponent } from '../create-template/create-template.component';
import variableData from 'src/assets/chart.report.temp.json'
import { Variable } from 'src/app/_model/Variables.Model';

@Component({
  selector: 'app-create-template-chart',
  templateUrl: './create-template-chart.component.html',
  styleUrls: ['./create-template-chart.component.css']
})
export class CreateTemplateChartComponent {
  variableList:Variable[] = variableData;
  projectList = [];
  fromGroup:FormGroup;
  templateName = "";
  formData: FormGroup;
  toppings = new FormControl('');
  listOfCols: ColumnMaster[] = []
  listOfTemplates: FilterTemplateDto[] = []


  constructor(private dialog: MatDialog, private dialogRef:MatDialogRef<CreateTemplateComponent> ,private fb: FormBuilder, private toast: ToastrService, private spinner: NgxSpinnerService, private reportService: ReportServicesService) {
   
    this.formData = fb.group({
      name:[''],
      category:['AODD'],
      tableArray:fb.array([])
    });

    reportService.getTemplates().subscribe((data: FilterTemplateDto[]) => {
      this.listOfTemplates = data;
    });

    this.variableList.map(x => {
      
    })
    var variables =  this.variableList.filter(x => x.dataType != 'String' && x.dataType != "Bool")
    variables.map(x => {
      var model:ColumnMaster = {
        columnName:x.variableName,
      }
      this.listOfCols.push(model);
    })
  }

  get getTableArray() {
    return this.formData.get('tableArray') as FormArray
  }

  save() {
    this.spinner.show();

    var model = {
      name: this.formData.get('name').value,
      category:this.formData.get('category').value,
      columns: this.toppings.value
    }

    this.reportService.createTemplate(model).subscribe({
      next: (data: FilterTemplateDto) => {
        this.listOfTemplates.push(data);
        this.spinner.hide();
        this.dialogRef.close();
        this.toast.success("Template created successfully");
      },
      error: (_) => {
        this.toast.error("Something went wrong")
      }
    })
  }
}
