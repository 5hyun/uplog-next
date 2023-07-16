import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BsBellFill, BsQuestionCircle, BsSearch, BsSunFill } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import useInput from '../../hooks/useInput.ts';
import useDarkSide from '../../hooks/useDarkSide.ts';

export default function Header() {
  // TODO: 실제 userprofile 값으로 변경하기
  const userprofile = '/images/test_userprofile.png';
  const [searchTag, onChageSearchTag, setSearchTag] = useInput('');

  const navigate = useNavigate();

  // 검색창에서 엔터를 눌렀을 때, 검색 페이지로 이동
  const activeEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate(`/search/${e.currentTarget.value}`);
    }
  };

  // 다크모드 변경
  // 현재 사용자의 상태 값에 따른 모드 설정
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(colorTheme === 'light');

  const themeModeHandle = () => {};
  // 로그인 하기 전, border-bottom을 보여주지 않기 위한 로직
  const { pathname } = useLocation();
  const [isLogin, setIsLogin] = useState(pathname === '/login' || pathname === '/signup');

  useEffect(() => {
    setIsLogin(pathname === '/login' || pathname === '/signup');
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 flex-row-center justify-between pt-[1.5rem] w-full h-[5.5rem]   ${
        isLogin ? '' : 'border-solid border-b border-header-gray'
      }`}
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
              'flex-row-center justify-between w-48 h-3/5 p-2 mt-1 border-solid border border-gray-light rounded-lg'
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
              className={'w-[8.7rem] h-full font-medium text-gray-dark'}
            />
          </div>
          {/*아이콘*/}
          <BsSunFill
            className={'text-[2.1rem] fill-gray-dark cursor-pointer'}
            onClick={themeModeHandle}
          />
          <BsBellFill
            className={'text-[2.1rem] fill-gray-dark cursor-pointer'}
            onClick={() => navigate('/')}
          />
          <BsQuestionCircle
            className={'text-[2.1rem] fill-gray-dark cursor-pointer'}
            onClick={() => navigate('/')}
          />
          {userprofile ? (
            <FaUserCircle className={'text-[2.1rem] fill-gray-dark cursor-pointer'} />
          ) : (
            <img
              src={userprofile}
              alt="userprofile"
              className={'w-[2.1rem] h-[2.1rem] cursor-pointer'}
            />
          )}
        </div>
      )}
      {/*로그인 X */}
      {!isLogin && (
        <div className={'flex mr-12 font-bold'}>
          <BsSunFill className={'text-[2.1rem] mr-6 fill-gray-dark'} />
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
