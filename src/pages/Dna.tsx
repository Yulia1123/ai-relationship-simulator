import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { questions, TOTAL_QUESTIONS } from '@/data/questions';
import { useAppStore } from '@/store/useAppStore';
import { ProgressBar } from '@/components/ProgressBar';
import { cn } from '@/lib/utils';

const partLabels: Record<string, string> = {
  A: '依恋取向',
  B: '爱的语言 · 需求',
  C: '爱的语言 · 表达',
  D: '恋爱风格',
  E: '理想爱结构',
  F: '关系信念',
};

export default function Dna() {
  const navigate = useNavigate();
  const { answers, setAnswer } = useAppStore();

  const [index, setIndex] = useState(0);
  const [isSelecting, setIsSelecting] = useState(false);
  const currentQuestion = questions[index];

  const currentAnswer = answers[currentQuestion?.id];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [index]);

  const handleSelect = (value: number | string) => {
    if (!currentQuestion || isSelecting) return;
    setIsSelecting(true);
    setAnswer(currentQuestion.id, value);
    setTimeout(() => {
      if (index < TOTAL_QUESTIONS - 1) {
        setIndex((i) => i + 1);
        setIsSelecting(false);
      } else {
        navigate('/dna/summary');
      }
    }, 280);
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex((i) => i - 1);
    } else {
      navigate('/dna/intro');
    }
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="text-dusk/60">正在整理你的答案...</div>
      </div>
    );
  }

  const options = currentQuestion.options.map((o) => ({ label: o.label, value: o.value }));

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-6 md:py-12">
      <div className="w-full max-w-2xl">
        <div className="mb-6 md:mb-8">
          <button
            type="button"
            onClick={handlePrev}
            className="inline-flex items-center gap-1.5 text-dusk/70 hover:text-rose transition-colors text-sm mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>
              第 {index + 1} / {TOTAL_QUESTIONS} 题 · {partLabels[currentQuestion.part]}
            </span>
          </button>
          <ProgressBar current={index + 1} total={TOTAL_QUESTIONS} />
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28 }}
          >
            <div className="pixel-card p-6 md:p-8 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-1 rounded-md bg-rose/10 text-rose text-xs font-medium">
                  Part {currentQuestion.part}
                </span>
            </div>
              <h2 className="font-display text-xl md:text-2xl text-ink leading-relaxed mb-6">
                {currentQuestion.text}
              </h2>

              <div className="space-y-3">
                {options.map((option) => {
                  const selected = currentAnswer === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleSelect(option.value)}
                      className={cn(
                        'w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 group',
                        'bg-paper/80 hover:-translate-y-0.5 hover:shadow-pixel-sm',
                        selected
                          ? 'border-rose bg-gradient-to-r from-rose/5 to-rose/10 shadow-pixel-sm'
                          : 'border-ink/10 hover:border-rose/40'
                      )}
                    >
                      <span
                        className={cn(
                          'flex-shrink-0 w-6 h-6 rounded-full border-2 transition-colors duration-200 flex items-center justify-center',
                          selected ? 'border-rose bg-rose' : 'border-ink/20 group-hover:border-rose/40'
                        )}
                      >
                        {selected && <span className="w-2.5 h-2.5 rounded-full bg-paper" />}
                      </span>
                      <span className="flex-1 text-ink font-medium">{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="text-center text-dusk/50 text-xs">
              点击选项后将自动进入下一题，你可以随时返回修改
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
