export interface TaskQueryParams {
    title?: string
    category?: string
    priority?: "Low" | "Medium" | "High"
    status?: "Todo" | "In Progress" | "Done"
    page: number
    limit: number
  }
  