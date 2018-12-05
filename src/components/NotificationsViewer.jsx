import NotificationService from '../services/NotificationService'
import React from 'react';

export default class extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      count: -1
    }
  }

  async componentDidMount() {
    let { count } = await NotificationService.GetNotifications()
    this.setState({
      count
    })
  }

  render() {
    const { count } = this.state
    return (
      <section className="mt-d mb-2">
        <div className="notifications">
          {count != -1 ? `${count} Notifications Awaiting` : 'Loading...'}
        </div>
      </section>
    )
  }
}