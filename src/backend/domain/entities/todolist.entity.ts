export class TodoListEntity {
  public id?: string;
  public title: string;
  public userId: string;
  public completed?: boolean;
  public isDeleted?: boolean;
  public createdAt?: Date;
  public updatedAt?: Date;
  constructor(data: {
    id?: string;
    title: string;
    userId: string;
    completed?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    isDeleted?: boolean;
  }) {
    this.id = data.id;
    this.title = data.title;
    this.userId = data.userId;
    this.completed = data.completed;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.isDeleted = data.isDeleted;
    this.validate();
  }

  private validate() {
    const errors = [];
    if (!this.title) {
      errors.push("title is required");
    }
    if (this.title?.length < 1) {
      errors.push("title must be at least 1 characters long");
    }
    if (!this.userId) {
      errors.push("userId is required");
    }
    if (errors.length > 0) {
      throw new Error(errors.join(", "));
    }
  }
}
