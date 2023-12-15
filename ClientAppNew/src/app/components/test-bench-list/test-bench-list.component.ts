import { Component } from '@angular/core';
import { TestBenchListServiceService } from 'src/app/_services/test-bench-list-service.service';

@Component({
  selector: 'app-test-bench-list',
  templateUrl: './test-bench-list.component.html',
  styleUrls: ['./test-bench-list.component.css']
})
export class TestBenchListComponent {
  dataFormat = "json";
  testBenchList = [
    'TestBench_1',
    'TestBench_2',
    'TestBench_3',
    'TestBench_4',
    'TestBench_5',
    'TestBench_6',
    'TestBench_7',
  ]
  testBenchStatus;
 constructor(private testBenchService:TestBenchListServiceService)
 {
  this.getTestBench1Status()
 }

  getTestBench1Status()
  {
    this.testBenchService.getTestBenchRunningStatus().subscribe((data)=>{
      this.testBenchStatus = data;
    })
  }

  
}

