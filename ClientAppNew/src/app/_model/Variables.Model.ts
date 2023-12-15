export interface Variable {
    variableId: string
    variableName: string
    dataType: string
    assetId: string
    aspectId: string
    unit: string
    adapterId: any
    topic: string
    store: boolean
    aspectName: string
  }
  

  export interface VariableReceived {
    variableId: string
    values: Value[]
  }
  
  export interface Value {
    timestamp: string
    value: any
    qualitycode: number
  }

  export interface BulkData {
    data: VariableReceived[]
  }
  
  
  