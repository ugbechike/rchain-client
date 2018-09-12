import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

export class Home extends PureComponent {

  componentDidMount(){
    window.scrollTo(0, 0);
  }

  render() {

    return (
      <div>
        this is home
      </div>
    )
  }
}
export default withRouter(Home);
