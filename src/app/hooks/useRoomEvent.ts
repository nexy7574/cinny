import { MatrixEvent, Room } from 'matrix-js-sdk';
import { useCallback, useEffect } from 'react';
import to from 'await-to-js';
import { CryptoBackend } from 'matrix-js-sdk/lib/common-crypto/CryptoBackend';
import { useMatrixClient } from './useMatrixClient';
import { AsyncStatus, useAsyncCallback } from './useAsyncCallback';

const useFetchEvent = (room: Room, eventId: string) => {
  const mx = useMatrixClient();

  const fetchEventCallback = useCallback(async () => {
    const evt = await mx.fetchRoomEvent(room.roomId, eventId);
    const mEvent = new MatrixEvent(evt);

    if (mEvent.isEncrypted() && mx.getCrypto()) {
      await to(mEvent.attemptDecryption(mx.getCrypto() as CryptoBackend));
    }

    return mEvent;
  }, [mx, room.roomId, eventId]);

  return useAsyncCallback(fetchEventCallback);
};

/**
 *
 * @param room
 * @param eventId
 * @returns `MatrixEvent`, `undefined` means loading, `null` means failure
 */
export const useRoomEvent = (room: Room, eventId: string) => {
  const event = room.findEventById(eventId);

  const [fetchState, fetchEvent] = useFetchEvent(room, eventId);

  useEffect(() => {
    if (!event) {
      fetchEvent();
    }
  }, [event, fetchEvent]);

  if (event) return event;

  if (fetchState.status === AsyncStatus.Idle || fetchState.status === AsyncStatus.Loading)
    return undefined;

  if (fetchState.status === AsyncStatus.Success) return fetchState.data;

  return null;
};
