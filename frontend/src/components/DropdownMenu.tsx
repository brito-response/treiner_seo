'use client';

import { Dropdown, DropdownItem, DropdownDivider } from 'flowbite-react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { useClickOutside } from '../hooks/useClickOutside';

export default function DropdownMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div ref={dropdownRef}>
      <Dropdown arrowIcon={false} inline size="lg" className="w-50 rounded-xl border-none p-2"
        label={
          <span className="text-blue-900 cursor-pointer" aria-expanded={isOpen} aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'} onClick={() => setIsOpen((prev) => !prev)}>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </span>
        }
      >
        <DropdownItem as={Link} href="/brasil" onClick={() => setIsOpen(false)}>
          Brasil
        </DropdownItem>

        <DropdownDivider />

        <DropdownItem as={Link} href="/mundo" onClick={() => setIsOpen(false)}>
          Mundo
        </DropdownItem>

        <DropdownDivider />

        <DropdownItem as={Link} href="/tecnologia" onClick={() => setIsOpen(false)}>
          Tecnologia
        </DropdownItem>

        <DropdownDivider />

        <DropdownItem as={Link} href="/esportes" onClick={() => setIsOpen(false)}>
          Esportes
        </DropdownItem>
      </Dropdown>
    </div>
  );
}