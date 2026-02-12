import { useMemo, useRef, useState } from "react";

type QuizChoice = {
    label: string;
    isCorrect: boolean;
};

type QuizQuestion = {
    prompt: string;
    options: QuizChoice[];
};

const quizQuestions: QuizQuestion[] = [
    {
        prompt: "Let's start easy: do you know how much I love you ?",
        options: [
            { label: "miaou miaou miaou 🐱...", isCorrect: false },
            { label: "miaou miaou miaou 🐱... YES I KNOW.", isCorrect: false },
            { label: "miaou miaou miaou 😼​... no, tell me ! tell me !!!!! I want to know", isCorrect: true },
        ],
    },
    {
        prompt: "Can you guess what I mean here by: 'miaou miaaaaou 😿​​' ?",
        options: [
            { label: "I want more attention 😿​😽", isCorrect: true },
            { label: "I miss you 😿​", isCorrect: true },
            { label: "I need affection 😿​😽", isCorrect: true },
        ],
    },
    {
        prompt: "What's the title of your thesis?",
        options: [
            { label: "no need for a title, because, I, Inés can tesfify that this thesis is the best thesis you'll ever read in your entire life", isCorrect: true },
            { label: "Valeurs faibles en mécanique quantique : questions conceptuelles", isCorrect: false },
            { label: "Philosophy of physics and quantum", isCorrect: false },
        ],
    },
    {
        prompt: "What's your nickname (another easy one) ?",
        options: [
            { label: "Tuntuntung sahur", isCorrect: false },
            { label: "My baby love", isCorrect: true },
            { label: "Cappucina Ballerina", isCorrect: true },
        ],
    },
    {
        prompt: "Where did we have our first date, where we met for the first time ?",
        options: [
            { label: "Tuntuntung sahur's house", isCorrect: false },
            { label: "Season", isCorrect: true },
            { label: "Matcha social club", isCorrect: true },
        ],
    },
    {
        prompt: "What's the name of our favorite restaurant ?",
        options: [
            { label: "Tuntuntung-sahurant", isCorrect: false },
            { label: "restAUront", isCorrect: false },
            { label: "Maslow CHATELET not the other one", isCorrect: true },
        ],
    },
    {
        prompt: "What's the name of our favorite burger place?",
        options: [
            { label: "Tuntuntung-ger", isCorrect: false },
            { label: "Junk", isCorrect: true },
            { label: "Matcha social club", isCorrect: false },
        ],
    },
    {
        prompt: "I have no other inspiration so i'm just going to list what I love about you (all the answers are obv correct",
        options: [
            { label: "You're my excitement everyday i'm so grateful to have you, so happy to come home to you", isCorrect: true },
            { label: "I admire you so much, you're so strong minded, and smart and sensitive and gentle and good", isCorrect: true },
            { label: "You're the prettiest woman alive, I am the luckiest ever to have you with me and to have you loving me", isCorrect: true },
        ],
    },
];

const memories = ["us-1.jpg", "us-2.jpg", "us-3.jpg"];

