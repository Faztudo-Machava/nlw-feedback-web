import { ArrowLeft, Camera } from "phosphor-react";
import { FeedBackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import { ScreenShotButton } from "../ScreenShotButton";
import { FormEvent, useState } from 'react';
import { api } from "../../../service/api";
import { Loading } from "../../Loading";

interface FeedBackContentStepProps {
    feedBackType: FeedBackType,
    onFeedbackRestart: () => void,
    onFeedbackSent: () => void
}

export function FeedBackContentStep({ feedBackType, onFeedbackRestart, onFeedbackSent }: FeedBackContentStepProps) {
    const feedBackTypeInfo = feedbackTypes[feedBackType];
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [comment, setComment] = useState<string>('');
    const [isSendingFeedback, setIsSendingFeedback] = useState<boolean>(false);

    async function handleSubmitFeedback(event: FormEvent) {
        event.preventDefault();

        setIsSendingFeedback(true);

        await api.post('/feedbacks', {
            type: feedBackType,
            comment,
            screenshot
        });

        setIsSendingFeedback(false);

        onFeedbackSent();
    }

    return (
        <>
            <header className="text-lg">
                <button onClick={onFeedbackRestart} className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100">
                    <ArrowLeft />
                </button>
                <span className="text-xl leading-6 flex items-center gap-2">
                    <img src={feedBackTypeInfo.image.source} alt={feedBackTypeInfo.image.alt} />
                    {feedBackTypeInfo.title}
                </span>
                <CloseButton />
            </header>
            <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
                <textarea
                    className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 bg-transparent border-zinc-400 rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
                    placeholder="Conte com detalhes oque aconteceu."
                    onChange={(event) => setComment(event.target.value)}
                />

                <footer className="flex gap-2 mt-2">
                    <ScreenShotButton
                        screenshotTook={screenshot}
                        onScreenshotTook={setScreenshot}
                    />
                    <button
                        disabled={comment.length === 0 || isSendingFeedback}
                        className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                    >
                        {isSendingFeedback ? <Loading /> : 'Enviar feedback'}
                    </button>
                </footer>

            </form>
        </>
    );
}