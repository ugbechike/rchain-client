import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import Footer from '../Menu/footer';
import TopNav from '../Menu/nav';
import headerImage from '../../Assets/rc.png';
import ListCourseHome from '../Course/listCourseHome';

export class Home extends PureComponent {

  componentDidMount(){
    window.scrollTo(0, 0);
  }

  render() {

    const header = {
      backgroundImage: `url(${headerImage})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      height: '600px',
      width: '100%',
      display: 'flex', 
      alignItems: 'center'
    }

    return (
      <div>
        <TopNav />

        <div style={{marginTop: '70px'}}>
          <div style={header}>

          </div>

          <ListCourseHome />
        </div>

        <Footer />
      </div>
    )
  }
}
export default withRouter(Home);
