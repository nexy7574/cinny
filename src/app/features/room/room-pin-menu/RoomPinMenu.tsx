import React, { forwardRef } from 'react';
import { Room } from 'matrix-js-sdk';
import { Box, config, Header, Icon, IconButton, Icons, Menu, Scroll, Text } from 'folds';
import { useRoomPinnedEvents } from '../../../hooks/useRoomPinnedEvents';
import * as css from './RoomPinMenu.css';
import { SequenceCard } from '../../../components/sequence-card';
import { useRoomEvent } from '../../../hooks/useRoomEvent';

type PinnedMessageProps = {
  room: Room;
  eventId: string;
};
function PinnedMessage({ room, eventId }: PinnedMessageProps) {
  const pinnedEvent = useRoomEvent(room, eventId);

  if (pinnedEvent === undefined) return <Text>Loading...</Text>;
  if (pinnedEvent === null) return <Text>Failed to load!</Text>;

  return (
    <Box direction="Column">
      <Text>{pinnedEvent.getSender()}</Text>
      <Text>{pinnedEvent.getContent().body}</Text>
    </Box>
  );
}

type RoomPinMenuProps = {
  room: Room;
  requestClose: () => void;
};
export const RoomPinMenu = forwardRef<HTMLDivElement, RoomPinMenuProps>(
  ({ room, requestClose }, ref) => {
    const pinnedEvents = useRoomPinnedEvents(room);

    return (
      <Menu ref={ref} className={css.PinMenu}>
        <Box grow="Yes" direction="Column">
          <Header className={css.PinMenuHeader} size="500">
            <Box grow="Yes">
              <Text size="H5">Pinned Messages</Text>
            </Box>
            <Box shrink="No">
              <IconButton size="300" onClick={requestClose} radii="300">
                <Icon src={Icons.Cross} size="400" />
              </IconButton>
            </Box>
          </Header>
          <Box grow="Yes">
            <Scroll size="300" hideTrack visibility="Hover">
              <Box className={css.PinMenuContent} direction="Column" gap="200">
                {pinnedEvents.map((eventId) => (
                  <SequenceCard
                    key={eventId}
                    style={{ padding: config.space.S400 }}
                    variant="SurfaceVariant"
                    direction="Column"
                  >
                    <PinnedMessage room={room} eventId={eventId} />
                  </SequenceCard>
                ))}
              </Box>
            </Scroll>
          </Box>
        </Box>
      </Menu>
    );
  }
);
