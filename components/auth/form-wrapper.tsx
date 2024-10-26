import { Social } from "@/components/auth/social";
import { WrapperHeader } from "@/components/auth/wrapper-header";
import Link from "next/link";

interface FormWrapperProps {
  children?: React.ReactNode;
  headerTitle: string;
  headerSubtitle?: string;
  showSocial?: boolean;
  isLogin?: boolean;
}

export function FormWrapper({
  children,
  headerTitle,
  headerSubtitle,
  showSocial,
  isLogin,
}: FormWrapperProps) {
  const backDescription = isLogin
    ? "Aún no tienes una cuenta?"
    : "Ya tienes una cuenta?";
  const backLabel = isLogin ? "Regístrate" : "Inicia sesión";
  const backHref = isLogin ? "/register" : "/login";

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-full sm:max-w-[500px] px-6 overflow-hidden">
      <WrapperHeader title={headerTitle} subtitle={headerSubtitle} />

      <div className="w-full mt-3">{children}</div>

      <div className="w-full">{showSocial && <Social />}</div>

      <p className="mt-8">
        {backDescription}{" "}
        <Link href={backHref}>
          <span className="dark:text-blue-500 text-blue-600 hover:underline font-semibold">
            {backLabel}
          </span>
        </Link>
      </p>
    </div>
  );
}
