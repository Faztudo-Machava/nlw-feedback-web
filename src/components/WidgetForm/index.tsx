import { CloseButton } from "../CloseButton";
import bugImageUrl from '../../assets/bug.svg';
import ideaImageUrl from '../../assets/idea.svg';
import otherImageUrl from '../../assets/other.svg';
import { useState } from 'react';
import { FeedBackTypeStep } from "./steps/FeedBackTypeStep";
import { FeedBackContentStep } from "./steps/FeedBackContentStep";
import { FeedBackSuccessStep } from "./steps/FeedBackSuccessStep";

export const feedbackTypes = {
    BUG: {
        title: 'Problema',
        image: {
            source: bugImageUrl,
            alt: 'Imagem de um insecto'
        }
    },
    IDEA: {
        title: 'Ideia',
        image: {
            source: ideaImageUrl,
            alt: 'Imagem de uma lampada'
        }
    },
    OTHER: {
        title: 'Outro',
        image: {
            source: otherImageUrl,
            alt: 'Imagem de um balao de pensamento'
        }
    }
}

export type FeedBackType = keyof typeof feedbackTypes;

export function WidgetForm() {
    const [feedbackType, setFeedbackType] = useState<FeedBackType | null>(null);
    const [feedbackSent, setFeedbackSent] = useState(false);

    function handleRestartFeedback() {
        setFeedbackType(null);
        setFeedbackSent(false);
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex  flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">

            {feedbackSent ? (
                <FeedBackSuccessStep
                    onFeedbackRestart={handleRestartFeedback}
                />
            ) : (
                <>
                    {!feedbackType ? (
                        <FeedBackTypeStep onFeedBackTypeChanged={setFeedbackType} />
                    ) : (
                        <FeedBackContentStep
                            onFeedbackRestart={handleRestartFeedback}
                            feedBackType={feedbackType}
                            onFeedbackSent={() => setFeedbackSent(true)}
                        />
                    )}
                </>
            )}

            <footer className="text-xs text-neutral-400">
                Feito com amor pelo <a href="https://www.github.com/faztudo-machava" target="_blank">Fausto</a>.
            </footer>
        </div>
    );
}