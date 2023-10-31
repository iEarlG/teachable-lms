import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { getAnalytics } from "@/actions/getAnalytics";

import { AnalyticsDataCard } from "@/components/dashboard/analytics/AnalyticsDataCard";

const AnalyticsPage = async () => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const { data, totalRevenue, totalSales } = await getAnalytics(userId);

    return ( 
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <AnalyticsDataCard 
                    label="Total Sales"
                    value={totalSales}
                />
                <AnalyticsDataCard 
                    label="Total Revenue"
                    value={totalRevenue}
                    shouldFormat
                />
            </div>
        </div>
    );
}
 
export default AnalyticsPage;