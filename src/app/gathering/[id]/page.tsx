export default function GatheringDetail({ params }: any) {
  const { id } = params;

  return (
    <div>
      {/* TEST: id 값을 정상적으로 로드 */}
      <h1 className="mt-36">Gathering ID: {id}</h1>
      <p>오정협 - 모임 상세페이지</p>
    </div>
  );
}
