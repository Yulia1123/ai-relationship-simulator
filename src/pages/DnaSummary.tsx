import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Heart,
  Sparkles,
  ShieldAlert,
  Compass,
  Search,
  MessageCircle,
  Clock,
  Gift,
  Wrench,
  HandHeart,
  Flame,
  Lock,
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { PixelButton } from '@/components/PixelButton';
import { AttachmentQuadrant } from '@/components/AttachmentQuadrant';
import { RadarChart } from '@/components/RadarChart';
import { ARCHETYPES, LEE_LABELS, ATTACHMENT_LABELS } from '@/data/archetypes';
import { SOULMATE_MATCHES } from '@/data/soulmateMatches';
import {
  computeLoveDna,
  determineArchetype,
  generateSummary,
  attachmentLabel,
  beliefLabel,
  dominantStyleLabel,
  dominantLeeStyle,
  secondLeeStyle,
  socialTags,
  mismatchDiagnosis,
  topNeedLanguages,
  topExpressionLanguages,
  triadInterpretation,
  toUserVector,
  weightedDistance,
  similarityPercent,
} from '@/lib/loveDna';
import type { LoveDna } from '@/types';

function buildLeeSeries(loveDna: LoveDna) {
  return [
    {
      key: 'user',
      values: {
        eros: loveDna.lee.eros,
        ludus: loveDna.lee.ludus,
        storge: loveDna.lee.storge,
        pragma: loveDna.lee.pragma,
        mania: loveDna.lee.mania,
        agape: loveDna.lee.agape,
      },
      fill: 'rgba(215, 138, 138, 0.22)',
      stroke: '#D78A8A',
    },
  ];
}

function FitRing({ fit }: { fit: number }) {
  let caption = '特质鲜明，非常典型';
  if (fit >= 90) caption = '极度典型，原型感爆棚';
  else if (fit >= 75) caption = '相当典型，风格很稳';
  else if (fit >= 60) caption = '有一定原型倾向';
  else caption = '气质比较复合，仍在探索中';

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-28 h-28 rounded-full border-4 border-rose/15 flex items-center justify-center bg-white/60 backdrop-blur-sm">
        <div className="text-center">
          <div className="text-4xl font-display text-rose leading-none">{fit}%</div>
          <div className="text-[10px] text-dusk/70 mt-1">典型度</div>
        </div>
      </div>
      <p className="text-xs text-dusk/70 mt-3 max-w-[16rem]">{caption}</p>
    </div>
  );
}

