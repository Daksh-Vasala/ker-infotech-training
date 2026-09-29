export interface FormModalProps {
  isOpenModal: boolean;
  setIsOpenModal: (data: boolean) => void;
  handleSubmit: (data: TaskFormData) => void;
  isEdit: boolean;
  selectedTask: Task | null
}

export type Task = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  userId: number;
  createdAt: string;
  updatedAt: string;
};

export enum TaskStatus {
  PENDING = "pending",
  INPROGRESS = "in_progress",
  COMPLETED = "completed",
}

export interface TaskFormData {
  title: string;
  description?: string;
  status: TaskStatus;
}
