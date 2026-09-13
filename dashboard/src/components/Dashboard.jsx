import Header from "./Header";
import MiniSummary from "./dashboard-components/MiniSummary";
import TopSellingProducts from "./dashboard-components/TopSellingProducts";
import Stats from "./dashboard-components/Stats";
import MonthlySalesChart from "./dashboard-components/MonthlySalesChart";
import OrdersChart from "./dashboard-components/OrdersChart";
import TopProductsChart from "./dashboard-components/TopProductsChart";

const Dashboard = () => {
  return (
    <>
      <main className="min-h-screen w-full bg-slate-50 p-4 sm:p-5 md:pl-[17rem]">
        <div className="w-full max-w-[1600px] mx-auto">

          {/* ================= HEADER ================= */}
          <Header />

          {/* ================= PAGE INTRO ================= */}
          <section className="mt-5 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />

                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                    Admin Overview
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Dashboard
                </h1>

                <p className="text-sm sm:text-base text-slate-500 mt-1">
                  Monitor your store performance, sales and orders.
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl shadow-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />

                <span className="text-xs font-medium text-slate-600">
                  Store is active
                </span>
              </div>

            </div>
          </section>

          {/* ================= STATS ================= */}
          <section>
            <Stats />
          </section>

          {/* ================= ANALYTICS ================= */}
          <section className="mt-7">

            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Sales Analytics
                </h2>

                <p className="text-xs text-slate-500 mt-0.5">
                  Track your business performance
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <MonthlySalesChart />
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <OrdersChart />
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <TopProductsChart />
              </div>
            </div>

          </section>

          {/* ================= PRODUCTS + SUMMARY ================= */}
          <section className="mt-7 pb-6">

            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Store Insights
                </h2>

                <p className="text-xs text-slate-500 mt-0.5">
                  Your top products and quick business summary
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

              {/* ================= TOP SELLING ================= */}
              <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <TopSellingProducts />
              </div>

              {/* ================= MINI SUMMARY ================= */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <MiniSummary />
              </div>

            </div>

          </section>

        </div>
      </main>
    </>
  );
};

export default Dashboard;