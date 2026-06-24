"use client";
import Link from "next/link";
import { Button, Card } from "@/components/ui";
import { useTranslations } from "@/src/lib/i18n";

export default function Dashboard() {
  const t = useTranslations("dashboard");

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          <Link href="/stream/new">
            <Button>{t("new_stream")}</Button>
          </Link>
        </div>
        <Card padding="lg" className="text-center">
          <p className="text-gray-400 mb-4">{t("no_streams")}</p>
          <Link href="/stream/new" className="text-green-400 hover:text-green-300">
            {t("create_first")}
          </Link>
        </Card>
      </div>
    </main>
  );
}
