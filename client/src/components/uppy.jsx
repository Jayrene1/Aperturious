import React from "react";
import { DashboardModal } from "@uppy/react";
import '@uppy/core/dist/style.min.css'
import '@uppy/dashboard/dist/style.min.css'


const UppyProfilePhotoForm = ( props ) => {
  return (
    <div>
    </div>
  );
};

class UppyPhotoFormButton extends React.Component {
    state = {
        modalOpen: false
    } 
    
    handleOpen = () => {
      this.setState({
        modalOpen: true
      });
    }
  
    handleClose = () => {
      this.setState({
        modalOpen: false
      });
    }
  
    render () {
      return (
        <div>
          <button className="waves-effect btn" onClick={this.handleOpen}>Upload A New Photo <i className="material-icons right">add_a_photo</i></button>
          <DashboardModal
            uppy={this.props.uppy}
            closeModalOnClickOutside
            open={this.state.modalOpen}
            onRequestClose={this.handleClose}
            plugins={['Webcam']}
          />
        </div>
      );
    }
  }

export {
    UppyProfilePhotoForm,
    UppyPhotoFormButton
};