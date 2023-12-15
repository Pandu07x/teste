export class FilterTemplateDto {
    name: string
    columns: number[]
}

export interface ColumnMaster {
    columnName: string
  id?: number
  updatedDate?: string
  updatedBy?: number
  }