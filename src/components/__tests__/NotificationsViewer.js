import NotificationsViewer from '../NotificationsViewer';
import React from 'react';
import delay from 'redux-saga'
import renderer from 'react-test-renderer';

jest.mock('../../services/NotificationService') // to use mock
const notificationsService = require('../../services/NotificationService').default


describe('The notification viewer', () => {

  beforeAll(()=>{
    notificationsService.__setCount(5)
  })

  it('should display correct count of notificiations', async () => {
    const tree = renderer
    .create(
      <NotificationsViewer/>
    )

    await delay(4000)
    const instance = tree.root
    const component = instance.findByProps({className:'notifications'})
    const text = component.children[0]
    expect(text).toEqual('5 Notifications Awaiting')
  });
});