import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function Footer() {
  return (
    <footer className="bg-gray-200">
      <div className="container mx-auto grid gap-10 p-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="min-w-50">
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
          <p className="mt-4">
            A maior rede de notícias do Brasil.
            
          </p>
        </div>

        <nav className="min-w-50 text-sm border-l-3 border-gray-300 pl-8">
          <p className="text-red-600 mb-4 font-semibold">Categorias</p>

          <ul className="flex flex-col uppercase text-blue-900 gap-1">
            <li className="hover:text-blue-500 duration-300 transition-all">
              <Link href="/brasil">Brasil</Link>
            </li>
            <li className="hover:text-blue-500 duration-300 transition-all">
              <Link href="/mundo">Mundo</Link>
            </li>
            <li className="hover:text-blue-500 transition-all duration-300">
              <Link href="/tecnologia">Tecnólogia</Link>
            </li>
            <li className="hover:text-blue-500 transition-all duration-300">
              <Link href="/esportes">Esportes</Link>
            </li>
          </ul>
        </nav>

        <nav className="min-w-50 text-sm border-l-3 border-gray-300 pl-8">
          <p className="text-red-600 mb-4 font-semibold">Mais</p>

          <ul className="flex flex-col uppercase text-blue-900 gap-1">
            <li className="hover:text-blue-500 duration-300 transition-all">
              <Link href="#">Sobre Dev News</Link>
            </li>
            <li className="hover:text-blue-500 duration-300 transition-all">
              <Link href="#">Termos de uso</Link>
            </li>
            <li className="hover:text-blue-500 transition-all duration-300">
              <Link href="#">Politica de Privacidade</Link>
            </li>
            <li className="hover:text-blue-500 transition-all duration-300">
              <Link href="#">Fale Conosco</Link>
            </li>
          </ul>
        </nav>

        <div className="min-w-50 text-sm border-l-3 border-gray-300 pl-8">
          <p className="text-red-600 mb-4 font-semibold">Redes</p>

          <ul className="flex items-center  gap-4  text-blue-900">
            <li className="hover:text-blue-500 transition-all duration-300">
              <Link href={'#'}>
                <Twitter />
              </Link>
            </li>
            <li className="hover:text-blue-500 transition-all duration-300">
              <Link href={'#'}>
                <Instagram />
              </Link>
            </li>
            <li className="hover:text-blue-500 transition-all duration-300">
              <Link href={'#'}>
                <Linkedin />
              </Link>
            </li>
            <li className="hover:text-blue-500 transition-all duration-300">
              <Link href={'#'}>
                <Youtube />
              </Link>
            </li>
            <li className="hover:text-blue-500 transition-all duration-300">
              <Link href={'#'}>
                <Facebook />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="text-center text-sm text-white  bg-black p-2">
        © 2026 DevNews. Todos os direitos reservados.
      </p>
    </footer>
  );
}

export default Footer;
