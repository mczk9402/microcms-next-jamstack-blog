import { Fragment, useRef, useState, VFC } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HeaderModal: VFC<Props> = ({ open, setOpen }) => {
  const [search, setSearch] = useState('');
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="overflow-y-auto fixed inset-0 z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex justify-center items-end px-4 pt-4 pb-20 min-h-screen text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/50 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block overflow-hidden relative p-[30px] h-[600px] text-left text-white align-bottom bg-black/70 rounded-lg shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <ul className="grid gap-[16px]">
                <li>
                  <Link href="/">
                    <a>TOP</a>
                  </Link>
                </li>
                <li>
                  <Link href="/archives/1">
                    <a>アーカイブ</a>
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <a>お問い合わせ</a>
                  </Link>
                </li>
                <li>
                  <Link href="/categoryList">
                    <a>カテゴリー一覧</a>
                  </Link>
                </li>
                <li>
                  <Link href="/image-list">
                    <a>スライダー検証</a>
                  </Link>
                </li>
              </ul>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
