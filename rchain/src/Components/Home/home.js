import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { Responsive } from 'semantic-ui-react';
import Footer from '../Menu/footer';
import TopNav from '../Menu/nav';
import headerImage from '../../Assets/rc.png';
import ListCoursesHome from '../Course/listCourseHome';
import { Carousel } from "react-responsive-carousel";
import slide1 from '../../Assets/slide1.png';
import slide2 from '../../Assets/slide2.png';
import './home.css';


export class Home extends PureComponent {

  componentDidMount(){
    window.scrollTo(0, 0);
  }

  render() {

    const header = {
      // backgroundImage: `url(${headerImage})`,
      // backgroundPosition: 'center',
      // backgroundSize: 'cover',
      // backgroundRepeat: 'no-repeat',
      height: '100%',
      width: '100%',
      display: 'flex', 
      alignItems: 'center'
    }

    return (
      <div>
        <TopNav />

        <div style={{marginTop: '70px'}}>
          <Responsive style={header} minWidth={Responsive.onlyTablet.minWidth}>
            <Carousel infiniteLoop={true}  autoPlay>
              <div>
                <img src={slide2} alt='pix'/>
                <p className="legend">Legend 1</p>
              </div>
              <div>
                <img src={slide2} alt='pix' />
                <p className="legend">Legend 2</p>
              </div>
             
            </Carousel>
          </Responsive>
          <Responsive style={{...header, height: '100%'}} maxWidth={Responsive.onlyMobile.maxWidth}>
          <Carousel autoPlay>
              <div>
                <img src={slide2} alt='pix' />
                <p className="legend">Legend 1</p>
              </div>
              <div>
                <img src={slide2} alt='pix'/>
                <p className="legend">Legend 2</p>
              </div>
             
            </Carousel>
          </Responsive>

          <ListCoursesHome />
        </div>

        <Footer />
      </div>
    )
  }
}
export default withRouter(Home);
