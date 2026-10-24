import MissionCard from '../MissionCard/MissionCard';
import MissionPanel from '../MissionPanel/MissionPanel';
import { useMissions } from '../../hooks/useMissions/useMissions';

const MissionList = () => {
  const { missions } = useMissions();

  return (
    <>
      {missions.map((mission) => {
        const required = mission.requires
          ? missions.find((item) => item.id === mission.requires)
          : undefined;

        return (
          <MissionCard
            key={mission.id}
            mission={mission}
            requirementText={required ? `Completa "${required.title}" para habilitar esta misión.` : undefined}
          >
            <MissionPanel mission={mission} />
          </MissionCard>
        );
      })}
    </>
  );
};

export default MissionList;
