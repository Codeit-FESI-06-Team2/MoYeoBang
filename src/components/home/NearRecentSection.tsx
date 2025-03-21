import { getGatheringsDateTime } from '@/axios/gather/apis';
import NearRecent from '@/components/home/NearRecent';

export default async function NearRecentSection() {
  const gatheringsDateTime = await getGatheringsDateTime();

  return <NearRecent gatherings={gatheringsDateTime} />;
}
