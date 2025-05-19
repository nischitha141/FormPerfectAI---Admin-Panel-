"use client";
import { notFound } from "next/navigation";
import { useEffect, useState, use } from "react";
import { userService } from "@services/user.service";
import { Ban, Edit, Mail, User } from "lucide-react";

import UserDetails from "@components/user/UserDetails";
import { UserProfile } from "../../../types/api";
import Image from "next/image";

export default function UserPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = use(params);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState("User Overview");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const response = await userService.getUser(userId);
        if (response.success && response.data) {
          setUser(response.data);
        } else {
          setError(response.message || "Failed to fetch user data");
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

    fetchData();
  }, [userId]);

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

  if (!user) {
    notFound();
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex flex-col relative">
        {/* Map Placeholder */}
        <div className="w-full h-40 bg-gray-100 rounded-md mb-6 flex items-center justify-center border border-gray-200 shadow-sm">
          <p className="text-gray-400 text-sm font-urbanist">
            Map Placeholder (Location Not Available)
          </p>
        </div>

        {/* Profile Header and Buttons */}
        <div className="flex items-center justify-between mb-6 -mt-16 px-5">
          <div className="flex items-center space-x-4 py-4">
            <div className="w-[140px] h-[140px] rounded-full bg-gray-100 flex items-center justify-center border-4 border-white">
              {user.profile ? (
                <Image
                  width={100}
                  height={100}
                  src={user.profile}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="w-6 h-6 text-gray-500" />
              )}
            </div>
            <div className="items-center self-end mb-[15px]">
              <div className="flex gap-3 items-center ">
                <h2 className="text-2xl font-bold font-urbanist text-[#1F222A]">
                  {user.firstName}
                </h2>
                <div className="bg-[#DCFAE6] w-[86px] h-[26px] rounded-sm text-xs text-[#079455] flex items-center justify-center">
                  <span className="w-1 h-1 bg-[#079455] rounded-full mr-2"></span>
                  <span>active now</span>
                </div>
              </div>

              <p className="text-md font-[400] font-urbanist text-[#4E525A] mt-1">
                {user.email}
              </p>
            </div>
          </div>
          {/* Buttons on the Left Side */}
          <div className="flex space-x-2  mt-[15px]">
            <button className="flex items-center space-x-1 w-[100px] h-[40px] py-[10px] px-[14px] rounded-sm border-[1px] border-[#E0E0E1] shadow-[0px_1px_2px_0px_#0A0D1408] text-[14px]  text-[#DF1C41] cursor-pointer hover:opacity-90 font-urbanist transition-all">
              <User className="w-5 h-5 font-[600]" />
              <span>Suspend</span>
            </button>
            <button className="flex items-center space-x-1 bg-[#1570EF] h-[40px] py-[10px] px-[14px] rounded-sm border-[1px] border-[#E0E0E1] shadow-[0px_1px_2px_0px_#0A0D1408] text-[14px]  text-white cursor-pointer hover:opacity-90 font-urbanist transition-all">
              <Mail className="w-4 h-4 mr-2" />
              <span>Send Notification</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 px-5">
        <nav className="flex space-x-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("User Overview")}
            className={`pb-2 font-urbanist text-sm  transition-colors duration-200  cursor-pointer ${
              activeTab === "User Overview"
                ? "border-b-4 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            User Overview
          </button>
          <button
            onClick={() => setActiveTab("Subscription")}
            className={`pb-2 font-urbanist text-sm transition-colors duration-200 cursor-pointer ${
              activeTab === "Subscription"
                ? "border-b-4 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Subscription
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`pb-2 font-urbanist text-sm  transition-colors duration-200 cursor-pointer ${
              activeTab === "settings"
                ? "border-b-4 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Settings
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "User Overview" && <UserDetails user={user} />}
        {activeTab === "Subscription" && (
          <p className="font-urbanist text-gray-600 text-sm">
            Activity tab content coming soon...
          </p>
        )}
        {activeTab === "settings" && (
          <p className="font-urbanist text-gray-600 text-sm">
            Settings tab content coming soon...
          </p>
        )}
      </div>
    </div>
  );
}
