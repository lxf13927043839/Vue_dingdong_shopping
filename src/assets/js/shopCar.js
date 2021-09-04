/*
  传入商品列表，根据id找到对应的索引
  没有找到，返回 -1，否则返回索引
*/
export const findIndexFromList = function (listArray, id) {
  var index = 0
  index = listArray.findIndex((item) => {
    if (item.id === id) {
      return true
    }
  })
  // console.log(index)
  return index
}
