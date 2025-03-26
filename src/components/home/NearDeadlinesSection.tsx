import { getGatheringsByRegistrationEnd } from '@/axios/gather/apis';
import NearDeadlines from '@/components/home/NearDeadlines';

export default async function NearDeadlinesSection() {
  const gatheringsRegistrationEnd = await getGatheringsByRegistrationEnd();

  return <NearDeadlines gatherings={gatheringsRegistrationEnd} />;
}
