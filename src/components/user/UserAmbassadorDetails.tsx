import { useEffect, useState } from "react";
import { UserAmbassadorData } from "../../types/api";
import { ambassadorService } from "@services/ambassador.service";
import { notFound } from "next/navigation";
import SectionHeader from "./SectionHeader";
// import AmbassadorDetailsSection from "./AmbassadorDetailsSection";
import ReferralStatistics from "./ReferralStatistics";

const UserAmbassadorDetails = ({ userId }: { userId: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userAmbassadorDetails, setUserAmbassadorDetails] = useState<UserAmbassadorData | null>(null);

  useEffect(() => {
    fetchAmbassadorDetails();
  }, [userId]);

  const fetchAmbassadorDetails = async (
    startDate?: string,
    endDate?: string
  ) => {
    try {
      setError(null);
      setIsLoading(true);

      const response = await ambassadorService.getUserAmbassodorDetails("67d807ef636710e00ea02e8b", startDate, endDate);

      if (response.success && response.data) {
        setUserAmbassadorDetails(response.data);
      } else {
        setError(response.message || "Failed to fetch user ambassador data");
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

  // const formatDate = (dateString: string) => {
  //   if (!dateString) return "";
  //   const date = new Date(dateString);

  //   if (isNaN(date.getTime())) return dateString;

  //   const isToday = new Date().toDateString() === date.toDateString();
  //   const day = date.getDate();
  //   const month = date.toLocaleString("default", { month: "long" });
  //   const year = date.getFullYear();

  //   return isToday
  //     ? `Today, ${day} ${month} ${year}`
  //     : `${day} ${month} ${year}`;
  // };

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

  if (!userAmbassadorDetails) {
    notFound();
  }

  return (
    <div>
      <div className="px-5 space-y-8">
        <div className="flex py-[20px]">
          <SectionHeader
            title="Ambassador"
            description="View and manage ambassador tier, referral performance, and eligibility for upgrades."
          />
          {/* <AmbassadorDetailsSection
            userAmbassadorDetails={userAmbassadorDetails}
            formatDate={formatDate}
          /> */}
        </div>

        {/* Referral Statistics Section */}
        <ReferralStatistics ambassadorData={userAmbassadorDetails} />

        {/* Additional sections can be added here */}
      </div>
    </div>
  );
};

export default UserAmbassadorDetails;