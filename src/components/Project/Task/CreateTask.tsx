import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from '@chakra-ui/react';
import { useMessage } from '@/hooks/useMessage.ts';
import useInput from '@/hooks/useInput.ts';
import { SelectMenu, SubGroup } from '@/typings/project.ts';
import { DatePicker, DatePickerProps, Select } from 'antd';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { menuListData } from '@/recoil/Project/atom.ts';
import { productMemberList } from '@/recoil/Product/atom.ts';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
export default function CreateTask({ isOpen, onClose }: Props) {
  const { showMessage, contextHolder } = useMessage();

  const [taskName, onChangeTaskName, setTaskName] = useInput('');
  const [newTask, setNewTask] = useState({
    taskName: '',
    startTime: '',
    endTime: '',
    menuId: -1,
    projectTeamId: '',
    targetMemberId: -1,
    taskDetail: '',
  });

  const taskPeriod: SelectMenu[] = [
    { value: '7', label: '1주' },
    { value: '14', label: '2주' },
    { value: '21', label: '3주' },
    { value: '사용자 지정', label: '사용자 지정' },
  ];

  // const pGroup: GroupInfo[] = [
  //   {
  //     id: 1,
  //     name: '그룹',
  //   },
  //   {
  //     id: 2,
  //     name: '개발팀',
  //   },
  //   {
  //     id: 3,
  //     name: '마케팅팀',
  //   },
  //   {
  //     id: 4,
  //     name: '홍보팀',
  //   },
  // ];

  const pGroup: string[] = ['그룹', '개발팀', '마케팅팀', '홍보팀'];
  const cGroup: SubGroup = {
    그룹: ['하위그룹'],
    개발팀: ['전체', '프론트엔드', '백엔드', '풀스택'],
    마케팅팀: ['전체', 'SNS', '디자인'],
    홍보팀: ['전체', 'SNS', '기사'],
  };

  type ChildGroup = keyof typeof cGroup;

  const menuList = useRecoilValue(menuListData);
  const menuNameList: SelectMenu[] = menuList.map((menuItem) => ({
    value: menuItem.name,
    label: menuItem.name,
  }));

  const member = useRecoilValue(productMemberList);
  const memberList: SelectMenu[] = member.map((memberItem) => ({
    value: memberItem.id.toString(),
    label: `${memberItem.nickName}(${memberItem.name})`,
  }));

  const [isCustom, setIsCustom] = useState(true);
  const [isGroup, setIsGroup] = useState(false);

  const [parentGroup, setParentGroup] = useState(cGroup[pGroup[0] as ChildGroup]);
  const [childGroup, setChildGroup] = useState(cGroup[pGroup[0] as ChildGroup][0]);

  // task 사용자 입력값으로 지정 (select인 경우)
  const handleChange = (type: string) => (value: { value: string; label: React.ReactNode }) => {
    switch (type) {
      case 'date': {
        // 날짜 입력 타입이 사용자 지정이 아니면 custom 불가능하게
        if (value.value !== '사용자 지정') {
          setIsCustom(false);

          // 주차 계산
          const currentDate = new Date();
          const endDate = new Date(currentDate);
          endDate.setDate(currentDate.getDate() + +value.value);

          // task 날짜 정보 설정
          const updatedTask = {
            ...newTask,
            startTime: currentDate.toISOString().split('T')[0],
            endTime: endDate.toISOString().split('T')[0],
          };

          setNewTask(updatedTask);
        } else {
          setIsCustom(true);
          const updatedTask = {
            ...newTask,
            startTime: '',
            endTime: '',
          };

          setNewTask(updatedTask);
          console.log(newTask);
        }
        break;
      }
      case 'targetMemberId' || 'menuId': {
        // value값을 number로 변환
        const updatedTask = {
          ...newTask,
          [type]: +value.value,
        };

        setNewTask(updatedTask);
        break;
      }
      default: {
        const updatedTask = {
          ...newTask,
          [type]: value.value,
        };

        setNewTask(updatedTask);
      }
    }
    console.log(newTask);
  };

  // TODO : projectTeamId 값 group id 값으로 바꾸기
  // 상위그룹 select 선택 값
  const handleParentGroupChange = (value: string) => {
    // 선택한 상위그룹내용으로 하위 그룹 option으로 변경
    setParentGroup(cGroup[value]);
    setChildGroup(cGroup[value][0]);

    setIsGroup(true);

    const updatedTask = {
      ...newTask,
      projectTeamId: value,
    };

    setNewTask(updatedTask);
  };

  // 하위그룹 select 선택 값
  const onChildGroupChange = (value: string) => {
    setChildGroup(value);
    setIsGroup(true);

    const updatedTask = {
      ...newTask,
      projectTeamId: value,
    };

    setNewTask(updatedTask);
  };

  // 시작 날짜 입력 값
  const onChangeStartTime: DatePickerProps['onChange'] = (date, dateString) => {
    const updatedTask = {
      ...newTask,
      startTime: dateString,
    };

    setNewTask(updatedTask);
    console.log(newTask);
  };

  // 종료 날짜 입력 값
  const onChangeEndTime: DatePickerProps['onChange'] = (date, dateString) => {
    const updatedTask = {
      ...newTask,
      endTime: dateString,
    };

    setNewTask(updatedTask);
    console.log(newTask);
  };

  // task 상세설명 입력 값
  const onChangeTaskDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const updatedTask = {
      ...newTask,
      taskDetail: e.target.value,
    };

    setNewTask(updatedTask);
    console.log(newTask);
  };

  // task 이름 newTask에 저장
  useEffect(() => {
    const updatedTask = {
      ...newTask,
      taskName: taskName,
    };

    setNewTask(updatedTask);
    console.log(newTask);
  }, [taskName]);

  // 선택한 그룹 값 바뀔때마다 타겟 멤버 id 초기화
  useEffect(() => {
    const updatedTask = {
      ...newTask,
      targetMemberId: -1,
    };

    setNewTask(updatedTask);
    console.log('멤버 다시', newTask);
    // handleChange('targetMemberId')({ value: '-1', label: '할당자 선택' });
  }, [newTask.projectTeamId]);

  // 모달창이 새로 열릴 때 마다 값 초기화
  useEffect(() => {
    setNewTask({
      taskName: '',
      startTime: '',
      endTime: '',
      menuId: -1,
      projectTeamId: '',
      targetMemberId: -1,
      taskDetail: '',
    });
    setIsCustom(true);
    setTaskName('');
    setIsGroup(false);
    console.log(newTask);
  }, [isOpen]);

  // 완료 버튼 눌렀을 때
  const onClickCreateTask = useCallback(() => {
    // 빈 값이 있는지 예외처리
    if (newTask.taskName === '') {
      showMessage('warning', 'Task 이름을 입력해주세요.');
      return;
    }

    if (newTask.startTime === '' || newTask.endTime === '') {
      showMessage('warning', '날짜를 선택해주세요.');
      return;
    }

    if (newTask.projectTeamId === '') {
      showMessage('warning', '그룹을 선택해주세요.');
      return;
    }

    if (newTask.menuId === -1) {
      showMessage('warning', '메뉴를 선택해주세요.');
      return;
    }

    if (newTask.targetMemberId === -1) {
      showMessage('warning', '할당자를 선택해주세요.');
      return;
    }

    //TODO : Task 생성 API 연결
  }, [newTask]);
  return (
    <Modal isCentered onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent
        minW="40rem"
        h={'55rem'}
        shadow={'boxShadow-sign-up'}
        rounded={'none'}
        p={'1.2rem'}
        bg={'var(--white)'}
      >
        <ModalHeader
          fontSize={'1.8rem'}
          fontWeight={700}
          bg={'var(--white)'}
          color={'var(--black)'}
        >
          Task 생성
        </ModalHeader>
        <ModalCloseButton
          fontSize={'1rem'}
          color={'var(--gray-light)'}
          mt={'0.6rem'}
          mr={'0.8rem'}
        />
        <ModalBody>
          <Flex justifyContent={'center'} h={'100%'}>
            <section className={'flex-col-center justify-evenly w-[80%] h-full'}>
              {contextHolder}

              {/*Task 정보 입력 -> 제목*/}
              <div className={'w-full mt-4 mb-5 text-[1rem]'}>
                <span className={'flex mb-[0.5rem] text-gray-dark font-bold'}>Task 제목</span>
                <input
                  type="text"
                  value={taskName}
                  onChange={onChangeTaskName}
                  placeholder={'Task 제목을 입력해주세요.'}
                  maxLength={10}
                  className={
                    'w-full h-11 border-base border-gray-border text-[1rem] rounded-xl mb-2 p-4 text-black'
                  }
                />
              </div>

              {/*Task 기간 지정*/}
              <div className={'w-full mb-5 text-[1rem]'}>
                <span className={'flex mb-[0.5rem] text-gray-dark font-bold'}>기간 설정</span>
                <div className={'w-h-full'}>
                  <Select
                    labelInValue
                    defaultValue={{ value: '', label: '기간 선택' }}
                    onChange={handleChange('date')}
                    style={{ width: 120 }}
                    options={taskPeriod}
                    dropdownStyle={{
                      backgroundColor: 'var(--gray-sideBar)',
                      color: 'var(--black)',
                      borderColor: 'var(--border-line)',
                    }}
                  />
                </div>
              </div>

              {/* 날짜 선택*/}
              <div className={'flex-row-center w-full mb-5 text-[1rem]'}>
                <div className={'flex-col w-1/2'}>
                  <span className={'flex mb-[0.5rem] text-gray-dark font-bold'}>시작 날짜</span>

                  {isCustom ? (
                    <DatePicker onChange={onChangeStartTime} placement={'bottomLeft'} />
                  ) : (
                    <span className={'text-black ml-3'}>{newTask.startTime}</span>
                  )}
                </div>
                <div className={'flex-col w-1/2 ml-16'}>
                  <span className={'flex mb-[0.5rem] text-gray-dark font-bold'}>종료 날짜</span>
                  {isCustom ? (
                    <DatePicker onChange={onChangeEndTime} placement={'bottomLeft'} />
                  ) : (
                    <span className={'text-black ml-3'}>{newTask.endTime}</span>
                  )}
                </div>
              </div>

              {/*그룹*/}
              <div className={'w-full mb-5 text-[1rem]'}>
                <span className={'flex mb-[0.5rem] text-gray-dark font-bold'}>그룹</span>
                <div className={'flex justify-between pr-7'}>
                  <Select
                    defaultValue={pGroup[0]}
                    style={{ width: 120 }}
                    onChange={handleParentGroupChange}
                    options={pGroup.map((group) => ({ label: group, value: group }))}
                    dropdownStyle={{
                      backgroundColor: 'var(--gray-sideBar)',
                      color: 'var(--black)',
                      borderColor: 'var(--border-line)',
                    }}
                  />

                  <Select
                    style={{ width: 120 }}
                    value={childGroup}
                    onChange={onChildGroupChange}
                    options={parentGroup.map((group) => ({ label: group, value: group }))}
                    dropdownStyle={{
                      backgroundColor: 'var(--gray-sideBar)',
                      color: 'var(--black)',
                      borderColor: 'var(--border-line)',
                    }}
                  />
                </div>
              </div>

              {/*메뉴 + 할당자*/}
              <div className={'flex-row-center w-full mb-5 text-[1rem]'}>
                <div className={'flex-col w-1/2'}>
                  <span className={'flex mb-[0.5rem] text-gray-dark font-bold'}>메뉴</span>
                  <Select
                    labelInValue
                    defaultValue={{ value: '-1', label: '메뉴 선택' }}
                    onChange={handleChange('menuId')}
                    style={{ width: 120 }}
                    options={menuNameList}
                    dropdownStyle={{
                      backgroundColor: 'var(--gray-sideBar)',
                      color: 'var(--black)',
                      borderColor: 'var(--border-line)',
                    }}
                  />
                </div>
                <div className={'flex-col w-1/2 ml-16'}>
                  <span className={'flex mb-[0.5rem] text-gray-dark font-bold'}>할당자</span>
                  <Select
                    labelInValue
                    defaultValue={{ value: '-1', label: '할당자 선택' }}
                    onChange={handleChange('targetMemberId')}
                    style={{ width: 120 }}
                    options={memberList}
                    dropdownStyle={{
                      backgroundColor: 'var(--gray-sideBar)',
                      color: 'var(--black)',
                      borderColor: 'var(--border-line)',
                    }}
                    disabled={!isGroup}
                  />
                </div>
              </div>

              {/*상세 설명*/}
              <div className={'w-full mb-5 text-[1rem]'}>
                <span className={'flex mb-[0.5rem] text-gray-dark font-bold'}>상세 설명</span>
                <div className={'w-full h-[80%]'}>
                  <Textarea
                    value={newTask.taskDetail}
                    onChange={onChangeTaskDescription}
                    border={'1px solid var(--border-line)'}
                    height={'100%'}
                    focusBorderColor={'none'}
                    resize={'none'}
                    placeholder="Task에 대한 상세 설명을 입력해주세요."
                    color={'var(--black)'}
                  />
                </div>
              </div>
            </section>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <button
            className={'bg-orange rounded font-bold text-xs text-white h-9 w-[4.5rem]'}
            onClick={onClickCreateTask}
          >
            완료
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
