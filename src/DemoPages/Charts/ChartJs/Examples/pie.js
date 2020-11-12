import React from 'react';
import { Pie } from 'react-chartjs-2';

class PieExample extends React.Component {
  render() {
    let acknowledgedArr = [];
    let notAcknowledgedArr = [];

    this.props.data.map((post) => {
      if (post.acknowledged.acknowledgedStatus) {
        acknowledgedArr.push(post);
      } else {
        notAcknowledgedArr.push(post);
      }
    });

    const data = {
      labels: ['Total Crimes Acknowledged', 'Total Crimes Not Acknowledged'],
      datasets: [
        {
          data: [acknowledgedArr.length, notAcknowledgedArr.length],
          backgroundColor: ['#8dace7', '#71deb9'],
          hoverBackgroundColor: ['#8dace7', '#71deb9'],
        },
      ],
    };
    return (
      <div>
        <Pie dataKey='value' data={data} />
      </div>
    );
  }
}

export default PieExample;
