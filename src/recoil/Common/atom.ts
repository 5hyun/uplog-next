import { atom } from 'recoil';

export const themeState = atom<boolean>({
  key: 'themeState',
  default: localStorage.getItem('theme') === 'dark',
});

export const editorPost = atom<string>({
  key: 'editorPost',
  default: '',
});

export const editorChangeLog = atom<string>({
  key: 'editorChangeLog',
  default: '',
});

const isDeployment: boolean = import.meta.env.VITE_IS_DEPLOYMENT === 'true';
const DEV_FRONTEND_URL = import.meta.env.VITE_DEV_FRONTEND_URL;
const DEPLOYMENT_FRONTEND_URL = import.meta.env.VITE_DEPLOYMENT_FRONTEND_URL;
export const frontEndUrl = atom({
  key: 'frontEndUrl',
  default: isDeployment ? DEPLOYMENT_FRONTEND_URL : DEV_FRONTEND_URL,
});
