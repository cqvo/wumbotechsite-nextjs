import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl?: string;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  baseUrl = "/",
  className,
}: PaginationProps) {
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  if (totalPages <= 1) {
    return null;
  }

  const getPrevUrl = () => {
    if (currentPage === 2) {
      return baseUrl;
    }

    return `${baseUrl}?page=${currentPage - 1}`;
  };

  const getNextUrl = () => `${baseUrl}?page=${currentPage + 1}`;

  return (
    <div className={`flex items-center gap-4 mt-8 ${className || ""}`}>
      {hasPrevPage && (
        <Link
          className={buttonStyles({ variant: "bordered" })}
          href={getPrevUrl()}
        >
          Previous
        </Link>
      )}

      <span className="text-sm text-default-600">
        Page {currentPage} of {totalPages}
      </span>

      {hasNextPage && (
        <Link
          className={buttonStyles({ variant: "bordered" })}
          href={getNextUrl()}
        >
          Next
        </Link>
      )}
    </div>
  );
}
