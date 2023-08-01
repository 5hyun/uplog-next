import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BsChevronCompactDown } from 'react-icons/bs';
import { Task } from '@/typings/project.ts';
import { Progress, Select, Space } from 'antd';
import StatusBoard from '@/components/Project/Board/StatusBoard.tsx';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

export default function Project() {
  const { product, project, group, subGroup } = useParams();

  const navigate = useNavigate();

  // recoil에서 받아올 값
  const taskList: Task[] = [
    {
      id: 0,
      name: 'task1',
      status: 'before',
      group: '개발팀',
      menu: '요구사항',
      targetMember: 'OCI(오채영)',
    },
    {
      id: 1,
      name: 'task2',
      status: 'before',
      group: '개발팀',
      menu: '요구사항',
      targetMember: 'OCI(오채영)',
    },
    {
      id: 2,
      name: 'task3',
      status: 'before',
      group: '마케팅팀',
      menu: '요구사항',
      targetMember: 'OCI(오채영)',
    },
    {
      id: 3,
      name: 'task4',
      status: 'going',
      group: '마케팅팀',
      menu: '테스트',
      targetMember: 'OCI(오채영)',
    },
    {
      id: 4,
      name: 'task5',
      status: 'going',
      group: '홍보팀',
      menu: '테스트',
      targetMember: 'OCI(오채영)',
    },
    {
      id: 5,
      name: 'task6',
      status: 'going',
      group: '홍보팀',
      menu: '요구사항',
      targetMember: 'OCI(오채영)',
    },
    {
      id: 6,
      name: 'task7',
      status: 'done',
      group: '개발팀',
      menu: '요구사항',
      targetMember: 'OCI(오채영)',
    },
    {
      id: 7,
      name: 'task8',
      status: 'before',
      group: '마케팅',
      menu: '요구사항',
      targetMember: 'OCI(오채영)',
    },
    {
      id: 8,
      name: 'task9',
      status: 'done',
      group: '백엔드',
      menu: '테스트',
      targetMember: 'OCI(오채영)',
    },
    {
      id: 9,
      name: 'task10',
      status: 'done',
      group: '프론트엔드',
      menu: '요구사항',
      targetMember: 'OCI(오채영)',
    },
    {
      id: 10,
      name: 'task11',
      status: 'before',
      group: '프론트엔드',
      menu: '테스트',
      targetMember: 'OCI(오채영)',
    },
    {
      id: 11,
      name: 'task12',
      status: 'before',
      group: '백엔드',
      menu: '요구사항',
      targetMember: 'OCI(오채영)',
    },
    {
      id: 12,
      name: 'task13',
      status: 'going',
      group: '프론트엔드',
      menu: '테스트',
      targetMember: 'OCI(오채영)',
    },
  ];

  // 그룹으로 필터링 된 값
  const progress = 77;
  const [isKanban, setIsKanban] = useState(true);

  const onClickKanban = useCallback((check: boolean) => {
    setIsKanban(check);
  }, []);

  const pGroup = ['그룹', '개발팀', '마케팅팀', '홍보팀'];
  const cGroup = {
    그룹: ['하위그룹'],
    개발팀: ['전체', '프론트엔드', '백엔드', '풀스택'],
    마케팅팀: ['전체', '콘텐츠', '디자인'],
    홍보팀: ['전체', 'SNS', '기사'],
  };

  type ChildGroup = keyof typeof cGroup;

  const [parentGroup, setParentGroup] = useState(cGroup[pGroup[0] as ChildGroup]);
  const [childGroup, setChildGroup] = useState(cGroup[pGroup[0] as ChildGroup][0]);

  const [filterGroup, setFilterGroup] = useState(pGroup[0]);

  const [filterTaskList, setFilterTaskList] = useState(taskList);

  const handleParentGroupChange = (value: ChildGroup) => {
    // 선택한 상위그룹내용으로 하위 그룹 option으로 변경
    setParentGroup(cGroup[value]);
    setChildGroup(cGroup[value][0]);

    // 선택한 상위 그룹으로 필터링된 페이지로 이동
    setFilterGroup(value);
  };

  const onChildGroupChange = (value: ChildGroup) => {
    // 선택한 하위 그룹으로 필터링된 페이지로 이동
    setChildGroup(value);
  };

  // 필터링 된 페이지로 이동
  useEffect(() => {
    if (filterGroup === '그룹') {
      navigate(`/workspace/${product}/${project}`);
    } else {
      childGroup === '전체'
        ? navigate(`/workspace/${product}/${project}/group/${filterGroup}`)
        : navigate(`/workspace/${product}/${project}/group/${filterGroup}/${childGroup}`);
    }
  }, [filterGroup, childGroup]);

  // task 데이터 필터링된 그룹에 맞게 필터링
  useEffect(() => {
    if (filterGroup === '그룹') return;

    if (childGroup === '전체') {
      const allGroup = cGroup[filterGroup];

      // 현재 Group name으로 필터링 한 결과
      const firstGroup = taskList.filter((task) => task.group === filterGroup);

      // 현재 Group에 해당하는 subGroup들도 포함해서 필터링 한 결과
      for (let i = 1; i < allGroup.length; i++) {
        firstGroup.push(...taskList.filter((task) => task.group === allGroup[i]));
        console.log(i, firstGroup);
      }
      setFilterTaskList(firstGroup);
    } else {
      setFilterTaskList(taskList.filter((task) => task.group === childGroup));
    }
  }, [filterGroup, childGroup]);

  return (
    <section className={'flex-col justify-start w-noneSideBar h-full relative overflow-x-hidden'}>
      <div className={'w-noneSideBar h-[13.8rem] flex-col'}>
        <section className={'flex-row-center justify-start w-full h-[3.5rem] px-12 pt-4'}>
          {/*그룹 필터링*/}
          <div className={'flex-row-center w-[25rem] justify-between'}>
            {/*그룹 -> 하위로 바꾸기*/}
            <Space wrap>
              <Select
                defaultValue={pGroup[0]}
                style={{ width: 110 }}
                onChange={handleParentGroupChange}
                options={pGroup.map((group) => ({ label: group, value: group }))}
              />
              <Select
                style={{ width: 110 }}
                value={childGroup}
                onChange={onChildGroupChange}
                options={parentGroup.map((group) => ({ label: group, value: group }))}
              />
            </Space>
          </div>
        </section>
        {/*칸반, 스크럼 선택*/}
        <section className={'w-full h-[6rem]'}>
          <div className={'flex-row-center justify-center w-full h-full px-2 '}>
            <button type={'button'} onClick={() => onClickKanban(true)}>
              <span
                className={`text-3xl  ${
                  isKanban ? 'text-black font-bold' : 'text-gray-board font-semibold'
                }`}
              >
                칸반
              </span>
            </button>

            <div className={'mx-4 h-8 border-solid border-r border-[1px] border-gray-board'} />

            <button type={'button'} onClick={() => onClickKanban(false)}>
              <span
                className={`text-3xl  ${
                  !isKanban ? 'text-black font-bold' : 'text-gray-board font-semibold'
                }`}
              >
                스크럼
              </span>
            </button>
          </div>
        </section>
        {/*진행률*/}

        <section className={'flex-row-center justify-between w-noneSideBar h-[4.3rem]'}>
          {/*TODO : 스크럼 주차 정보 데이터로 처리 + 화살표 기능 추가*/}
          <div className={'flex w-1/3 h-full'} />
          <div className={'flex-row-center w-1/3 h-full'}>
            {!isKanban && (
              <div className={'flex-row-center w-full'}>
                <IoIosArrowBack className={'text-[1.5rem] text-gray-dark mr-2'} />
                <span className={'text-[1rem] text-gray-dark'}>1주차</span>
                <IoIosArrowForward className={'text-[1.5rem] text-gray-dark ml-2'} />
              </div>
            )}
          </div>

          <div className={'flex-row-center justify-end w-1/3 h-full pr-12'}>
            <span className={'flex-row-center text-[0.93rem] font-bold mr-4 text-gray-dark'}>
              진행률
            </span>
            <div className={'mt-2 self-center w-[15.6rem]'}>
              <Progress className={'progress'} percent={progress} />
            </div>
          </div>
        </section>
      </div>

      {/*보드*/}
      <div className={'w-noneSideBar h-board flex-col'}>
        <section className={'flex-col-center w-noneSideBar h-[90%]'}>
          <div className={'flex-row-center justify-between w-full h-full pt-8 px-[12rem]'}>
            <StatusBoard status={'before'} tasks={filterTaskList} />
            <StatusBoard status={'going'} tasks={filterTaskList} />
            <StatusBoard status={'done'} tasks={filterTaskList} />
          </div>
        </section>
        {/*하단페이지로 이동*/}
        <section className={'flex-row-center w-full h-[10%]'}>
          <BsChevronCompactDown className={'text-[4rem] text-gray-light'} />
        </section>
      </div>
    </section>
  );
}
