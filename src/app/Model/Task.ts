export class Task {
  constructor(
    public userId: number,
    public user: string,
    public title: string,
    public body: string,
    public id?: string
  ) {}
}
