import { delay, http, HttpResponse } from 'msw';
import { GetUserInfo, LoginInfo, SignUpInfo } from '@/typings/member.ts';
import { faker } from '@faker-js/faker';

export const auth = [
  http.post('/members/login', async (info) => {
    const infos: LoginInfo = await info.request.json();

    if (infos.password === '1234') {
      return HttpResponse.json({ httpStatus: 'CONFLICT', message: '비밀번호가 틀립니다.' });
    }

    const position = infos.email === 'company@gmail.com' ? 'COMPANY' : 'INDIVIDUAL';
    const data: GetUserInfo = {
      id: faker.number.int(),
      image: null,
      email: infos.email,
      name: '권오현',
      nickname: '오리',
      position: position,
      accessToken: 'MSW-accessToken',
    };

    return HttpResponse.json(data, {
      headers: {
        'Set-Cookie': 'refreshToken=MSW-refreshToken;Max-Age=9999999999;',
      },
    });
  }),
  http.post('/members', async (info) => {
    const infos: SignUpInfo = await info.request.json();

    if (infos.email === 'abc@gmail.com') {
      return HttpResponse.json({ httpStatus: 'CONFLICT', message: '이미 존재하는 회원입니다.' });
    }

    return HttpResponse.json({ ...infos, image: null, id: faker.number.int() }, { status: 201 });
  }),
  http.post('/members/logout', () => {
    return new HttpResponse(null, {
      headers: {
        'Set-Cookie': 'refreshToken=MSW-refreshToken;Max-Age=0;',
      },
    });
  }),
];