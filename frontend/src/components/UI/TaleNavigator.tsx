import TaleNavLogo from "../../assets/images/TaleNavLogo.png"
import Tutorial from "../../assets/images/TaleNav1Tutorial.png"
import Cards from "../../assets/images/TaleNav2Cards.png"
import MyPage from "../../assets/images/TaleNav3MyPage.png"
// import TaleNavLogoContainer from "../../assets/images/TaleNavLogoContainer.png"
import AnimationBox from "./AnimationBox"
import { useNavigate } from "react-router-dom"

const TaleNavigator = function () {
  const navigate = useNavigate()
  const pushHome = function () {
    navigate(`/`)
  }
  const pushMyPage = function () {
    navigate(`/mypage/progress`)
  }
  interface navItem {
    alt: string
    src: string
  }
  return (
    <div className="box-border fixed top-0 left-0 w-full h-[13.3%] flex flex-row justify-between py-3 px-5">
      <AnimationBox appearClassName="animate-appear-top-nav">
        <div
          className={`flex justify-center items-center w-auto h-full bg-tale-nav-logo-container bg-contain bg-no-repeat py-2 cursor-pointer hover:scale-[103%] duration-[0.22s]`}
          onClick={pushHome}
        >
          <img alt={`nav-logo`} src={TaleNavLogo} className="h-full" />
        </div>
      </AnimationBox>

      <div className="flex flex-row items-center justify-center gap-2 mobile:gap-3 lg:gap-5 w-auto box-border">
        <AnimationBox
          boxClasses="h-[90%]"
          appearClassName="animate-[appear-top-nav_0.66s_0.22s_both]"
        >
          <img
            className="h-full cursor-pointer hover:scale-[106%] duration-[0.22s]"
            alt="tutorial"
            src={Tutorial}
          />
        </AnimationBox>
        <AnimationBox
          boxClasses="h-[90%]"
          appearClassName="animate-[appear-top-nav_0.66s_0.33s_both]"
        >
          <img
            className="h-full cursor-pointer hover:scale-[106%] duration-[0.22s]"
            alt="cards"
            src={Cards}
          />
        </AnimationBox>
        <AnimationBox
          boxClasses="h-[90%]"
          appearClassName="animate-[appear-top-nav_0.66s_0.44s_both]"
        >
          <img
            className="h-full cursor-pointer hover:scale-[106%] duration-[0.22s]"
            alt="my-page"
            src={MyPage}
            onClick={pushMyPage}
          />
        </AnimationBox>
      </div>
    </div>
  )
}

export default TaleNavigator