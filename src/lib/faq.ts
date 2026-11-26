import type { CalendarEvent } from "@/lib/calendar";
import type { FaqItem } from "@/lib/seo";
import { LEGAL } from "@/lib/legal";

/**
 * Questions fréquentes : réponses courtes et autonomes (40 à 70 mots), reprises telles quelles
 * par Google, ChatGPT, Perplexity ou Claude. Chaque affirmation vient du site ou du registre officiel.
 */
export function buildFaq(events: CalendarEvent[]): FaqItem[] {
  const calendar = events.map((e) => `${e.title} (${e.dateLabel.toLowerCase()}, ${e.location})`).join(" ; ");

  return [
    {
      question: "Qu'est-ce que Take Your Gloves ?",
      answer:
        `Take Your Gloves est un organisateur d'événements automobiles basé en Alsace, près de Strasbourg (siège à ${LEGAL.address.city}). ` +
        "Il propose des rallyes touristiques, des journées conviviales, des sorties circuit, des road trips et des expériences atypiques pour les conducteurs de voitures de sport. " +
        `La société, dirigée par ${LEGAL.publicationDirector.name}, rassemble une communauté de plus de 250 passionnés.`,
    },
    {
      question: "Qu'est-ce qu'un rallye touristique ?",
      answer:
        "Un rallye touristique est une balade automobile organisée, sans chronométrage de vitesse, sur un itinéraire préparé à l'avance et décrit dans un roadbook. " +
        "On y roule pour découvrir de belles routes et de beaux paysages et pour partager des moments conviviaux. Chez Take Your Gloves, ce n'est pas une compétition : la convivialité passe avant la performance.",
    },
    {
      question: "Quels événements Take Your Gloves organise-t-il en 2027 ?",
      answer: `Le calendrier 2027 compte ${events.length} rendez-vous : ${calendar}. Les programmes détaillés sont annoncés au fil de la saison sur chaque page d'événement.`,
    },
    {
      question: "Où ont lieu les rallyes et sorties Take Your Gloves ?",
      answer:
        "Principalement en Alsace et dans le massif des Vosges, avec des escapades en Bourgogne, en Corse, en Italie et en Slovénie, ainsi que du pilotage sur glace en Autriche. " +
        "Les 500 Nocturnes se déroulent à l'Anneau du Rhin, près de Colmar.",
    },
    {
      question: "À qui s'adressent les événements ?",
      answer:
        "Aux passionnés de voitures de sport et de GT, du conducteur occasionnel au pilote confirmé. " +
        "Chaque événement est encadré par des pilotes expérimentés, avec des briefings sécurité systématiques et des groupes adaptés au niveau de chacun.",
    },
    {
      question: "Comment s'inscrire ou recevoir le programme d'un événement ?",
      answer:
        "Chaque événement a sa page avec un formulaire « Recevoir les infos » : il suffit d'y laisser un email ou un téléphone pour recevoir le programme en avant-première. " +
        `Pour une demande personnalisée, le formulaire de contact du site ou l'adresse ${LEGAL.email} permettent d'échanger directement avec l'organisateur.`,
    },
    {
      question: "Take Your Gloves organise-t-il des événements pour les entreprises et les concessions ?",
      answer:
        "Oui. Take Your Gloves conçoit des expériences clients pour les concessions, garages, carrossiers et selliers, en marque blanche ou en partenariat visible : road trips, journées pilotage, stages glace, coulisses de courses. " +
        "Ces formats conviennent aussi au team building et aux relations d'affaires.",
    },
  ];
}
