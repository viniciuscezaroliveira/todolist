class TodoListEntity {
  public id?: number;
  public name: string;
  public description: string;
  constructor(data: { id?: number; name: string; description: string }) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.validate();
  }

  private validate() {
    const errors = [];
    if (!this.name || !this.description) {
      errors.push("name and description are required");
    }
    if (this.name.length < 3) {
      errors.push("name must be at least 3 characters long");
    }
    if (this.description.length < 3) {
      errors.push("description must be at least 3 characters long");
    }

    if (errors.length > 0) {
      throw new Error(errors.join(","));
    }
  }
}
