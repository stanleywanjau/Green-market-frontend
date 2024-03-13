import React from 'react'
import { AiOutlineFacebook,AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai';

const Footer = () => {
    return (
      <div className="footer">
        <div className="sb_footer section_padding">
          <div className="sb_footer-links">
            <div className="sb_footer-links-div">
              <h4>For Business</h4>
              
                <p>Employer</p>
              
              
                <p>Health Plan</p>
              
             
                <p>Individual</p>
             
            </div>
            <div className="sb_footer-links-div">
              <h4>Resources</h4>
             
                <p>Resource center</p>
              
             
                <p>Testimonials</p>
           
                <p>Svt</p>
              
            </div>
            <div className="sb_footer-links-div">
              <h4>About us</h4>
              
                <p>About  us</p>
             
              
                <p>Reviews</p>
          
                <p>Ratings</p>
            
            </div>
            <div className="sb_footer-links-div">
              <h4>Comming Soon on</h4>
              
                <p><AiOutlineFacebook size={"2rem"}></AiOutlineFacebook></p>
             
              
                <p><AiOutlineInstagram size={"2rem"}></AiOutlineInstagram></p>
              
              
                <p><AiOutlineTwitter  style={{ marginRight: "20px" }} size={"2rem"}></AiOutlineTwitter></p>
           
            </div>
            <div className="sb_footer-below">
        <div className="sb_footer-copyright">
          <p>&copy; {new Date().getFullYear()} GreenMarket. All right reserved.</p>
        </div>
            <div className="sb_footer-below-links">
             
            <div>
              <p>Terms & Conditions</p>
            </div>
          
          
            <div>
              <p>Privacy</p>
            </div>
          
          
            <div>
              <p>security</p>
            </div>
          
        </div>
        </div>
            
            
          </div>
        </div>
      </div>
    );
  }

export default Footer;