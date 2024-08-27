export enum TodoListStatus {
  open = 1,
  close = 2,
}
export class TodoListEntity {
  public id?: string;
  public title: string;
  public description?: string;
  public status: TodoListStatus;
  public isDeleted?: boolean;
  public createdAt?: Date;
  public updatedAt?: Date;
  constructor(data: {
    id?: string;
    title: string;
    description: string;
    status: TodoListStatus;
    createdAt?: Date;
    updatedAt?: Date;
    isDeleted?: boolean;
  }) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.status = data.status;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.isDeleted = data.isDeleted;
    this.validate();
  }

  private validate() {
    const errors = [];
    if (!this.title || !this.description) {
      errors.push("title and description are required");
    }
    if (this.title.length < 1) {
      errors.push("title must be at least 3 characters long");
    }
    if (this.description && this.description?.length < 1) {
      errors.push("description must be at least 3 characters long");
    }
    if (Object.values(TodoListStatus).indexOf(this.status) === -1) {
      errors.push("status must be open or close");
    }
    if (errors.length > 0) {
      throw new Error(errors.join(", "));
    }
  }
}
