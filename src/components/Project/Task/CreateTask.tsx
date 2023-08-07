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
import { SelectMenu, SubGroup, Task } from '@/typings/project.ts';
import { DatePicker, DatePickerProps, Select, Space } from 'antd';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { menuListData } from '@/recoil/Project/atom.ts';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
export default function CreateTask({ isOpen, onClose }: Props) {
  const { showMessage, contextHolder } = useMessage();

  const [taskName, onChangeTaskName] = useInput('');
  const [newTask, setNewTask] = useState({
    taskName: '',
    startTime: '',
    endTime: '',
    menuName: '',
    groupName: '',
    targetMember: '',
    taskDetail: '',
  });

  const taskPeriod: SelectMenu[] = [
    { value: '날짜', label: '날짜' },
    {
      value: '최신순',
      label: '최신순',
    },
  ];

  const menuList = useRecoilValue(menuListData);

  const menuNameList: SelectMenu[] = menuList.map((menuItem) => ({
    value: menuItem.name,
    label: menuItem.name,
  }));

  const handleChange = (type: string) => (value: { value: string; label: React.ReactNode }) => {
    // task 사용자 입력값으로 지정
    const updatedTask = {
      ...newTask,
      [type]: value.value,
    };

    setNewTask(updatedTask);
    console.log(newTask);
  };

  const pGroup: string[] = ['그룹', '개발팀', '마케팅팀', '홍보팀'];
  const cGroup: SubGroup = {
    그룹: ['하위그룹'],
    개발팀: ['전체', '프론트엔드', '백엔드', '풀스택'],
    마케팅팀: ['전체', 'SNS', '디자인'],
    홍보팀: ['전체', 'SNS', '기사'],
  };

  type ChildGroup = keyof typeof cGroup;

  const [parentGroup, setParentGroup] = useState(cGroup[pGroup[0] as ChildGroup]);
  const [childGroup, setChildGroup] = useState(cGroup[pGroup[0] as ChildGroup][0]);

  const handleParentGroupChange = (value: string) => {
    // 선택한 상위그룹내용으로 하위 그룹 option으로 변경
    setParentGroup(cGroup[value]);
    setChildGroup(cGroup[value][0]);
  };

  const onChildGroupChange = (value: string) => {
    // 선택한 하위 그룹으로 필터링된 페이지로 이동
    setChildGroup(value);
  };

  const onChangeStartTime: DatePickerProps['onChange'] = (date, dateString) => {
    const updatedTask = {
      ...newTask,
      startTime: dateString,
    };

    setNewTask(updatedTask);
  };

  const onChangeEndTime: DatePickerProps['onChange'] = (date, dateString) => {
    const updatedTask = {
      ...newTask,
      endTime: dateString,
    };

    setNewTask(updatedTask);
  };

  const onChangeTaskDescription = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const updatedTask = {
      ...newTask,
      taskDetail: e.target.value,
    };

    setNewTask(updatedTask);
  }, []);

  useEffect(() => {
    const updatedTask = {
      ...newTask,
      taskName: taskName,
    };

    setNewTask(updatedTask);
    console.log(newTask);
  }, [taskName]);

  const onClickCreateTask = useCallback(() => {}, []);
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
                    defaultValue={taskPeriod[0]}
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
                  <DatePicker onChange={onChangeStartTime} placement={'bottomLeft'} />
                </div>
                <div className={'flex-col w-1/2 ml-16'}>
                  <span className={'flex mb-[0.5rem] text-gray-dark font-bold'}>종료 날짜</span>
                  <DatePicker onChange={onChangeEndTime} placement={'bottomLeft'} />
                </div>
              </div>

              {/*메뉴*/}
              <div className={'flex-row-center w-full mb-5 text-[1rem]'}>
                <div className={'flex-col w-1/2'}>
                  <span className={'flex mb-[0.5rem] text-gray-dark font-bold'}>메뉴</span>
                  <Select
                    labelInValue
                    defaultValue={{ value: '', label: '선택' }}
                    onChange={handleChange('menuName')}
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
                    defaultValue={taskPeriod[0]}
                    onChange={handleChange('targetMember')}
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

              {/*그룹 + 할당자*/}
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

              {/*상세 설명*/}
              <div className={'w-full mb-5 text-[1rem]'}>
                <span className={'flex mb-[0.5rem] text-gray-dark font-bold'}>메뉴</span>
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
