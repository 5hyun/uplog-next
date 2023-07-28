import React, { useCallback, useState } from 'react';
import { Release } from '@/typings/product.ts';
import { Table, TableContainer, Th, Thead, Tr } from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';
import Tables from '@/components/Product/ReleaseNote/Tables.tsx';
export default function ReleaseNote() {
  // TODO: 리코일에서 받아 올 값
  const dummy: Release[] = [
    {
      status: 'going',
      version: 'v.1.1.3(임시)',
      date: '진행중',
      contents: [
        { type: 'Feature', content: '채널 통신 응답 중 발생할 수 있는 오류 코드 추가' },
        {
          type: 'Changed',
          content: '공통 Request Protocol',
        },
        {
          type: 'Fixed',
          content: '고침',
        },
        {
          type: 'New',
          content: '새거',
        },
        {
          type: 'Deprecated',
          content: '이제 못 씀',
        },
      ],
    },
    // {
    //   status: 'done',
    //   version: 'v.1.1.2',
    //   date: '2023.06.12',
    //   contents: [
    //     { type: 'Feature', content: '채널 통신 응답 중 발생할 수 있는 오류 코드 추가' },
    //     {
    //       type: 'Changed',
    //       content: '공통 Request Protocol 추가',
    //     },
    //   ],
    // },
    // {
    //   status: 'done',
    //   version: 'v.1.1.1',
    //   date: '2023.05.12',
    //   contents: [{ type: 'Deprecated', content: '미사용 필드 삭제' }],
    // },
    // {
    //   status: 'done',
    //   version: 'v.1.1.0',
    //   date: '2023.03.25',
    //   contents: [{ type: 'Feature', content: 'Service Argent 채널 연결과 통신 관련 설명' }],
    // },
    {
      status: 'done',
      version: 'v.1.0.0',
      date: '2023.02.18',
      contents: [
        { type: 'New', content: 'AI Service 기술 상세 설명' },
        { type: 'Fixed', content: '채널 통신 응답 기능 수정' },
      ],
    },
  ];

  return (
    <section className={'w-full py-32 px-56'}>
      <div className={'flex justify-between mb-4'}>
        <span className={'flex items-center'}>
          <img src="/images/test.jpeg" alt={'제품 사진'} className={'w-14 h-14 mr-4'} />
          <span className={'text-[2.6rem] font-bold'}>AllFormU</span>
        </span>
        <button className={'mr-2 text-gray-dark font-bold underline self-end'}>
          프로젝트 추가하기
        </button>
      </div>

      <div>
        <TableContainer overflow={'hidden'}>
          <Table fontSize={'1.2rem'} fontWeight={700}>
            <Thead>
              <Tr>
                <Th
                  borderTop={'1px solid var(--gray-table)'}
                  borderBottom={'1px solid var(--gray-table)'}
                  fontSize={'1.2rem'}
                  padding={'1.6rem 0'}
                  textAlign={'center'}
                  width={'20%'}
                >
                  버전
                </Th>
                <Th
                  borderTop={'1px solid var(--gray-table)'}
                  borderBottom={'1px solid var(--gray-table)'}
                  fontSize={'1.2rem'}
                  padding={'1.6rem 0'}
                  textAlign={'center'}
                  width={'20%'}
                >
                  날짜
                </Th>
                <Th
                  borderTop={'1px solid var(--gray-table)'}
                  borderBottom={'1px solid var(--gray-table)'}
                  fontSize={'1.2rem'}
                  padding={'1.6rem 0'}
                  textAlign={'center'}
                  width={'60%'}
                >
                  변경이력
                </Th>
              </Tr>
            </Thead>
            {dummy.length > 0 && <Tables />}
          </Table>
          {dummy.length === 0 && (
            <div
              className={'flex-row-center mt-6 text-gray-light text-2xl font-bold cursor-pointer'}
            >
              <AiOutlinePlus className={'mr-4 text-3xl'} /> 프로젝트 시작하기
            </div>
          )}
        </TableContainer>
      </div>
    </section>
  );
}
