import Image from 'next/image';
import Link from 'next/link';
import DropdownMenu from './DropdownMenu';
import { FormLoginWrapper } from '@/forms/users/FormLogin/formwraper';

function Header() {
  return (
    <header className="border-b border-gray-200 shadow-md shadow-gray-200 w-full z-50 bg-white">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="cursor-auto">
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
        </Link>
        {
          <div className="block md:hidden">
            <DropdownMenu />
          </div>
        }
        <ul className="hidden md:flex gap-8 uppercase items-center justify-center text-blue-900 font-bold">
          <li className="relative py-2 cursor-pointer before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-0.5 before:w-0 before:bg-red-600 before:transition-all before:duration-300 hover:before:w-full">
            <Link href="/esportes" className="py-6">
              Esportes
            </Link>
          </li>

          <li className="relative py-2 cursor-pointer before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-0.5 before:w-0 before:bg-red-600 before:transition-all before:duration-300 hover:before:w-full">
            <FormLoginWrapper />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