export default function DnaSummary() {
  const navigate = useNavigate();
  const { answers, loveDna, personality, top3, setLoveDna } = useAppStore();

  useEffect(() => {
    const hasAnswers = Object.keys(answers).length > 0;
    if (!hasAnswers) {
      navigate('/dna');
      return;
    }
    const computedDna = computeLoveDna(answers);
    const { personality: computedPersonality, top3: computedTop3 } = determineArchetype(computedDna);
    const summary = generateSummary(computedPersonality, computedDna);
    setLoveDna(computedDna, summary, computedPersonality, computedTop3);
  }, [answers, navigate, setLoveDna]);

  if (!loveDna || !personality || !top3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="text-dusk/60">正在计算你的 Love DNA...</div>
      </div>
    );
  }

  const tags = socialTags(loveDna);
  const diagnosis = mismatchDiagnosis(loveDna);
  const dominantLee = dominantLeeStyle(loveDna);
  const secondLee = secondLeeStyle(loveDna);
  const userVec = toUserVector(loveDna);
  const leeSeries = buildLeeSeries(loveDna);
  const topNeed = topNeedLanguages(loveDna, 1)[0];
  const topExpr = topExpressionLanguages(loveDna, 1)[0];
  const triad = triadInterpretation(loveDna);

  const loveLanguageIcon: Record<string, React.ReactNode> = {
    words: <MessageCircle className="w-4 h-4 text-rose" />,
    time: <Clock className="w-4 h-4 text-rose" />,
    gifts: <Gift className="w-4 h-4 text-rose" />,
    acts: <Wrench className="w-4 h-4 text-rose" />,
    touch: <HandHeart className="w-4 h-4 text-rose" />,
  };
  const loveLanguageText: Record<string, string> = {
    words: '具体的夸奖、肯定和甜言蜜语',
    time: '不被打扰的专注陪伴',
    gifts: '用心准备的小惊喜和仪式感',
    acts: '实实在在为你分担和做事',
    touch: '拥抱、牵手等身体亲近',
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-5 py-8 md:py-12 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(255,180,190,0.25)_0%,transparent_65%)] blur-2xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(232,200,154,0.2)_0%,transparent_65%)] blur-2xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-3xl relative z-10"
      >
        {/* 顶部小标签 */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 text-rose mb-4 px-4 py-1.5 bg-white/70 backdrop-blur-sm border border-rose/20 rounded-full">
            <Heart className="w-4 h-4" />
            <span className="font-display tracking-widest text-sm">LOVE DNA</span>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        {/* 6.1 结论头部卡：小红书大字报 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/60 backdrop-blur-md border-2 border-rose/15 rounded-2xl p-6 md:p-10 mb-6 relative overflow-hidden shadow-[0_8px_32px_rgba(215,138,138,0.12)]"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose via-amber to-moss" />
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-rose/10 rounded-full blur-2xl" />
          <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-moss/10 rounded-full blur-2xl" />

          <div className="text-center relative">
            <h2 className="font-display text-xl md:text-2xl text-ink mb-2">
              你的正缘恋爱动物原型是 ——
            </h2>
            <h1 className="font-display text-5xl md:text-6xl text-rose mb-3">{personality.name}</h1>
            <p className="text-rose/90 text-base md:text-lg font-medium mb-4">{personality.slogan}</p>

            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-rose/10 text-rose text-xs font-medium border border-rose/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex justify-center mb-6">
              <FitRing fit={personality.fit} />
            </div>

            <p className="text-dusk/80 text-sm leading-relaxed max-w-lg mx-auto">{personality.portrait}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-4 rounded-xl bg-rose/5 border border-rose/10">
              <h3 className="font-display text-rose text-sm mb-1">闪光点</h3>
              <p className="text-dusk text-sm leading-relaxed">{personality.spark}</p>
            </div>
            <div className="p-4 rounded-xl bg-amber/5 border border-amber/20">
              <h3 className="font-display text-amber-700 text-sm mb-1">翻车点</h3>
              <p className="text-dusk text-sm leading-relaxed">{personality.flip}</p>
            </div>
          </div>
        </motion.div>

        {/* 6.2 判型依据块 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white/60 backdrop-blur-md border-2 border-rose/15 rounded-2xl p-6 md:p-8 mb-6 shadow-[0_8px_32px_rgba(215,138,138,0.12)]"
        >
          <h2 className="font-display text-xl text-ink mb-4 flex items-center gap-2">
            <Search className="w-5 h-5 text-rose" />
            为什么是你？
          </h2>
          <div className="space-y-3 text-sm">
            <div className="p-4 rounded-xl bg-rose/5 border border-rose/10">
              <div className="font-medium text-ink mb-1">依据一：依恋定位</div>
              <p className="text-dusk leading-relaxed">
                你的焦虑轴得分{' '}
                <span className="text-rose font-medium">{loveDna.attachment.anxiety}分</span>，回避轴得分{' '}
                <span className="text-rose font-medium">{loveDna.attachment.avoidance}分</span>
                {' '}→ 锁定为{' '}
                <span className="text-rose font-medium">{ATTACHMENT_LABELS[loveDna.attachment.type]}</span>。
              </p>
            </div>
            <div className="p-4 rounded-xl bg-rose/5 border border-rose/10">
              <div className="font-medium text-ink mb-1">依据二：恋爱风格主导色</div>
              <p className="text-dusk leading-relaxed">
                在 6 大恋爱风格中，你的{' '}
                <span className="text-rose font-medium">
                  {dominantLee ? LEE_LABELS[dominantLee] : ''}风格
                </span>{' '}
                斩获最高分{' '}
                <span className="text-rose font-medium">{dominantLee ? loveDna.lee[dominantLee] : 0}分</span>
                {' '}→ 锁定为{' '}
                <span className="text-rose font-medium">{dominantStyleLabel(loveDna)}</span>主导。
              </p>
            </div>
            <div className="p-4 rounded-xl bg-moss/5 border border-moss/10">
              <div className="font-medium text-ink mb-1">融合因果</div>
              <p className="text-dusk leading-relaxed">
                {LEE_LABELS[dominantLee ?? 'eros']}系 × {ATTACHMENT_LABELS[loveDna.attachment.type]} →
                命中注定，你是一只<span className="text-rose font-medium">【{personality.name}】</span>。
              </p>
            </div>
          </div>
        </motion.div>

        {/* 6.3 爱语说明书 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/60 backdrop-blur-md border-2 border-rose/15 rounded-2xl p-6 md:p-8 mb-6 shadow-[0_8px_32px_rgba(215,138,138,0.12)]"
        >
          <h2 className="font-display text-xl text-ink mb-2 flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose" />
            你的爱语说明书
          </h2>
          <p className="text-dusk/70 text-sm mb-5">
            每个人接收爱和表达爱的频道不同。看清自己的频道，才不会把深情发错地址。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              className="p-4 rounded-xl bg-rose/5 border border-rose/10"
            >
              <h3 className="font-display text-rose text-sm mb-3">你最需要的爱</h3>
              {topNeed ? (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {loveLanguageIcon[topNeed.key]}
                    <span className="font-display text-ink text-lg">{topNeed.label}</span>
                    <span className="text-xs text-dusk/60">{topNeed.value}分</span>
                  </div>
                  <p className="text-dusk text-sm leading-relaxed">
                    对你来说，<span className="text-rose font-medium">{loveLanguageText[topNeed.key]}</span>
                    是最能让你确信「我被爱着」的信号。
                  </p>
                </div>
              ) : (
                <p className="text-dusk text-sm">你的爱语需求比较分散，可以多观察自己在哪一刻最有安全感。</p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.28 }}
              className="p-4 rounded-xl bg-amber/5 border border-amber/20"
            >
              <h3 className="font-display text-amber-700 text-sm mb-3">你最擅长给出的爱</h3>
              {topExpr ? (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {loveLanguageIcon[topExpr.key]}
                    <span className="font-display text-ink text-lg">{topExpr.label}</span>
                    <span className="text-xs text-dusk/60">{topExpr.value}分</span>
                  </div>
                  <p className="text-dusk text-sm leading-relaxed">
                    你习惯用<span className="text-amber-700 font-medium">{loveLanguageText[topExpr.key]}</span>
                    来表达在乎，但对方未必用同一个频道接收。
                  </p>
                </div>
              ) : (
                <p className="text-dusk text-sm">你表达爱的方式比较含蓄，不妨先问问对方想怎么被爱。</p>
              )}
            </motion.div>
          </div>

          {topNeed && topExpr && topNeed.key !== topExpr.key && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32 }}
              className="p-4 rounded-xl bg-amber/5 border border-amber/20"
            >
              <h3 className="font-display text-amber-800 text-sm mb-2">错位提醒</h3>
              <p className="text-dusk text-sm leading-relaxed">
                你渴望的是 <span className="text-rose font-medium">{topNeed.label}</span>，
                却常常给出 <span className="text-amber-700 font-medium">{topExpr.label}</span>。
                爱不是「我有什么就给什么」，而是试着用对方需要的方式说爱。
                {diagnosis.text}
              </p>
            </motion.div>
          )}

          {topNeed && topExpr && topNeed.key === topExpr.key && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32 }}
              className="p-4 rounded-xl bg-moss/5 border border-moss/10"
            >
              <h3 className="font-display text-moss text-sm mb-2">同频优势</h3>
              <p className="text-dusk text-sm leading-relaxed">
                你最需要的爱，恰好也是你最擅长给出的爱。这种「知行一致」让你在感情里很少出现
                「我明明很爱你，你却感受不到」的错位。继续保持，也记得观察伴侣是否需要别的频道。
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* 6.4 TOP3 影子人格卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white/60 backdrop-blur-md border-2 border-rose/15 rounded-2xl p-6 md:p-8 mb-6 shadow-[0_8px_32px_rgba(215,138,138,0.12)]"
        >
          <h2 className="font-display text-xl text-ink mb-4 flex items-center gap-2">
            <Compass className="w-5 h-5 text-rose" />
            你的 TOP3 影子人格
          </h2>
          <div className="space-y-4">
            {top3.map((item, idx) => {
              const titles = ['主型（100%主导）', '影子人格（同风格另一依恋面）', '第二风格'];
              const hints = [
                '这是你当前最稳定的恋爱底色。',
                '如果你的安全感崩塌、依恋翻面，你将瞬间黑化为这只动物。',
                '在主型之下，你的潜意识里还流淌着这只动物的温柔血液。',
              ];
              const isMain = idx === 0;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.08 }}
                  className={`p-4 rounded-xl border ${isMain ? 'bg-rose/5 border-rose/20' : 'bg-white/50 border-ink/5'}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded ${
                          isMain ? 'bg-rose text-paper' : 'bg-dusk/10 text-dusk'
                        }`}
                      >
                        {titles[idx]}
                      </span>
                      <span className={`font-display ${isMain ? 'text-ink text-lg' : 'text-ink/90'}`}>
                        {item.name}
                      </span>
                    </div>
                    <span className={`text-sm font-medium ${isMain ? 'text-rose' : 'text-dusk'}`}>
                      {item.fit}%
                    </span>
                  </div>
                  <p className="text-dusk/80 text-sm mb-1">{item.slogan}</p>
                  <p className="text-dusk/60 text-xs leading-relaxed">{hints[idx]}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* 依恋定位 + Lee 雷达（补充） */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/60 backdrop-blur-md border-2 border-rose/15 rounded-2xl p-6 md:p-8 mb-6 shadow-[0_8px_32px_rgba(215,138,138,0.12)]"
        >
          <h2 className="font-display text-xl text-ink mb-2 flex items-center gap-2">
            <Compass className="w-5 h-5 text-rose" />
            依恋定位 + 恋爱风格雷达
          </h2>
          <p className="text-dusk/70 text-sm mb-6">
            焦虑 × 回避四象限定位你的依恋模式；Lee 六轴雷达展示你的恋爱风格光谱。
          </p>
          <div className="flex flex-col md:flex-row items-center justify-around gap-8">
            <AttachmentQuadrant loveDna={loveDna} size={260} className="mx-auto" />
            <div className="flex flex-col items-center">
              <RadarChart
                labels={LEE_LABELS}
                series={leeSeries}
                size={260}
                highlightKey={dominantLee ?? undefined}
                className="mx-auto"
              />
              <p className="text-rose text-sm font-medium mt-2">主导：{dominantStyleLabel(loveDna)}</p>
              {secondLee && (
                <p className="text-dusk/60 text-xs mt-1">
                  第二风格：{LEE_LABELS[secondLee]}（{loveDna.lee[secondLee]}分）
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* 爱的结构 + 信念 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white/60 backdrop-blur-md border-2 border-rose/15 rounded-2xl p-6 md:p-8 mb-6 shadow-[0_8px_32px_rgba(215,138,138,0.12)]"
        >
          <h2 className="font-display text-xl text-ink mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-rose" />
            你的爱情配方 + 关系信念
          </h2>
          <p className="text-dusk/70 text-sm mb-5">
            Sternberg 三元论把爱拆成三块：亲密、激情、承诺。它们的配比，决定了你理想中爱情的味道。
          </p>

          <div className="space-y-4 mb-5">
            {[
              { key: 'intimacy', label: '亲密', icon: <Heart className="w-4 h-4 text-rose" />, value: loveDna.triad.intimacy },
              { key: 'passion', label: '激情', icon: <Flame className="w-4 h-4 text-rose" />, value: loveDna.triad.passion },
              { key: 'commitment', label: '承诺', icon: <Lock className="w-4 h-4 text-rose" />, value: loveDna.triad.commitment },
            ].map((item, idx) => (
              <div key={item.key}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span className="text-sm font-medium text-ink">{item.label}</span>
                  </div>
                  <span className="text-sm font-medium text-rose">{item.value}%</span>
                </div>
                <div className="h-2.5 bg-mist rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-rose to-amber"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 0.7, delay: 0.4 + idx * 0.05 }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-4 rounded-xl bg-rose/5 border border-rose/10"
            >
              <h3 className="font-display text-rose text-sm mb-2">配方解读：{triad.label}</h3>
              <p className="text-dusk text-sm leading-relaxed">{triad.text}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.53 }}
              className="p-4 rounded-xl bg-moss/5 border border-moss/10"
            >
              <h3 className="font-display text-moss text-sm mb-2">关系信念</h3>
              <p className="text-dusk text-sm leading-relaxed mb-3">{beliefLabel(loveDna)}</p>
              <div className="relative h-2 bg-mist rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-rose via-amber to-moss opacity-40" />
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-ink border-2 border-white shadow"
                  initial={{ left: 0 }}
                  animate={{ left: `calc(${loveDna.belief}% - 6px)` }}
                  transition={{ duration: 0.7, delay: 0.55 }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-dusk/60 mt-1.5">
                <span>宿命观</span>
                <span>{loveDna.belief}% 成长观</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* 你的两个最佳正缘人格 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/60 backdrop-blur-md border-2 border-rose/15 rounded-2xl p-6 md:p-8 mb-6 shadow-[0_8px_32px_rgba(215,138,138,0.12)]"
        >
          <h2 className="font-display text-xl text-ink mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose" />
            你的两个最佳正缘人格
          </h2>
          <div className="space-y-5">
            {SOULMATE_MATCHES[personality.id]?.map((match, idx) => {
              const matchVec = ARCHETYPES.find((a) => a.id === match.id)!.vector;
              const fit = similarityPercent(weightedDistance(userVec, matchVec));
              return (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + idx * 0.08 }}
                  className="p-4 rounded-xl bg-rose/5 border border-rose/10"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-rose text-paper">
                        正缘 {idx + 1}
                      </span>
                      <span className="font-display text-ink text-lg">{match.name}</span>
                    </div>
                    <span className="text-sm font-medium text-rose">{fit}% 匹配</span>
                  </div>
                  <p className="text-rose/90 text-sm font-medium mb-2">{match.slogan}</p>
                  <p className="text-dusk/80 text-sm leading-relaxed mb-3">{match.portrait}</p>
                  <ul className="space-y-2">
                    {match.advice.map((line, i) => (
                      <li key={i} className="flex items-start gap-2 text-dusk text-sm leading-relaxed">
                        <span className="text-rose mt-0.5">✦</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* 免责声明 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-amber/5 border-2 border-amber/20 rounded-2xl p-5 md:p-6 mb-8"
        >
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display text-ink text-sm mb-1">这是认识自己的镜子，不是心理诊断。</h3>
              <p className="text-dusk/80 text-sm leading-relaxed">
                本测试为经典爱情心理学量表（Lee / Attachment / Chapman）的情景拼合，旨在提供恋爱自我觉察与娱乐。这是一面认识自己的镜子，而非心理临床诊断，请坦诚拥抱属于你的动物天性。
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <p className="text-dusk/70 mb-6 text-sm leading-relaxed">
            接下来，AI 将根据这份 Love DNA，为你生成三位不同方向上的正缘。
          </p>
          <PixelButton onClick={() => navigate('/soulmate')} className="w-full max-w-xs">
            生成正缘对象 <ArrowRight className="w-4 h-4 ml-2" />
          </PixelButton>
        </motion.div>
      </motion.div>
    </div>
  );
}
