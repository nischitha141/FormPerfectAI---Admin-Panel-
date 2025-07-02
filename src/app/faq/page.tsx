'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TableHeader from '@components/ambassador_program/TableHeader';
import withAuth from '../../utils/withAuth';
import FaqTable from '@components/ambassador_program/FaqTable';
import FaqModal from '@components/faq/FaqModal';

type FaqAPIResponse = {
  _id: string;
  question: string;
  answer: string;
  status: string;
};

const Workout_Metrics = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const mode = searchParams.get('mode');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [faqData, setFaqtData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [faqInitialData, setFaqInitialData] = useState<{ question: string; answer: string; visible: string } | null>(null);

  const fetchData = async (page: number, limit: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const res = await fetch(`${apiUrl}/api/main/faqs?page=${page}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await res.json();
      const raw = result?.data?.data || [];

      const formatted = raw.map((item: FaqAPIResponse) => ({
        id: item._id,
        Question: item.question,
        Answer: item.answer,
        Status: item.status
      }));

      setFaqtData(formatted);
      setTotalPages(result?.data?.totalPage || 1);
      if (result?.data?.pagination?.currentPage !== currentPage) {
        setCurrentPage(result?.data?.currentPage);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFaqById = async (faqId: string) => {
    try {
      const token = localStorage.getItem('token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const res = await fetch(`${apiUrl}/api/main/faqById?id=${faqId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      setFaqInitialData({
        question: data.data.question || '',
        answer: data.data.answer || '',
        visible: data.data.status,
      });
      setShowModal(true);
    } catch (err) {
      console.error("Error fetching FAQ by ID:", err);
    }
  };

  useEffect(() => {
    fetchData(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    if (id) {
      fetchFaqById(id);
    } else if (mode === 'create') {
      setFaqInitialData({ question: '', answer: '', visible: 'Active' }); 
      setShowModal(true);
    }
    else {
      setShowModal(false);
      setFaqInitialData(null);
    }
  }, [id, mode]);

  const handleModalClose = () => {
    setShowModal(false);
    router.push('/faq');
    fetchData(currentPage, itemsPerPage);
    setFaqInitialData(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6 p-4">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <TableHeader
          title={""}
          addFaq={true}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterType={filterType}
          setFilterType={setFilterType}
        />

        <FaqTable
          requests={faqData}
          searchQuery={searchQuery}
          filterType={filterType}
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => {
            if (page >= 1 && page <= totalPages) {
              setCurrentPage(page);
            }
          }}
          onItemsPerPageChange={(limit) => {
            setItemsPerPage(limit);
            setCurrentPage(1);
          }}
          fetchData={fetchData}
        />
      </div>

      {showModal && (
        <FaqModal
          id={id}
          initialData={faqInitialData}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default withAuth(Workout_Metrics);
