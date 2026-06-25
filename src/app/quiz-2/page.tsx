import type { Metadata } from "next";
import { Quiz } from "@/components/quiz/Quiz";

export const metadata: Metadata = {
  title: "Diagnóstico gratuito | grovva",
  description:
    "Responda 6 perguntas rápidas e receba um diagnóstico com o próximo passo certo pra crescer com previsibilidade.",
};

export default function Quiz2Page() {
  return <Quiz />;
}
