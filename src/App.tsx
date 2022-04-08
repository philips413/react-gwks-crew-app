import React, {useEffect} from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import styled from 'styled-components';
import CrewListPage from './pages/crew/CrewListPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/home/HomePage';
import {TiHome, TiThMenu, TiUserOutline} from "react-icons/ti";
import './assets/css/main.scss';
import MyPage from './pages/mypage/MyPage';
import KakaoRedirectPage from './pages/login/KakaoRedirectPage';
import KakaoLoginPage from './pages/login/KakaoLoginPage';
import Test from './pages/Test';
import SignUpPage from './pages/join/SignUpPage';
import CrewDetailPage from './pages/crew/CrewDetailPage';
import {StorageUtil} from './config/BrowserUtil';
import MyInfoPage from './pages/mypage/MyInfoPage';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
`

const CrewSection = styled.div`
  width: 100%;
  min-width: 50%;
`

const AdsContainer = styled(CrewSection)`
  display: block;
  @media screen and (max-width: 1080px) {
    display: none;
  }
  div {
    width: 100%;
  }
`

const MainContainer = styled(CrewSection)`
  display: block;
  .mainWrapper {
    display: block;
    position: relative;
    width: 720px;
    height: 100%;
    min-height: calc(100% - 50px);
    main {
      width: 100%;
      max-width: 720px;
      position: relative;
      bottom: 50px;
      overflow: auto;
      overflow-x: hidden;
      padding: 10px 10px;
      display: block;
    }
    footer {
      width: 100%;
      max-width: 720px;
      height: 60px;
      bottom: 0px;
      display: flex;
      justify-content: space-between;
      color: var(--bs-white);
      position: fixed;
      background: #222;
      z-index: 1;
    }
    @media screen and (max-width: 1080px) {
      width: 100%;
      main {
        max-width: none;
      }
      footer {
        max-width: none;
      }
    }
  }
`

const MainButtonGroup = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  a {
    text-decoration: none;
    text-align: center;
    width: 100%;
    font-size: 20px;
    color: var(--grey-dark);
    p {
      padding-top: 0px;
      font-size: 10px;
    }
  }
`

function App() {
    useEffect(() => {
        return (() => {
            StorageUtil.local.doInitToken();
        });
    }, []);
    return (
        <div className="App">
            <Wrapper>
                <AdsContainer>
                    <div>💡 앱 출시 예정</div>
                </AdsContainer>
                <MainContainer>
                    <section className={"mainWrapper"}>
                        <Routes>
                            <Route path={"/"} element={<HomePage title="광성마을 크루앱" />} />
                            <Route path={"/list"} element={<CrewListPage title="크루 회원" />} />
                            <Route path={"/login"} element={<LoginPage title={"로그인"} />} />
                            <Route path={"/join"} element={<SignUpPage title={"회원가입"} />} />
                            <Route path={"/mypage/:userid"} element={<MyInfoPage title={"내 정보 수정"} />} />
                            <Route path={"/mypage"} element={<MyPage title={"내 정보"} />} />
                            <Route path={"/login/kakao"} element={<KakaoLoginPage title={"카카오 로그인 페이지"} />} />
                            <Route path={"/login/kakao/callback"} element={<KakaoRedirectPage title={"카카오 리다이렉트 페이지"} />} />
                            <Route path={"/test"} element={<Test />} />
                            <Route path={"/crew_detail/:id"} element={<CrewDetailPage title={"크루 상세설명"} />} />
                        </Routes>
                        <footer className={"mainFooter"}>
                            <MainButtonGroup>
                                <Link to="/">
                                    <TiHome />
                                    <p>HOME</p>
                                </Link>
                                <Link to="/list">
                                    <TiThMenu />
                                    <p>LIST</p>
                                </Link>
                                <Link to="/mypage">
                                    <TiUserOutline />
                                    <p>MYPAGE</p>
                                </Link>
                            </MainButtonGroup>
                        </footer>
                    </section>
                </MainContainer>
            </Wrapper>
        </div>
    );
}

export default App;
