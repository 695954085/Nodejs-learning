let totalNum = 0; // Total comments number.
let curPage = 1; // Current page index.
let pageSize = 10; // The number of comment displayed in one page.

// 使用A函数的主代码。
async function dealWithAsync() {
  totalNum = await getListCount();
  console.log('Get count', totalNum);
  if (pageSize * (curPage - 1) > totalNum) {
    curPage = 1;
  }

  return getListData();
}

// 使用Promise的主代码。
function dealWithPromise() {
  return new Promise((resolve, reject) => {
    getListCount().then(res => {
      totalNum = res;
      console.log('Get count', res);
      if (pageSize * (curPage - 1) > totalNum) {
        curPage = 1;
      }

      return getListData()
    }).then(resolve).catch(reject);
  });
}

// 开始执行dealWithAsync函数。
// dealWithAsync().then(res => {
//   console.log('Get Data', res)
// }).catch(err => {
//   console.log(err);
// });

// 开始执行dealWithPromise函数。
// dealWithPromise().then(res => {
//   console.log('Get Data', res)
// }).catch(err => {
//   console.log(err);
// });

function getListCount() {
  return createPromise(100).catch(() => {
    throw 'Get list count error';
  });
}

function getListData() {
  return createPromise([], {
    curPage: curPage,
    pageSize: pageSize,
  }).catch(() => {
    throw 'Get list data error';
  });
}


function createPromise(
  data, // Reback data
  params = null, // Request params
  isSucceed = true,
  timeout = 1000,
) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      isSucceed ? resolve(data) : reject(data);
    }, timeout);
  });
}