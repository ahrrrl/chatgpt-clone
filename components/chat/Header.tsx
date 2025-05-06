import { MobileMenu } from './MobileMenu';
import { ModelSelect } from './ModelSelect';
import { Sidebar } from './Sidebar';

export function Header() {
  return (
    <header className='flex itmes-center p-2 sticky top-0 z-10 bg-white'>
      <MobileMenu>
        <Sidebar />
      </MobileMenu>
      <ModelSelect />
    </header>
  );
}
