import { useEffect, RefObject } from 'react';

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handlerClick: () => void,
): void {
  useEffect(() => {
    // Verifica se o clique foi fora do elemento
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handlerClick();
      }
    }

    // Adiciona listener ao clicar
    document.addEventListener('mousedown', handleClickOutside);

    // Remove listener ao desmontar (cleanup)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handlerClick]); // Reexecuta se referência ou função mudar
}
