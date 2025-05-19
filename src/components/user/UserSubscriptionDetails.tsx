"use client";
import React from "react";
import { useEffect, useState, use } from "react";
import { UserSubscriptionData } from "../../../types/api";
import { userService } from "@services/user.service";
import { notFound } from "next/navigation";
import SectionHeader from "./SectionHeader";
import SubscriptionDetailsSection from "./SubscriptionDetailsSection";
import SubscriptionHistoryTable from "./SubscriptionHistoryTable";

const UserSubscriptionDetails = ({ userId }: { userId: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userSubDetails, setUserSubDetails] =
    useState<UserSubscriptionData | null>(null);

  useEffect(() => {
    fetchSubscriptionDetails();
  }, [userId]);

  const fetchSubscriptionDetails = async (
    startDate?: string,
    endDate?: string
  ) => {
    try {
      setError(null);
      setIsLoading(true);

      const response = await userService.getUserSubscriptionDetails("67d807ef636710e00ea02e8b", startDate, endDate);

      if (response.success && response.data) {
        setUserSubDetails(response.data);
      } else {
        setError(response.message || "Failed to fetch user subscription data");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching data"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateRangeFilter = (startDate: string, endDate: string) => {
    fetchSubscriptionDetails(startDate, endDate);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);

    if (isNaN(date.getTime())) return dateString;

    const isToday = new Date().toDateString() === date.toDateString();
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    return isToday
      ? `Today, ${day} ${month} ${year}`
      : `${day} ${month} ${year}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 font-urbanist">
        {error}
      </div>
    );
  }

  if (!userSubDetails) {
    notFound();
  }

  return (
    <div className="px-5 space-y-8">
      <div className="flex py-[20px]">
        <SectionHeader
          title="Subscription Details"
          description="View and manage user's subscription plan"
        />
        <SubscriptionDetailsSection
          userSubDetails={userSubDetails}
          formatDate={formatDate}
        />
      </div>

      {/* Subscription History Table */}
      <SubscriptionHistoryTable
        subscriptionData={userSubDetails.subscriptionData}
        onDateRangeFilter={handleDateRangeFilter}
      />
    </div>
  );
};

export default UserSubscriptionDetails;
