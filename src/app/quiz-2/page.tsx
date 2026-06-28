import { Quiz } from "@/components/quiz/Quiz";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Diagnóstico gratuito",
  description:
    "Responda 6 perguntas rápidas e receba um diagnóstico com o próximo passo certo pra crescer com previsibilidade.",
  path: "/quiz-2",
});

export default function Quiz2Page() {
  return <Quiz />;
}
