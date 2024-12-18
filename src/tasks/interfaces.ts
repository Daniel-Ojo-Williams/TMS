import Tasks from "./model/tasks.model";

export interface AllTasks {
  currentPage: number, 
  tasks: Tasks[], 
  totalTasks: number, 
  totalPages: number
}