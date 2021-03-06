const Readable = require('stream').Readable
class MyReadable extends Readable{
    constructor(dataSource, options){
        super(options)
        this.dataSource = dataSource
    }
    //_read表示需要从MyReadable类内部调用该方法
    _read(){
        const data = this.dataSource.makeData()
        this.push(data)
    }
}
//模拟资源池
const dataSource = {
    data: new Array('abcdefghijklmnopqrstuvwxyz'),
    makeData: function(){
        if(!this.data.length) return null
        return this.data.pop()

    }
}

const myReadable = new MyReadable(dataSource);
myReadable.setEncoding('utf8');
myReadable.on('data', (chunk) => {
  console.log(chunk);
});
