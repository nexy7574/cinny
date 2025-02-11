import { atom } from 'jotai';
import { ImportRoomKeyProgressData } from 'matrix-js-sdk/lib/crypto-api';

export enum BackupProgressStatus {
  Idle,
  Fetching,
  Loading,
  Done,
}
export type ProgressData = {
  downloaded: number;
  successes: number;
  failures: number;
  total: number;
};
export type IBackupProgress =
  | {
      status: BackupProgressStatus.Idle;
    }
  | {
      status: BackupProgressStatus.Fetching;
    }
  | {
      status: BackupProgressStatus.Loading;
      data: ProgressData;
    }
  | {
      status: BackupProgressStatus.Done;
    };

const baseBackupRestoreProgressAtom = atom<IBackupProgress>({
  status: BackupProgressStatus.Idle,
});

export const backupRestoreProgressAtom = atom<
  IBackupProgress,
  [ImportRoomKeyProgressData],
  undefined
>(
  (get) => get(baseBackupRestoreProgressAtom),
  (get, set, progress) => {
    if (progress.stage === 'fetch') {
      set(baseBackupRestoreProgressAtom, {
        status: BackupProgressStatus.Fetching,
      });
      return;
    }

    if (progress.stage === 'load_keys') {
      const { total, successes, failures } = progress;
      if (total === undefined || successes === undefined || failures === undefined) {
        // Setting to idle as https://github.com/matrix-org/matrix-js-sdk/issues/4703
        set(baseBackupRestoreProgressAtom, {
          status: BackupProgressStatus.Idle,
        });
        return;
      }
      const downloaded = successes + failures;
      if (downloaded === total) {
        set(baseBackupRestoreProgressAtom, {
          status: BackupProgressStatus.Done,
        });
        return;
      }
      set(baseBackupRestoreProgressAtom, {
        status: BackupProgressStatus.Loading,
        data: {
          downloaded,
          successes,
          failures,
          total,
        },
      });
    }
  }
);
