const cons = {
  version: '4.3.0',
  secretKey: {
    ACCESS_TOKEN: 'cinny_access_token',
    DEVICE_ID: 'cinny_device_id',
    USER_ID: 'cinny_user_id',
    BASE_URL: 'cinny_hs_base_url',
  },
  DEVICE_DISPLAY_NAME: 'Cinny Web',
  IN_CINNY_SPACES: 'in.cinny.spaces',
  supportEventTypes: [
    'm.room.create',
    'm.room.message',
    'm.room.encrypted',
    'm.room.member',
    'm.sticker',
  ],
  supportReceiptTypes: ['m.read', 'm.read.private'],
  notifs: {
    DEFAULT: 'default',
    ALL_MESSAGES: 'all_messages',
    MENTIONS_AND_KEYWORDS: 'mentions_and_keywords',
    MUTE: 'mute',
  },
  status: {
    PRE_FLIGHT: 'pre-flight',
    IN_FLIGHT: 'in-flight',
    SUCCESS: 'success',
    ERROR: 'error',
  },
  actions: {
    navigation: {
      OPEN_SPACE_SETTINGS: 'OPEN_SPACE_SETTINGS',
      OPEN_SPACE_ADDEXISTING: 'OPEN_SPACE_ADDEXISTING',
      TOGGLE_ROOM_SETTINGS: 'TOGGLE_ROOM_SETTINGS',
      OPEN_CREATE_ROOM: 'OPEN_CREATE_ROOM',
      OPEN_JOIN_ALIAS: 'OPEN_JOIN_ALIAS',
      OPEN_INVITE_USER: 'OPEN_INVITE_USER',
      OPEN_PROFILE_VIEWER: 'OPEN_PROFILE_VIEWER',
      OPEN_SEARCH: 'OPEN_SEARCH',
      OPEN_REUSABLE_CONTEXT_MENU: 'OPEN_REUSABLE_CONTEXT_MENU',
      OPEN_REUSABLE_DIALOG: 'OPEN_REUSABLE_DIALOG',
    },
  },
  events: {
    navigation: {
      SPACE_SETTINGS_OPENED: 'SPACE_SETTINGS_OPENED',
      SPACE_ADDEXISTING_OPENED: 'SPACE_ADDEXISTING_OPENED',
      ROOM_SETTINGS_TOGGLED: 'ROOM_SETTINGS_TOGGLED',
      CREATE_ROOM_OPENED: 'CREATE_ROOM_OPENED',
      JOIN_ALIAS_OPENED: 'JOIN_ALIAS_OPENED',
      INVITE_USER_OPENED: 'INVITE_USER_OPENED',
      SEARCH_OPENED: 'SEARCH_OPENED',
      REUSABLE_CONTEXT_MENU_OPENED: 'REUSABLE_CONTEXT_MENU_OPENED',
      REUSABLE_DIALOG_OPENED: 'REUSABLE_DIALOG_OPENED',
    },
  },
};

Object.freeze(cons);

export default cons;
