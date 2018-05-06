import React, { Component } from 'react';

class Hours extends Component {

  render() {
    return (
      <table className="hours">
        <tbody>
        {this.props.hours.map((hoursItem,idx) => {
            return (
              <tr key={idx}>
                <td>{hoursItem.FormattedDayLabel}</td>
                <td>{hoursItem.FormattedOpenAndCloseTime}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Hours;