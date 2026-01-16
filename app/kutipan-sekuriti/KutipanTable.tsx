'use client';

import { useMemo, useState } from 'react';

import type { Bill } from './types';
import styles from './page.module.css';

const STATUS_LABELS: Record<NonNullable<Bill['status']>, string> = {
  paid: 'Paid',
  unpaid: 'Unpaid',
  'partially-paid': 'Partially Paid',
};

const STATUS_CLASS: Record<NonNullable<Bill['status']>, string> = {
  paid: styles.statusPaid,
  unpaid: styles.statusUnpaid,
  'partially-paid': styles.statusPartial,
};

const formatCurrency = (value?: number) => {
  if (typeof value !== 'number') {
    return '';
  }

  return new Intl.NumberFormat('ms-MY', {
    style: 'currency',
    currency: 'MYR',
  }).format(value);
};

type Props = {
  bills: Bill[];
};

export default function KutipanTable({ bills }: Props) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const totalRows = 9;

  const filteredBills = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return bills;
    }

    return bills.filter((bill) => {
      const statusLabel = bill.status ? STATUS_LABELS[bill.status] : '';
      const haystack = [bill.houseNumber, statusLabel, bill.tunggak].filter(Boolean).join(' ');
      return haystack.toLowerCase().includes(needle);
    });
  }, [bills, query]);

  const pageCount = Math.max(1, Math.ceil(filteredBills.length / totalRows));
  const safePage = Math.min(page, pageCount);
  const showEmptyState = filteredBills.length === 0;
  const startIndex = (safePage - 1) * totalRows;
  const visibleBills = filteredBills.slice(startIndex, startIndex + totalRows);
  const rows = showEmptyState
    ? [null, ...Array.from({ length: totalRows - 1 }).map(() => null)]
    : [
        ...visibleBills,
        ...Array.from({ length: Math.max(0, totalRows - visibleBills.length) }).map(() => null),
      ];

  return (
    <div className={styles.tableShell}>
      <div className={styles.tableTopBar}>
        <div className={styles.tableSearch}>
          <label className={styles.tableSearchLabel} htmlFor="bill-search">
            Carian
          </label>
        <input
          id="bill-search"
          className={styles.tableSearchInput}
          type="search"
          placeholder="Cari no. rumah atau status"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setPage(1);
          }}
        />
      </div>
    </div>
    <table className={styles.billTable}>
          <thead>
            <tr className={styles.tableHeader}>
              <th className={styles.billCell} scope="col">
                No. Rumah
              </th>
              <th className={styles.billCell} scope="col">
                Status Bayaran
              </th>
              <th className={styles.billCell} scope="col">
                Tempoh Tunggakan
              </th>
              <th className={`${styles.billCell} ${styles.billCellAmount}`} scope="col">
                Jumlah
              </th>
              <th className={`${styles.billCell} ${styles.billCellAmount}`} scope="col">
                Baki
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((bill, index) => {
              if (showEmptyState && index === 0) {
                return (
                  <tr className={styles.billRow} key="empty">
                    <td className={`${styles.billCell} ${styles.billCellEmpty}`} colSpan={5}>
                      Tiada rekod ditemui.
                    </td>
                  </tr>
                );
              }

              return (
                <tr className={styles.billRow} key={bill?._id ?? `empty-${index}`}>
                  <td className={styles.billCell}>{bill?.houseNumber ?? ''}</td>
                  <td className={styles.billCell}>
                    {bill?.status ? (
                      <span className={`${styles.statusPill} ${STATUS_CLASS[bill.status]}`}>
                        {STATUS_LABELS[bill.status]}
                      </span>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className={styles.billCell}>{bill?.tunggak ?? ''}</td>
                  <td className={`${styles.billCell} ${styles.billCellAmount}`}>
                    {formatCurrency(bill?.amount)}
                  </td>
                  <td className={`${styles.billCell} ${styles.billCellAmount}`}>
                    {formatCurrency(bill?.balance)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className={styles.tablePagination}>
          <button
            type="button"
            className={styles.paginationButton}
            onClick={() => setPage(1)}
            disabled={safePage === 1}
          >
            First
          </button>
          <button
            type="button"
            className={styles.paginationButton}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={safePage === 1}
          >
            Prev
          </button>
          <span className={styles.paginationStatus}>
            Page {safePage} / {pageCount}
          </span>
          <button
            type="button"
            className={styles.paginationButton}
            onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
            disabled={safePage === pageCount}
          >
            Next
          </button>
          <button
            type="button"
            className={styles.paginationButton}
            onClick={() => setPage(pageCount)}
            disabled={safePage === pageCount}
          >
            Last
          </button>
        </div>
    </div>
  );
}
