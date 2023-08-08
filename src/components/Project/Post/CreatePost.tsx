import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useMessage } from '@/hooks/useMessage.ts';
import useInput from '@/hooks/useInput.ts';
import { Select } from 'antd';
import { menuListData } from '@/recoil/Project/atom.ts';
import { SelectMenu } from '@/typings/project.ts';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatePost({ isOpen, onClose }: Props) {
  const { showMessage, contextHolder } = useMessage();

  // 메뉴 list
  const menuList = useRecoilValue(menuListData);
  const menuNameList: SelectMenu[] = menuList.map((menuItem) => ({
    value: menuItem.id.toString(),
    label: menuItem.name,
  }));

  // 타입 data
  const typeList: SelectMenu[] = [
    { value: '1', label: '요청' },
    { value: '2', label: '필독' },
  ];

  // 포스트 제목, 메뉴, 타입,
  const [postName, onChangePostName] = useInput('');
  const [postMenu, setPostMenu] = useState(-1);
  const [postType, setPostType] = useState('');

  const handleChange = (type: string) => (value: { value: string; label: React.ReactNode }) => {
    if (type === 'menuId') {
      setPostMenu(+value.value);
    } else {
      setPostType(value.label as string);
    }
  };

  return (
    <Modal isCentered onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent
        minW="65rem"
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
          Post 생성
        </ModalHeader>
        <ModalCloseButton
          fontSize={'1rem'}
          color={'var(--gray-light)'}
          mt={'0.6rem'}
          mr={'0.8rem'}
        />
        <ModalBody>
          <Flex justifyContent={'center'} h={'100%'}>
            <section
              className={'flex-col-center justify-start w-[82%] h-full border border-red-400'}
            >
              {contextHolder}
              <section className={'flex-row-center justify-start w-full h-[4rem]'}>
                <input
                  value={postName}
                  onChange={onChangePostName}
                  type="text"
                  placeholder={'Post 제목'}
                  className={'w-full mt-6 mb-4 px-4 text-3xl font-bold bg-inherit'}
                  maxLength={20}
                />
              </section>
              <div className={'w-full border-b border-gray-spring'} />
              <section className={'flex-col justify-start items-start w-full h-[5rem] pl-[2rem]'}>
                {/* 메뉴 | select */}
                <div
                  className={
                    'flex items-center justify-start w-[17rem] h-1/2 text-gray-light text-[1rem]'
                  }
                >
                  <div className={'flex w-[6rem] items-center justify-end h-auto'}>
                    <span>메뉴</span>
                    <div
                      className={'ml-3 h-4 border-solid border-r border-[0.2px] border-gray-border'}
                    />
                  </div>
                  <Select
                    labelInValue
                    defaultValue={{ value: '-1', label: '메뉴 선택' }}
                    onChange={handleChange('menuId')}
                    style={{ width: 100 }}
                    bordered={false}
                    options={menuNameList}
                    dropdownStyle={{
                      backgroundColor: 'var(--gray-sideBar)',
                      color: 'var(--black)',
                      borderColor: 'var(--border-line)',
                    }}
                  />
                </div>

                {/* 타입 | select */}
                <div
                  className={
                    'flex items-center justify-start w-[17rem] h-1/2 text-gray-light text-[1rem]'
                  }
                >
                  <div className={'flex w-[6rem] items-center justify-end h-auto'}>
                    <span>타입</span>
                    <div
                      className={'ml-3 h-4 border-solid border-r border-[0.2px] border-gray-border'}
                    />
                  </div>
                  <Select
                    labelInValue
                    defaultValue={{ value: '', label: '타입 선택' }}
                    onChange={handleChange('type')}
                    style={{ width: 100 }}
                    bordered={false}
                    options={typeList}
                    dropdownStyle={{
                      backgroundColor: 'var(--gray-sideBar)',
                      color: 'var(--black)',
                      borderColor: 'var(--border-line)',
                    }}
                  />
                </div>
              </section>
              <div className={'w-full border-b border-gray-spring'} />
              <section
                className={'flex-row-center w-[90%] h-[28rem] border border-red-400'}
              ></section>
            </section>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <button className={'w-[5rem] rounded h-9 bg-orange text-white'}>완료</button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
