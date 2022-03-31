
export class ServerResponseService {

  constructor(
    public status: string,
    public message: string,
    public data: any,
  ) { }
}
