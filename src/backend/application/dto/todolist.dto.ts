export class TodoListDTO {
  constructor(
    public title: string,
    public userId: string,
    public id?: number
  ) {}
}
