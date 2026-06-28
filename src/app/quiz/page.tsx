import { Quiz2 } from "@/components/quiz/Quiz2";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Teste de 1 minuto",
  description:
    "Descubra como gerar mais agendamentos e faturar mais na sua clínica. Responda o teste de 1 minuto e fale com um especialista.",
  path: "/quiz",
});

export default function QuizPage() {
  return <Quiz2 />;
}
