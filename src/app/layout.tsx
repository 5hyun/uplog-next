import type { Metadata } from 'next';
import '../index.css';
import { RecoilRoot } from 'recoil';
// import GlobalStyles from '../styles/GlobalStyles.tsx';

export const metadata: Metadata = {
  title: 'React App',
  description: 'Web site created with Next.js.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // if (localStorage.theme === 'dark') {
  //   document.documentElement.classList.add('dark');
  // } else {
  //   document.documentElement.classList.remove('dark');
  // }

  return (
    <html lang="en">
      <body>
        {/*<GlobalStyles />*/}
        <RecoilRoot>
          <div id="root">{children}</div>
        </RecoilRoot>
      </body>
    </html>
  );
}
