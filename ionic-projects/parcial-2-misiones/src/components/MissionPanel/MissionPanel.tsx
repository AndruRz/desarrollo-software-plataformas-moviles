import PhotoMissionPanel from '../PhotoMissionPanel/PhotoMissionPanel';
import MovementMissionPanel from '../MovementMissionPanel/MovementMissionPanel';
import StillnessMissionPanel from '../StillnessMissionPanel/StillnessMissionPanel';
import type { MissionView } from '../../types/mission';

type Props = {
  mission: MissionView;
};

const MissionPanel = ({ mission }: Props) => {
  switch (mission.kind) {
    case 'photo':
      return <PhotoMissionPanel missionId={mission.id} />;
    case 'movement':
      return <MovementMissionPanel missionId={mission.id} />;
    case 'stillness':
      return <StillnessMissionPanel missionId={mission.id} />;
    default:
      return null;
  }
};

export default MissionPanel;
