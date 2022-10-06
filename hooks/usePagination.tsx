import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";

const RESULTS_PER_PAGE = 50; // server default

interface Props {
  navPath: string;
}

export const usePagination = ({ navPath }: Props) => {
  const router = useRouter();

  const [total, setTotal] = useState<number | undefined>(undefined);

  const page = router.query.page ? parseInt(router.query.page.toString()) : 1;

  const pushQuery = useCallback(
    (query: string) => {
      router.push({
        pathname: `/${navPath}`,
        query: { page: query },
      });
    },
    [router]
  );

  const onNextClick = useCallback(() => {
    if (!total) return;
    const canNavigate = page * RESULTS_PER_PAGE < total;
    canNavigate && pushQuery((page + 1).toString());
  }, [page, total, pushQuery]);

  const onPreviousClick = useCallback(() => {
    const prevPageNum = page - 1;
    const canNavigate = prevPageNum >= 1;
    canNavigate && pushQuery(prevPageNum.toString());
  }, [page, pushQuery]);

  const onPageClick = useCallback(
    (page: number) => {
      pushQuery(page.toString());
    },
    [pushQuery]
  );

  const navigationSet = useMemo(() => {
    if (!total) return null;

    const SET_SIZE = 5;

    const totalPages = Math.ceil(total / RESULTS_PER_PAGE);

    if (!totalPages || totalPages <= 1) return null;

    const totalPagesArr = Array.from({ length: totalPages }, (_, i) => i + 1);

    const pageSets = totalPagesArr.reduce<[number[]]>(
      (all, one, i) => {
        const ch = Math.floor(i / SET_SIZE);
        //@ts-ignore:next-line
        all[ch] = [].concat(all[ch] || [], one);
        return all;
      },
      [[]]
    );

    const matchingSet = pageSets.find((set) => set.includes(page));

    if (!matchingSet) return null;

    if (matchingSet.length < SET_SIZE && matchingSet.length !== totalPages) {
      const diff = SET_SIZE - matchingSet.length;
      const diffArr = Array.from({ length: diff }, (_, i) => i + 1);
      const suffixArr = diffArr.map((v) => matchingSet[0] - v);
      return [...suffixArr.reverse(), ...matchingSet];
    }

    return matchingSet;
  }, [total, page]);

  return {
    pagination: {
      totalPages: (total && Math.ceil(total / RESULTS_PER_PAGE)) || 0,
      currentPage: page,
      onNextClick,
      onPreviousClick,
      navigationSet,
      onPageClick,
    },
    setTotalPages: setTotal,
  };
};
