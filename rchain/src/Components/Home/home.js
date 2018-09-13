import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { Responsive } from 'semantic-ui-react';
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
      height: '580px',
      width: '100%',
      display: 'flex', 
      alignItems: 'center'
    }

    return (
      <div>
        <TopNav />

        <div style={{marginTop: '70px'}}>
          <Responsive style={header} minWidth={Responsive.onlyTablet.minWidth}>

          </Responsive>
          <Responsive style={{...header, height: '410px'}} maxWidth={Responsive.onlyMobile.maxWidth}>

          </Responsive>

          <ListCourseHome />
        </div>

        <Footer />
      </div>
    )
  }
}
export default withRouter(Home);
