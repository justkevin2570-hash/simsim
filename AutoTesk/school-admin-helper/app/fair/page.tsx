import Link from "next/link";
import { getGroupById, getTasksByGroup } from "@/lib/tasks";

export default function FairPage() {
  const group = getGroupById("fair");
  const groupTasks = getTasksByGroup("fair");

  if (!group) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">업무 그룹을 찾을 수 없습니다.</p>
      </main>
    );
  }

  // order 기준으로 그룹화하여 단계별 표시
  const steps = groupTasks.reduce<Record<number, typeof groupTasks>>((acc, task) => {
    if (!acc[task.order]) acc[task.order] = [];
    acc[task.order].push(task);
    return acc;
  }, {});

  const stepLabels: Record<number, string> = {
    1: "계획",
    2: "품의",
    3: "마무리",
  };

  const sortedOrders = Object.keys(steps).map(Number).sort((a, b) => a - b);

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* 헤더 */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-2xl mb-4">
            <span className="text-4xl">{group.icon}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
            {group.title}
          </h1>
          <p className="text-base text-gray-500 max-w-xl mx-auto">
            {group.description}
          </p>
        </div>

        {/* 업무 흐름 */}
        <div className="space-y-10">
          {sortedOrders.map((order, idx) => (
            <div key={order} className={idx > 0 ? "pt-8 border-t border-gray-200" : ""}>
              {/* 단계 라벨 */}
              <div className="flex items-center gap-3 mb-5">
                <div className={`px-3.5 py-1.5 rounded-full text-sm font-bold text-white ${
                  order === 1 ? "bg-blue-600" : order === 2 ? "bg-amber-500" : "bg-green-600"
                }`}>
                  {order}단계
                </div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {stepLabels[order]}
                </h2>
              </div>

              {/* 단계별 업무 카드 */}
              <div className="grid gap-3 md:grid-cols-2">
                {steps[order].map((task) => (
                  <Link
                    key={task.id}
                    href={task.path}
                    className="group flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                  >
                    <span className="text-2xl select-none">
                      {task.icon}
                    </span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {task.title}
                      </div>
                    </div>
                    <span className="text-gray-300 group-hover:text-blue-400 transition-colors">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
