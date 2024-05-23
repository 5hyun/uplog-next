'use client';
import { atom } from 'recoil';
import { CommentInfo, Posts } from '@/typings/post.ts';

export const postMain = atom({
  key: 'postMain',
  default: true,
});

export const postTagList = atom<string[]>({ key: 'postTagList', default: [] });

export const eachMenuPost = atom<Posts>({
  key: 'eachMenuPost',
  default: { posts: [] },
});
// export const eachMenuPost = atom<Posts>({
//   key: 'eachMenuPost',
//   default: {
//     noticePost: {
//       id: 1,
//       title: 'string',
//       authorInfoDTO: {
//         id: 0,
//         name: 'string',
//         nickname: 'string',
//         image: '',
//       },
//       menuId: 0,
//       menuName: 'string',
//       productName: 'string',
//       projectName: 'string',
//       postType: 'DEFAULT',
//       content: 'string',
//       createTime: '2023-08-11T01:09:41.985Z',
//       tagList: [],
//       likeCount: 2,
//       commentCount: 5,
//     },
//     posts: [
//       {
//         id: 0,
//         title: 'string',
//         authorInfoDTO: {
//           id: 0,
//           name: 'string',
//           nickname: 'string',
//           image: '/images/test_userprofile.png',
//         },
//         menuId: 0,
//         menuName: 'string',
//         productName: 'string',
//         projectName: 'string',
//         postType: null,
//         content:
//           '안녕엉ㅇ안년ㅇ항ㄴ연ㅇ앎ㄴㅇㄴㅇ힌ㅇ힌ㅇㄹn안녕엉ㅇ안년ㅇ항ㄴ연ㅇ앎ㄴㅇㄴㅇ힌ㅇ힌ㅇㄹn안녕엉ㅇ안년ㅇ항ㄴ연ㅇ앎ㄴㅇㄴㅇ힌ㅇ힌ㅇㄹn안녕엉ㅇ안년ㅇ항ㄴ연ㅇ앎ㄴㅇㄴㅇ힌ㅇ힌ㅇㄹn안녕엉ㅇ안년ㅇ항ㄴ연ㅇ앎ㄴㅇㄴㅇ힌ㅇ힌ㅇㄹn안녕엉ㅇ안년ㅇ항ㄴ연ㅇ앎ㄴㅇㄴㅇ힌ㅇ힌ㅇㄹn안녕엉ㅇ안년ㅇ항ㄴ연ㅇ앎ㄴㅇㄴㅇ힌ㅇ힌ㅇㄹn안녕엉ㅇ안년ㅇ항ㄴ연ㅇ앎ㄴㅇㄴㅇ힌ㅇ힌ㅇㄹn안녕엉ㅇ안년ㅇ항ㄴ연ㅇ앎ㄴㅇㄴㅇ힌ㅇ힌ㅇㄹn',
//         createTime: '2023-08-09T01:09:41.985Z',
//         tagList: ['1', '2', '3'],
//         likeCount: 4,
//         commentCount: 10,
//       },
//       {
//         id: 1,
//         title: 'string',
//         authorInfoDTO: {
//           id: 0,
//           name: 'string',
//           nickname: 'string',
//           image: '',
//         },
//         menuId: 0,
//         menuName: 'string',
//         productName: 'string',
//         projectName: 'string',
//         postType: 'DEFAULT',
//         content: 'string',
//         createTime: '2023-08-11T01:09:41.985Z',
//         tagList: [],
//         likeCount: 2,
//         commentCount: 5,
//       },
//       {
//         id: 2,
//         title: 'string',
//         authorInfoDTO: {
//           id: 0,
//           name: 'string',
//           nickname: 'string',
//           image: '',
//         },
//         menuId: 0,
//         menuName: 'string',
//         productName: 'string',
//         projectName: 'string',
//         postType: 'DEFAULT',
//         content: 'string',
//         createTime: '2023-08-09T01:09:41.985Z',
//         tagList: ['123123', '1231231231'],
//         likeCount: 0,
//         commentCount: 0,
//       },
//     ],
//   },
// });

export const eachComment = atom<CommentInfo[]>({
  key: 'eachComment',
  default: [
    {
      id: 1,
      parentId: null,
      content: '댓글 1',
      createTime: '2023-08-09T11:11:07.357Z',
      memberId: 1,
      nickName: 'OCI',
      name: '오채영',
      image: '/images/test_userprofile.png',
    },
    {
      id: 2,
      parentId: null,
      content: '댓글 2',
      createTime: '2023-08-09T11:11:07.357Z',
      memberId: 2,
      nickName: 'OCI 2',
      name: '오채영2',
      image: '',
    },
    // {
    //   id: 3,
    //   parentId: 1,
    //   content: '댓글 1의 대댓글 1',
    //   createTime: '2023-08-09T11:11:07.357Z',
    //   memberId: 3,
    //   nickName: 'OCI',
    //   name: '오채영',
    //   image: '',
    // },
    // {
    //   id: 4,
    //   parentId: 1,
    //   content: '댓글 1의 대댓글 2',
    //   createTime: '2023-08-09T11:11:07.357Z',
    //   memberId: 4,
    //   nickName: 'OCI',
    //   name: '오채영',
    //   image: '',
    // },
    // {
    //   id: 5,
    //   parentId: 1,
    //   content: '댓글 1의 대댓글 3',
    //   createTime: '2023-08-09T11:11:07.357Z',
    //   memberId: 5,
    //   nickName: 'OCI',
    //   name: '오채영',
    //   image: '',
    // },
    // {
    //   id: 6,
    //   parentId: null,
    //   content: '댓글 3',
    //   createTime: '2023-08-09T11:11:07.357Z',
    //   memberId: 6,
    //   nickName: 'OCI',
    //   name: '오채영',
    //   image: '',
    // },
    // {
    //   id: 7,
    //   parentId: 2,
    //   content: '댓글 2의 대댓글 1',
    //   createTime: '2023-08-09T11:11:07.357Z',
    //   memberId: 7,
    //   nickName: 'OCI',
    //   name: '오채영',
    //   image: '',
    // },
    // {
    //   id: 8,
    //   parentId: 6,
    //   content: '댓글 3의 대댓글 1',
    //   createTime: '2023-08-09T11:11:07.357Z',
    //   memberId: 8,
    //   nickName: 'OCI',
    //   name: '오채영',
    //   image: '',
    // },
    // {
    //   id: 9,
    //   parentId: 2,
    //   content: '댓글 2의 대댓글 2',
    //   createTime: '2023-08-09T11:11:07.357Z',
    //   memberId: 9,
    //   nickName: 'OCI',
    //   name: '오채영',
    //   image: '',
    // },
  ],
});
