export class DIPResponse {
  public file: string;
  public urls: string[];

  constructor(response: any) {
    this.file = response.file;
    this.urls = response.urls;
  }
}
