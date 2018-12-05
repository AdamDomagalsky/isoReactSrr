import {delay} from 'redux-saga';

export default {
  async GetNotifications(){
    console.warn('REAL NOTIF SERV! REALY CONTAINS APIS!')
    await delay(1000)
    return { count: 42}
  }
}