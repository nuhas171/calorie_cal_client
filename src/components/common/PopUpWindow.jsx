import React from 'react';

import TagsEditForm from '../../circle/Settings/Tags/TagsEditForm';
import AddUserComponent from '../../circle/Settings/Users/AddUserComponent';
import EditProfile from '../../Profile/EditProfile';
import AddTagComponent from '../../../components/circle/Settings/Tags/AddTagComponent';
import InviteUserComponent from '../../../components/circle/Settings/Users/InviteUserComponent';
import FaqEditForm from '../../../components/circle/Settings/Faqs/FaqEditForm';
import FaqForm from '../../../components/circle/Settings/Faqs/FaqForm';
import PopUp from './PopUp';

import './PopUpWindow.scss';


const PopUpWindow = ({trigger,setTrigger,setToggleButton,popupType,rowInfo,setRowInfo,settagEditForm}) => {
  console.log(popupType);
    return trigger ? (
        
          <>
            {popupType === 'addfaqForm' && <PopUp title='Add FAQ' trigger={trigger} setTrigger={setTrigger}><FaqForm trigger={trigger} setTrigger={setTrigger}/></PopUp>}
            {popupType === 'editFaq' && <PopUp title='Edit FAQ' trigger={trigger} setTrigger={setTrigger}><FaqEditForm trigger={trigger} setTrigger={setTrigger} rowInfo={rowInfo} setRowInfo={setRowInfo}/></PopUp>}
            {popupType === 'adduser' && <PopUp title='Add User' trigger={trigger} setTrigger={setTrigger}><AddUserComponent  trigger={trigger} setTrigger={setTrigger}/></PopUp>}
            {popupType === 'inviteduser' && <PopUp title='Pending invitations' trigger={trigger} setTrigger={setTrigger}><InviteUserComponent/></PopUp>}
            {popupType === 'tagform' && <PopUp title='Add Tag' trigger={trigger} setTrigger={setTrigger}><AddTagComponent trigger={trigger} setTrigger={setTrigger} /></PopUp>}
            {popupType === 'editTag' && <PopUp title='Edit Tag' trigger={trigger} setTrigger={settagEditForm}><TagsEditForm trigger={trigger} setTrigger={setTrigger} rowInfo={rowInfo} setRowInfo={setRowInfo}/></PopUp>}
            {popupType === 'editprofile' && <PopUp title='Edit Profile' trigger={trigger} setTrigger={setTrigger}><EditProfile trigger={trigger} setTrigger={setTrigger} rowInfo={rowInfo} setRowInfo={setRowInfo} setTrigger={setTrigger}/></PopUp>}
            
          </>
        
        
      ) : null;
}

export default PopUpWindow
