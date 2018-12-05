let count = 0
export default {
  __setCount(__count){
    count = __count
  },
  async GetNotifications(){
    console.warn('GJ! Using mocking service!')
    return {count}
  }
}