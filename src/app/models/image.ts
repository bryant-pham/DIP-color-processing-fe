export class Image {
  public static from(json: any): Image {
    return new Image(json.url, json.file);
  }

  public static fromArray(jsonArray: any): Image[] {
    return jsonArray.map((elem) => new Image(elem.url, elem.file));
  }

  constructor(public url: string, public name: string) {}
}
