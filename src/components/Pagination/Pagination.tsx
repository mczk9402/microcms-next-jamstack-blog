/* This example requires Tailwind CSS v2.0+ */
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import Link from 'next/link';

export const Pagination = ({ currentPage = 1, totalCount }) => {
  const currentStyle =
    'inline-flex relative z-10 items-center py-2 px-4 text-sm font-medium text-indigo-600 bg-indigo-50 border border-indigo-500';
  const defaultStyle =
    'inline-flex relative items-center py-2 px-4 text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 border border-gray-300';

  const currentNum = parseInt(currentPage);

  return (
    <nav
      className="flex relative z-0 justify-center mt-[40px] -space-x-px w-full rounded-md"
      aria-label="Pagination"
    >
      {currentNum - 1 > 0 ? (
        <Link href={`/archives/${currentNum - 1}`}>
          <a className="inline-flex relative items-center py-2 px-2 text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 rounded-l-md border border-gray-300">
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
          </a>
        </Link>
      ) : null}

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

      {currentNum < Math.ceil(totalCount / 10) ? (
        <Link href={`/archives/${currentNum + 1}`}>
          <a
            href="#"
            className="inline-flex relative items-center py-2 px-2 text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 rounded-r-md border border-gray-300"
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
          </a>
        </Link>
      ) : null}
    </nav>
  );
};

{
  /* <span className="inline-flex relative items-center py-2 px-4 text-sm font-medium text-gray-700 bg-white border border-gray-300">
...
</span> */
}
