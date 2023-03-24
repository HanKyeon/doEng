import TaleStoreItem from "components/MyPageComponents/TaleStore/TaleStoreItem"
import { useStoreTaleList } from "hooks/queries/queries"

////////////////////////////////////////////////////////////////
// react query 사용해보기
const TaleStoreList = function () {
  const {
    isLoading: taleLoading,
    error: taleError,
    data: tale,
  } = useStoreTaleList()

  if (!tale) {
    return <div>잘못된 접근입니다.</div>
  }

  return (
    <>
      {taleLoading ? (
        <div>로딩 중</div>
      ) : tale ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {tale?.map((tale) => (
            <TaleStoreItem key={`tale-${tale.id}`} tale={tale} />
          ))}
        </div>
      ) : (
        <div>잘못된 접근입니다.</div>
      )}
    </>
  )
}

export default TaleStoreList

const exData = {
  taleList: [
    {
      id: 1,
      title: "백설공주",
      backgroundImage: "http://image.yes24.com/goods/62494205/XL",
      score: 3.8,
      purchased: true,
    },
    {
      id: 2,
      title: "신데렐라",
      backgroundImage:
        "https://cdn.imweb.me/upload/S20210128257d7c0c29db4/ba5c87dbaa546.png",
      score: 4.5,
      purchased: false,
    },
    {
      id: 3,
      title: "백설공주",
      backgroundImage: "http://image.yes24.com/goods/62494205/XL",
      score: 3.8,
      purchased: true,
    },
    {
      id: 4,
      title: "신데렐라",
      backgroundImage:
        "https://cdn.imweb.me/upload/S20210128257d7c0c29db4/ba5c87dbaa546.png",
      score: 4.5,
      purchased: false,
    },
    {
      id: 5,
      title: "백설공주",
      backgroundImage: "http://image.yes24.com/goods/62494205/XL",
      score: 3.8,
      purchased: true,
    },
    {
      id: 6,
      title: "신데렐라",
      backgroundImage:
        "https://cdn.imweb.me/upload/S20210128257d7c0c29db4/ba5c87dbaa546.png",
      score: 4.5,
      purchased: false,
    },
    {
      id: 7,
      title: "백설공주",
      backgroundImage: "http://image.yes24.com/goods/62494205/XL",
      score: 3.8,
      purchased: true,
    },
    {
      id: 8,
      title: "신데렐라",
      backgroundImage:
        "https://cdn.imweb.me/upload/S20210128257d7c0c29db4/ba5c87dbaa546.png",
      score: 4.5,
      purchased: false,
    },
  ],
}