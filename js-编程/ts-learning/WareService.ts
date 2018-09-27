export default class WareService {
  private _stock: number = 10 //库存

  get stock(): number {
    return this._stock
  }

  public decreaseStock(): void {
    this._stock--;
  }
}
