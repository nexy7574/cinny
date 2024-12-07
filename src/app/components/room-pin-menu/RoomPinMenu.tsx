import React, { forwardRef } from 'react';
import { Room } from 'matrix-js-sdk';
import { Box, Header, Menu, Scroll, Text, toRem } from 'folds';
import { useRoomPinnedEvents } from '../../hooks/useRoomPinnedEvents';
import * as css from './RoomPinMenu.css';

type RoomPinMenuProps = {
  room: Room;
  requestClose: () => void;
};
export const RoomPinMenu = forwardRef<HTMLDivElement, RoomPinMenuProps>(
  ({ room, requestClose }, ref) => {
    const pinnedEvents = useRoomPinnedEvents(room);
    const pinnedData = pinnedEvents.map((eventId) => room.findEventById(eventId) ?? eventId);

    return (
      <Menu
        ref={ref}
        style={{ maxWidth: toRem(560), width: '100vw', display: 'flex', flexDirection: 'column' }}
      >
        <Header className={css.PinMenuHeader} size="500">
          <Box grow="Yes">
            <Text size="H5">Pinned Messages</Text>
          </Box>
          <Box shrink="No">
            <button type="button" onClick={requestClose}>
              close
            </button>
          </Box>
        </Header>
        <Box grow="Yes">
          <Scroll>
            {pinnedData.map((data) => {
              if (typeof data === 'string') return <p>{data}</p>;

              return <p>{data.getContent().body}</p>;
            })}
          </Scroll>
        </Box>
      </Menu>
    );
  }
);
