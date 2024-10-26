import { Logo } from "@/components/common/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full overflow-hidden">
      <div className="hidden md-plus:flex flex-col justify-between w-[38%] 2xl:w-[40%] min-w-[460px] bg-gradient-to-b from-blue-700 via-[#152f79] to-[#0f1935]">
        <Logo fill="#fefeff" className="py-12 px-9" dinamicTextColor />

        <div className="select-none text-[#fefeff] py-12 px-6 space-y-8">
          <h2 className="text-5xl">Simplifica tu Inventario</h2>
          <p className="text-[#fefeffd7] text-xl font-light w-[90%] xl:w-[86%] 2xl:w-[90%]">
            Con ControlIIT, gestiona tu inventario, colabora con tu equipo y
            mantén el control, todo en un solo lugar.
          </p>
        </div>
      </div>
      <div className="flex-1 lg:py-12 max-lg:py-10 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
