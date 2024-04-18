export class Task {
  constructor(
    public userId: number,
    public user: User,
    public title: string,
    public body: string,
    public id: any
  ) {}
}
export class User {
  constructor(public id: number, public name: string) {}
}
