export class DIPResponse {
  public file: string;
  public urls: string[];
  public notes: string;

  constructor(response: any) {
    this.file = response.file;
    this.urls = response.urls;
    this.notes = response.notes;
  }
}
