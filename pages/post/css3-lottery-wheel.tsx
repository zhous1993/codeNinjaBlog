import LotteryWheel from '@/components/LotteryWheel';
import Layout from '@/components/layout';
import React, { Component } from 'react';

export default class CSS3LotteryWheel extends Component<{}, { awardList: Array<any> }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      awardList: [
        { name: '一等奖', id: '0' },
        { name: '二等奖', id: '1' },
        { name: '三等奖', id: '2' },
        { name: '四等奖', id: '3' },
        { name: '四等奖', id: '4' },
        { name: '四等奖', id: '5' },
        { name: '四等奖', id: '6' },
        { name: '四等奖', id: '7' },
        { name: '四等奖', id: '8' },
      ],
    };
  }
  render() {
    const { awardList } = this.state;
    return (
      <Layout>
        <div className="flex justify-center">
          <LotteryWheel awardList={awardList} />
        </div>
      </Layout>
    );
  }
}
