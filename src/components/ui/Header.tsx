import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BsBellFill, BsMoonFill, BsQuestionCircle, BsSearch, BsSunFill } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import useInput from '../../hooks/useInput.ts';
import UserProfile from "../UserProfile.tsx";

export default function Header() {
  const navigate = useNavigate();
  // TODO: 실제 userprofile 값으로 변경하기
  const userprofile = '/images/test_userprofile.png';
  // 검색
  const [searchTag, onChageSearchTag] = useInput('');
  // 다크모드 localstorage에서 체크
  const [isChecked, setIsChecked] = useState(localStorage.theme === 'dark');
  // 헤더 bottom
  const { pathname } = useLocation();
  const [isLogin, setIsLogin] = useState(pathname === '/login' || pathname === '/signup' || pathname === '/pwinquiry');
  // userProfile click
  const [isProfileClick, setIsProfileClick] = useState(false);

  // 검색창에서 엔터를 눌렀을 때, 검색 페이지로 이동
  const activeEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate(`/search/${e.currentTarget.value}`);
    }
  };

  // 다크모드 변경
  const themeModeHandler = useCallback(() => {
    if (!isChecked) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.removeItem('theme');
    }
    setIsChecked(!isChecked);
  },[isChecked]);

  // 로그인 하기 전, border-bottom을 보여주지 않기 위한 로직
  useEffect(() => {
    setIsLogin(pathname === '/login' || pathname === '/signup' || pathname === '/pwinquiry');
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 flex-row-center justify-between pt-[1.2rem] w-full h-[5.7rem]   
      ${isLogin ? '' : 'border-solid border-b border-header-gray'}`}
    >

      {/*로고 + 글자 (메인페이지로 이동)*/}
      <div className={'flex ml-32'}>
        <nav className={'flex flex-row cursor-pointer'} onClick={() => navigate('/')}>
          <img className={'mr-4 h-10'} src={'/images/mainLogo.png'} alt={'main-logo'} />
          <span className={'flex-row-center font-logo text-[2.3rem] font-semibold text-gray-dark'}>
            upLog
          </span>
        </nav>

        {/*TODO : 스토리지 값 체크후에 변경하기 (조건으로 렌더링 여부 바꿔야함)*/}
        <div className={'flex-row-center ml-4 h-9 border-solid border-r border-header-gray'}></div>
      </div>
      {/*TODO : 스토리지 값 체크후에 변경하기 (조건으로 렌더링 여부 바꿔야함)*/}
      {/*로그인 상태*/}
      {isLogin && (
        <div className={'flex w-[28rem] h-full justify-between mr-12 font-bold items-center '}>
          {/*검색창*/}
          <div
            className={
              'flex-row-center justify-between w-48 h-3/5 p-2  border-solid border border-gray-light rounded-lg'
            }
          >
            <BsSearch className={'ml-2 text-base fill-gray-dark '} />

            <input
              type="text"
              value={searchTag}
              onChange={onChageSearchTag}
              onKeyDown={(e) => activeEnter(e)}
              placeholder={'검색'}
              maxLength={20}
              required
              className={`w-[8.7rem] h-full font-medium text-gray-dark ${
                isChecked ? 'bg-[#292723]' : 'bg-[#ffffff]'
              }`}
            />
          </div>
          {/*아이콘*/}
          <div className={'text-[1.8rem] '} onClick={themeModeHandler}>
            {isChecked ? (
              <BsMoonFill className={'fill-gray-dark cursor-pointer'} />
            ) : (
              <BsSunFill className={'fill-gray-dark cursor-pointer'} />
            )}
          </div>
          <BsBellFill
            className={'text-[1.8rem] fill-gray-dark cursor-pointer'}
            onClick={() => navigate('/')}
          />
          <BsQuestionCircle
            className={'text-[1.8rem] fill-gray-dark cursor-pointer'}
            onClick={() => navigate('/')}
          />
          <div >

          {userprofile ? (
            <FaUserCircle className={'text-[2.1rem] fill-gray-dark cursor-pointer'} onClick={() => setIsProfileClick(!isProfileClick)}/>
          ) : (
            <img
              src={userprofile}
              alt="userprofile"
              className={'w-[2.1rem] h-[2.1rem] cursor-pointer'}
            />
          )}
          {isProfileClick && <UserProfile />}
          </div>

        </div>
      )}

      {/*로그인 X */}
      {!isLogin && (
        <div className={'flex mr-12 font-bold'}>
          <div className={'text-[1.8rem] mr-6'} onClick={themeModeHandler}>
            {isChecked ? (
              <BsMoonFill className={'fill-gray-dark cursor-pointer'} />
            ) : (
              <BsSunFill className={'fill-gray-dark cursor-pointer'} />
            )}
          </div>

          <span
            className={'flex self-end text-gray-dark text-xl cursor-pointer'}
            onClick={() => navigate('/login')}
          >
            로그인
          </span>
          <span className={'flex self-end text-gray-dark text-xl'}>&nbsp;•</span>
          <span
            className={'flex self-end text-gray-dark text-xl cursor-pointer'}
            onClick={() => navigate('/signup')}
          >
            &nbsp;회원가입
          </span>
        </div>
      )}
    </header>
  );
}