export default function HomePage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState(0);
    const [gameCleared, setGameCleared] = useState(false);
    const [saidYes, setSaidYes] = useState(false);
    const [noButtonPosition, setNoButtonPosition] = useState({ top: 24, left: 24 });
    const noButtonAreaRef = useRef<HTMLDivElement>(null);

    const baseUrl = import.meta.env.BASE_URL;
    const question = quizQuestions[currentQuestion];
    const normalizedBaseUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;

    const gameProgress = useMemo(() => {
        return Math.round((currentQuestion / quizQuestions.length) * 100);
    }, [currentQuestion]);

    const renderMemoryImage = (memory: string) => (
        <img
            key={memory}
            src={`${normalizedBaseUrl}assets/${memory}`}
            onError={(event) => {
                const image = event.currentTarget;
                const fallbackStep = image.dataset.fallbackStep ?? "0";

                if (fallbackStep === "0") {
                    image.dataset.fallbackStep = "1";
                    image.src = `/assets/${memory}`;
                    return;
                }

                if (fallbackStep === "1") {
                    image.dataset.fallbackStep = "2";
                    image.src = `/pixels-reactjs/assets/${memory}`;
                }
            }}
            alt="Our memory"
            className="h-56 w-full rounded-2xl border border-white/20 object-cover"
        />
    );

    const onQuizChoice = (isCorrect: boolean) => {
        if (!isCorrect) {
            setWrongAnswers((prev) => prev + 1);
            return;
        }

        const nextQuestion = currentQuestion + 1;

        if (nextQuestion >= quizQuestions.length) {
            setGameCleared(true);
            return;
        }

        setCurrentQuestion(nextQuestion);
    };

    const moveNoButton = () => {
        const area = noButtonAreaRef.current;

        if (!area) {
            return;
        }

        const maxLeft = Math.max(0, area.clientWidth - 120);
        const maxTop = Math.max(0, area.clientHeight - 56);
        const randomLeft = Math.floor(Math.random() * maxLeft);
        const randomTop = Math.floor(Math.random() * maxTop);

        setNoButtonPosition({ top: randomTop, left: randomLeft });
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-pink-950 via-slate-950 to-blue-950 px-6 py-10 md:px-14">
            <section className="mx-auto w-full max-w-4xl rounded-3xl border border-white/15 bg-white/5 p-6 shadow-2xl backdrop-blur md:p-10">
                <p className="text-center text-sm tracking-[0.25em] text-pink-200">MISSION Valentine 2026</p>
                <h1 className="mt-3 text-center text-3xl font-bold text-white md:text-5xl">Bethany Louise Terris, will you be my Valentine? </h1>
                <p className="mx-auto mt-4 max-w-2xl text-center text-slate-200">
                    
                </p>
                <div className="mt-6">
                    <h3 className="text-center text-lg font-semibold text-white">Look at us ehehhe</h3>
                    <div className="mt-4 grid gap-4 sm:grid-cols-3">
                        {memories.map((memory) => renderMemoryImage(memory))}
                    </div>
                </div>
                {!saidYes && (
                    <div className="mt-5 flex justify-center">
                        <button
                            onClick={() => {
                                setGameCleared(true);
                                setSaidYes(true);
                            }}
                            className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
                        >
                            You can skip the quiz here if you want to, but I really encourage you to try it
                        </button>
                    </div>
                )}

                {!gameCleared && (
                    <div className="mt-10 rounded-2xl border border-pink-300/25 bg-black/25 p-5 md:p-7">
                        <div className="h-2 overflow-hidden rounded-full bg-white/10">
                            <div className="h-full rounded-full bg-gradient-to-r from-pink-400 to-blue-400 transition-all" style={{ width: `${gameProgress}%` }} />
                        </div>
                        <p className="mt-4 text-sm text-pink-100">Question {currentQuestion + 1} / {quizQuestions.length}</p>
                        <h2 className="mt-2 text-xl font-semibold text-white">{question.prompt}</h2>

                        <div className="mt-6 grid gap-3">
                            {question.options.map((choice) => (
                                <button
                                    key={choice.label}
                                    onClick={() => onQuizChoice(choice.isCorrect)}
                                    className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-left text-base font-medium text-white transition hover:border-pink-300 hover:bg-pink-500/20"
                                >
                                    {choice.label}
                                </button>
                            ))}
                        </div>

                        {wrongAnswers > 0 && (
                            <p className="mt-4 text-sm text-blue-200">
                                Number of wrong answers: {wrongAnswers}. YOU CAN DO IT MY BABY LOVE, I BELIEVE IN YOU, FIGHT FOR OUR LOVE, FIGHT FOR US, FIGHT FOR ME, FIGHT FOR YOU, FIGHT FOR THIS GAME, FIGHT FOR THIS QUIZ, FIGHT FOR THIS VALENTINE'S DAY, FIGHT FOR THIS MOMENT, FIGHT FOR THIS VICTORY, FIGHT FOR THIS LOVE STORY THAT WE'RE WRITING TOGETHER WITH THIS QUIZ. I LOVE YOU SO MUCH AND I KNOW YOU CAN DO IT BECAUSE YOU'RE AMAZING AND SMART AND WONDERFUL AND PERFECT IN EVERY WAY. GO AHEAD MY BABY LOVE, CLICK THE RIGHT ANSWER AND LET'S WIN THIS GAME TOGETHER AND CELEBRATE OUR LOVE WITH A BEAUTIFUL DATE AND A LOT OF CUDDLES AND KISSES AND HAPPINESS. I LOVE YOU
                            </p>
                        )}
                    </div>
                )}

                {gameCleared && !saidYes && (
                    <div className="mt-10 rounded-2xl border border-blue-300/30 bg-blue-950/30 p-6">
                        <p className="text-center text-sm uppercase tracking-[0.2em] text-blue-200">Boss final</p>
                        <h2 className="mt-2 text-center text-3xl font-bold text-white">Now... say yes ?</h2>
                        <p className="mt-3 text-center text-slate-200">Try the button no just for the lols...</p>

                        <div ref={noButtonAreaRef} className="relative mt-8 h-56 rounded-2xl border border-white/20 bg-black/20">
                            <div className="absolute left-1/2 top-5 -translate-x-1/2">
                                <button
                                    onClick={() => setSaidYes(true)}
                                    className="rounded-full bg-gradient-to-r from-pink-500 to-blue-500 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-pink-600/40 transition hover:scale-105"
                                >
                                    YES, obviously 
                                </button>
                            </div>

                            <button
                                onMouseEnter={moveNoButton}
                                onMouseDown={moveNoButton}
                                onTouchStart={moveNoButton}
                                style={{ top: `${noButtonPosition.top}px`, left: `${noButtonPosition.left}px` }}
                                className="absolute rounded-full border border-white/30 bg-white/10 px-6 py-2 font-medium text-white transition"
                            >
                                No
                            </button>
                        </div>
                    </div>
                )}

                {saidYes && (
                    <div className="mt-10 space-y-8">
                        <div className="rounded-2xl border border-pink-300/30 bg-pink-900/20 p-6">
                            <h2 className="text-3xl font-bold text-white">YES!!!!!!! you're my valentine !!!!!! I love you so so sos so sos ososososos much thank you my baby love</h2>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <article className="rounded-2xl border border-pink-300/30 bg-black/25 p-5">
                                <p className="text-xs uppercase tracking-[0.2em] text-pink-200">10:00 AM morning date (we'll rest on the afternoon and cuddle don't worry my baby)</p>
                                <h3 className="mt-2 text-2xl font-semibold text-white">Suggestions</h3>
                                <p className="mt-2 text-slate-200">Réveil: 8:30-9:00 am. Outfit: casual/classy, whatever makes you feel good, comfy and pretty (you're always pretty).</p>
                                <a className="mt-4 inline-block font-medium text-pink-200 underline decoration-pink-300/60 underline-offset-4" href="https://museevieromantique.paris.fr/" target="_blank" rel="noreferrer">
                                    You can click here if you want to see where we're going in the morning 
                                </a>
                            </article>

                            <article className="rounded-2xl border border-blue-300/30 bg-blue-950/30 p-5">
                                <p className="text-xs uppercase tracking-[0.2em] text-blue-200">7:00 PM dinner Date</p>
                                <h3 className="mt-2 text-2xl font-semibold text-white">The Taverna. Greek/Cypriot cuisine</h3>
                                <p className="mt-2 text-slate-200">Amazing, delicious, fresh, greek food made by a Chef. Leaving time: 6:10 pm.</p>
                                <a className="mt-4 inline-block font-medium text-blue-200 underline decoration-blue-300/70 underline-offset-4" href="https://share.google/ohW58kFmlg7x0YP3G" target="_blank" rel="noreferrer">
                                    Link to the resto
                                </a>
                            </article>
                        </div>

                        
                    </div>
                )}
            </section>
        </main>
    );
}