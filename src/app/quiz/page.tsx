import type { Metadata } from "next";
import { Quiz2 } from "@/components/quiz/Quiz2";

export const metadata: Metadata = {
  title: "Teste de 1 minuto | Grovva",
  description:
    "Descubra como gerar mais agendamentos e faturar mais na sua clínica. Responda o teste de 1 minuto e fale com um especialista.",
};

export default function QuizPage() {
  return <Quiz2 />;
}
