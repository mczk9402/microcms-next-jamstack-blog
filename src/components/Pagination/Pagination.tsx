/* This example requires Tailwind CSS v2.0+ */
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { VFC } from 'react';

interface Props {
  currentPage?: number;
  totalCount: number;
}

export const Pagination: VFC<Props> = ({ currentPage = 1, totalCount }) => {
  const currentStyle =
    'inline-flex relative z-10 items-center py-2 px-4 text-sm font-medium text-indigo-600 bg-indigo-50 border border-indigo-500';
  const defaultStyle =
    'inline-flex relative items-center py-2 px-4 text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 border border-gray-300';

  const currentNum = currentPage;

  return (
    <nav
      className="flex relative z-0 justify-center mt-[40px] -space-x-px w-full rounded-md"
      aria-label="Pagination"
    >
      <Link href={`/archives/${currentNum - 1}`}>
        <a
          className={`inline-flex relative items-center py-2 px-2 text-sm font-medium text-gray-500  hover:bg-gray-50 rounded-l-md  border-gray-300 ${
            currentNum - 1 > 0 ? 'bg-white border' : 'pointer-events-none bg-gray-200 opacity-50'
          }`}
        >
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
        </a>
      </Link>

      {[...Array(Math.ceil(totalCount / 10))]
        .map((_, i) => i + 1)
        .map((pageCount, index) => (
          <Link href={`/archives/${index + 1}`} key={index}>
            <a
              aria-current="page"
              className={index + 1 === currentNum ? currentStyle : defaultStyle}
            >
              {pageCount}
            </a>
          </Link>
        ))}

      <Link href={`/archives/${currentNum + 1}`}>
        <a
          className={`inline-flex relative items-center py-2 px-2 text-sm font-medium text-gray-500  hover:bg-gray-50 rounded-r-md  border-gray-300 ${
            currentNum < Math.ceil(totalCount / 10)
              ? 'bg-white border'
              : 'pointer-events-none bg-gray-200 opacity-50'
          }`}
        >
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
        </a>
      </Link>
    </nav>
  );
};
