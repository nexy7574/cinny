import React from 'react';

import ProfileViewer from '../profile-viewer/ProfileViewer';
import SpaceAddExisting from '../../molecules/space-add-existing/SpaceAddExisting';
import Search from '../search/Search';
import CreateRoom from '../create-room/CreateRoom';
import JoinAlias from '../join-alias/JoinAlias';

import ReusableDialog from '../../molecules/dialog/ReusableDialog';

function Dialogs() {
  return (
    <>
      <ProfileViewer />
      <CreateRoom />
      <JoinAlias />
      <SpaceAddExisting />
      <Search />

      <ReusableDialog />
    </>
  );
}

export default Dialogs;
