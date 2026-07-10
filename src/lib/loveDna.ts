import type { Answers, AttachmentType, LeeStyle, LoveDna, LoveArchetypeResult, TopArchetype } from '@/types';
import { questions } from '@/data/questions';
import { ARCHETYPES, getArchetypeResult, getAnimalByGrid } from '@/data/archetypes';

const LEE_STYLES: LeeStyle[] = ['eros', 'ludus', 'storge', 'pragma', 'mania', 'agape'];
const LOVE_KEYS = ['words', 'time', 'gifts', 'acts', 'touch'] as const;

// 统计 D 部分（Lee 恋爱风格）每个 style 实际出现多少次选项，用于正确归一化
const LEE_D_TOTAL: Record<LeeStyle, number> = LEE_STYLES.reduce((acc, style) => {
  acc[style] = 0;
  return acc;
}, {} as Record<LeeStyle, number>);

for (const q of questions) {
  if (q.part !== 'D') continue;
  for (const o of q.options) {
    for (const key of Object.keys(o.effects)) {
      if (key.startsWith('lee.')) {
        const style = key.replace('lee.', '') as LeeStyle;
        LEE_D_TOTAL[style] += 1;
      }
    }
  }
}

function clamp(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

// 关系信念：把 5 种选项映射到 0(宿命) ~ 100(成长) 的连续轴
const BELIEF_SCORE: Record<string, number> = {
  'belief.destiny': 0,
  'belief.symbiotic': 25,
  'belief.rational': 50,
  'belief.independent': 50,
  'belief.growth': 100,
};

export function computeLoveDna(answers: Answers): LoveDna {
  // A 部分：依恋轴均值
  let attachmentAnxietySum = 0;
  let attachmentAvoidanceSum = 0;
  let attachmentCount = 0;

  // F 部分：依恋轴微调、Lee 加成、信念
  let fxAnxiety = 0;
  let fxAvoidance = 0;
  let beliefSum = 0;
  let beliefCount = 0;

  const needCounts: Record<string, number> = {};
  const expressionCounts: Record<string, number> = {};
  const leeDCounts: Record<LeeStyle, number> = LEE_STYLES.reduce((acc, s) => {
    acc[s] = 0;
    return acc;
  }, {} as Record<LeeStyle, number>);
  const leeBonus: Record<LeeStyle, number> = LEE_STYLES.reduce((acc, s) => {
    acc[s] = 0;
    return acc;
  }, {} as Record<LeeStyle, number>);
  const triadCounts: Record<string, number> = {};

  for (const q of questions) {
    const ans = answers[q.id];
    if (ans === undefined) continue;
    const option = q.options.find((o) => o.value === ans);
    if (!option) continue;

    if (q.part === 'A') {
      attachmentCount += 1;
    }

    for (const [key, delta] of Object.entries(option.effects)) {
      if (key === 'attachment.anxiety') {
        if (q.part === 'A') attachmentAnxietySum += delta;
        else fxAnxiety += delta;
      } else if (key === 'attachment.avoidance') {
        if (q.part === 'A') attachmentAvoidanceSum += delta;
        else fxAvoidance += delta;
      } else if (key.startsWith('need.')) {
        needCounts[key] = (needCounts[key] || 0) + delta;
      } else if (key.startsWith('expression.')) {
        expressionCounts[key] = (expressionCounts[key] || 0) + delta;
      } else if (key.startsWith('lee.')) {
        const style = key.replace('lee.', '') as LeeStyle;
        if (q.part === 'D') leeDCounts[style] += delta;
        else leeBonus[style] += delta;
      } else if (key.startsWith('triad.')) {
        triadCounts[key] = (triadCounts[key] || 0) + delta;
      } else if (key.startsWith('belief.')) {
        const score = BELIEF_SCORE[key];
        if (score !== undefined) {
          beliefSum += score * delta;
          beliefCount += delta;
        }
      }
    }
  }

  const anxiety = clamp(
    (attachmentCount > 0 ? attachmentAnxietySum / attachmentCount : 0) + fxAnxiety
  );
  const avoidance = clamp(
    (attachmentCount > 0 ? attachmentAvoidanceSum / attachmentCount : 0) + fxAvoidance
  );

  const attachmentType: AttachmentType =
    anxiety < 50 && avoidance < 50
      ? 'secure'
      : anxiety >= 50 && avoidance < 50
        ? 'anxious'
        : anxiety < 50 && avoidance >= 50
          ? 'avoidant'
          : 'fearful';

  const needQuestionCount = questions.filter((q) => q.part === 'B').length || 1;
  const expressionQuestionCount = questions.filter((q) => q.part === 'C').length || 1;
  const triadQuestionCount = questions.filter((q) => q.part === 'E').length || 1;

  const need: LoveDna['need'] = {
    words: clamp((needCounts['need.words'] || 0) / needQuestionCount * 100),
    time: clamp((needCounts['need.time'] || 0) / needQuestionCount * 100),
    gifts: clamp((needCounts['need.gifts'] || 0) / needQuestionCount * 100),
    acts: clamp((needCounts['need.acts'] || 0) / needQuestionCount * 100),
    touch: clamp((needCounts['need.touch'] || 0) / needQuestionCount * 100),
  };

  const expression: LoveDna['expression'] = {
    words: clamp((expressionCounts['expression.words'] || 0) / expressionQuestionCount * 100),
    time: clamp((expressionCounts['expression.time'] || 0) / expressionQuestionCount * 100),
    gifts: clamp((expressionCounts['expression.gifts'] || 0) / expressionQuestionCount * 100),
    acts: clamp((expressionCounts['expression.acts'] || 0) / expressionQuestionCount * 100),
    touch: clamp((expressionCounts['expression.touch'] || 0) / expressionQuestionCount * 100),
  };

  const lee: LoveDna['lee'] = LEE_STYLES.reduce((acc, style) => {
    const total = LEE_D_TOTAL[style] || 1;
    const base = (leeDCounts[style] / total) * 100;
    const bonus = leeBonus[style] * 25; // 每多一次 D 选项 ≈ 25 分
    acc[style] = clamp(base + bonus);
    return acc;
  }, {} as LoveDna['lee']);

  const triad: LoveDna['triad'] = {
    intimacy: clamp((triadCounts['triad.intimacy'] || 0) / triadQuestionCount * 100),
    passion: clamp((triadCounts['triad.passion'] || 0) / triadQuestionCount * 100),
    commitment: clamp((triadCounts['triad.commitment'] || 0) / triadQuestionCount * 100),
  };

  const belief = beliefCount > 0 ? clamp(beliefSum / beliefCount) : 50;

  return {
    attachment: { anxiety, avoidance, type: attachmentType },
    need,
    expression,
    lee,
    triad,
    belief,
  };
}

// 22 维向量顺序，与 ARCHETYPES.vector 严格一致
export function toUserVector(loveDna: LoveDna): number[] {
  return [
    loveDna.attachment.anxiety,
    loveDna.attachment.avoidance,
    loveDna.lee.eros,
    loveDna.lee.ludus,
    loveDna.lee.storge,
    loveDna.lee.pragma,
    loveDna.lee.mania,
    loveDna.lee.agape,
    loveDna.need.words,
    loveDna.need.time,
    loveDna.need.gifts,
    loveDna.need.acts,
    loveDna.need.touch,
    loveDna.expression.words,
    loveDna.expression.time,
    loveDna.expression.gifts,
    loveDna.expression.acts,
    loveDna.expression.touch,
    loveDna.triad.intimacy,
    loveDna.triad.passion,
    loveDna.triad.commitment,
    loveDna.belief,
  ];
}

// 典型度距离：聚焦「分类维度」
// 依恋两轴等权 + 该原型主导 Lee 风格与用户的差距
// 这样回答的是「你在这类动物中有多典型」，避免被爱语/三元结构拉低主型分数
export function weightedDistance(u: number[], a: number[]): number {
  const attachMsd = ((u[0] - a[0]) ** 2 + (u[1] - a[1]) ** 2) / 2;
  const leeValues = a.slice(2, 8);
  const archetypeDominantIdx = leeValues.indexOf(Math.max(...leeValues)) + 2;
  const leeDiff = u[archetypeDominantIdx] - a[archetypeDominantIdx];
  return Math.sqrt(2.5 * attachMsd + 5.0 * leeDiff ** 2);
}

export function similarityPercent(distance: number): number {
  return Math.round(100 * Math.exp(-distance / 250));
}

function archetypeFit(userVec: number[], a: typeof ARCHETYPES[number]): TopArchetype {
  return {
    id: a.id,
    name: a.name,
    slogan: a.slogan,
    fit: similarityPercent(weightedDistance(userVec, a.vector)),
  };
}

export function determineArchetype(loveDna: LoveDna): {
  personality: LoveArchetypeResult;
  top3: TopArchetype[];
} {
  const userVec = toUserVector(loveDna);
  const { type: attachmentType } = loveDna.attachment;

  const leeEntries = Object.entries(loveDna.lee).sort((a, b) => b[1] - a[1]);
  const dominantLee = leeEntries[0][0] as LeeStyle;
  const secondLee = leeEntries[1]?.[0] as LeeStyle | undefined;

  const main = getAnimalByGrid(dominantLee, attachmentType);
  const mainFit = archetypeFit(userVec, main);

  // 影子人格：同 Lee 风格、不同依恋象限；优先选贴近主型但不反超主型典型度的
  const sameStyleOthers = ARCHETYPES.filter(
    (a) => a.lee === dominantLee && a.attachment !== attachmentType
  )
    .map((a) => archetypeFit(userVec, a))
    .sort((x, y) => y.fit - x.fit);

  const shadow =
    sameStyleOthers.find((s) => s.fit <= mainFit.fit) ?? sameStyleOthers[sameStyleOthers.length - 1] ?? mainFit;

  const third = secondLee
    ? archetypeFit(userVec, getAnimalByGrid(secondLee, attachmentType))
    : archetypeFit(userVec, ARCHETYPES[0]);

  const top3: TopArchetype[] = [mainFit, shadow, third];
  const personality = getArchetypeResult(main.id, top3[0].fit);

  return { personality, top3 };
}

export function topNeedLanguages(loveDna: LoveDna, n = 2): { key: string; label: string; value: number }[] {
  const labels: Record<string, string> = {
    words: '言语肯定',
    time: '高质量时刻',
    gifts: '用心礼物',
    acts: '实际行动',
    touch: '身体接触',
  };
  return Object.entries(loveDna.need)
    .map(([key, value]) => ({ key, label: labels[key], value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, n);
}

export function expressionLabel(loveDna: LoveDna): string {
  const entries = Object.entries(loveDna.expression).sort((a, b) => b[1] - a[1]);
  const [first] = entries;
  const labels: Record<string, string> = {
    words: '你习惯用语言、文字或赞美表达在乎',
    time: '你倾向于用陪伴和专注时光表达在乎',
    gifts: '你常通过精心准备的小礼物表达在乎',
    acts: '你更习惯用做事、照顾来表达在乎',
    touch: '你自然用肢体亲近表达在乎',
  };
  if (!first || first[1] < 35) return '你表达爱的方式比较含蓄或不太固定';
  return labels[first[0]];
}

export function topExpressionLanguages(loveDna: LoveDna, n = 2): { key: string; label: string; value: number }[] {
  const labels: Record<string, string> = {
    words: '言语肯定',
    time: '高质量时刻',
    gifts: '用心礼物',
    acts: '实际行动',
    touch: '身体接触',
  };
  return Object.entries(loveDna.expression)
    .map(([key, value]) => ({ key, label: labels[key], value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, n);
}

export function triadInterpretation(loveDna: LoveDna): { label: string; text: string } {
  const entries = Object.entries(loveDna.triad).sort((a, b) => b[1] - a[1]);
  const [first, second, third] = entries;
  const labels: Record<string, string> = {
    intimacy: '亲密型',
    passion: '激情型',
    commitment: '承诺型',
  };
  const texts: Record<string, string> = {
    intimacy: '你最看重情感连结、深度理解与彼此陪伴，爱情对你来说像是一个可以安心回去的避风港。',
    passion: '你容易被心动、新鲜感和强烈吸引点燃，爱情于你更像一场值得全情投入的冒险。',
    commitment: '你相信关系需要责任、规划与长期投入，爱情是你愿意认真经营的一份契约。',
  };
  const mainLabel = labels[first[0]];
  const mainText = texts[first[0]];
  const gap = first[1] - (third?.[1] ?? 0);
  if (gap < 15) {
    return {
      label: '均衡型',
      text: `你的三元结构比较均衡，亲密、激情、承诺没有明显短板。这种“全都要”的爱情观让你既能浪漫，也能踏实。`,
    };
  }
  return {
    label: mainLabel,
    text: `${mainText} 而 ${labels[second[0]]} 与 ${labels[third?.[0] ?? second[0]]} 相对靠后，注意别让你的强项变成对伴侣的隐形要求。`,
  };
}

export function attachmentLabel(loveDna: LoveDna): string {
  const { type, anxiety, avoidance } = loveDna.attachment;
  const labels: Record<AttachmentType, string> = {
    secure: `安全型：焦虑 ${anxiety} · 回避 ${avoidance}，能靠近也能保有自己`,
    anxious: `焦虑型：焦虑 ${anxiety} · 回避 ${avoidance}，渴望回应，容易担心被丢下`,
    avoidant: `回避型：焦虑 ${anxiety} · 回避 ${avoidance}，重视自主，靠近时容易想退后`,
    fearful: `恐惧型：焦虑 ${anxiety} · 回避 ${avoidance}，既渴望亲密又本能防御`,
  };
  return labels[type];
}

export function beliefLabel(loveDna: LoveDna): string {
  const { belief } = loveDna;
  if (belief >= 70) return '成长观：你相信关系是两个人一起打磨出来的';
  if (belief <= 30) return '宿命观：你更相信「对的人」出现时，相处本该顺畅';
  return '中间态：你既期待契合，也承认关系需要经营';
}

export function dominantLeeStyle(loveDna: LoveDna): LeeStyle | null {
  const entries = Object.entries(loveDna.lee).sort((a, b) => b[1] - a[1]);
  const [first] = entries;
  return first ? (first[0] as LeeStyle) : null;
}

export function secondLeeStyle(loveDna: LoveDna): LeeStyle | null {
  const entries = Object.entries(loveDna.lee).sort((a, b) => b[1] - a[1]);
  return entries[1] ? (entries[1][0] as LeeStyle) : null;
}

export function dominantStyleLabel(loveDna: LoveDna): string {
  const key = dominantLeeStyle(loveDna);
  const map: Record<string, string> = {
    eros: '激情心动型',
    ludus: '轻松游戏型',
    storge: '友谊慢热型',
    pragma: '务实经营型',
    mania: '强烈投入型',
    agape: '奉献付出型',
  };
  return key ? map[key] : '多元平衡型';
}

export function generateSummary(personality: LoveArchetypeResult, loveDna: LoveDna): string {
  const needs = topNeedLanguages(loveDna, 2);
  const needText = needs.map((n) => n.label).join('、');
  return `你是「${personality.name}」，${personality.slogan}。最让你感到被爱的方式是${needText}。`;
}

// 结果页专用：生成社交标签
export function socialTags(loveDna: LoveDna): string[] {
  const { type } = loveDna.attachment;
  const lee = dominantLeeStyle(loveDna);
  const need = topNeedLanguages(loveDna, 1)[0];
  const leeLabelMap: Record<string, string> = {
    eros: '激情系',
    ludus: '游戏系',
    storge: '陪伴系',
    pragma: '务实系',
    mania: '痴迷系',
    agape: '奉献系',
  };
  const attachmentLabelMap: Record<AttachmentType, string> = {
    secure: '安全型',
    anxious: '焦虑型',
    avoidant: '回避型',
    fearful: '恐惧型',
  };
  const needTagMap: Record<string, string> = {
    words: '渴望被夸奖',
    time: '需要高质量陪伴',
    gifts: '在意仪式感',
    acts: '看行动派',
    touch: '需要贴贴',
  };
  const tags = [`#${leeLabelMap[lee ?? 'eros']}${attachmentLabelMap[type]}`];
  if (type === 'anxious' || type === 'fearful') tags.push('#需要被秒回');
  if (lee === 'mania' || lee === 'eros') tags.push('#恋爱脑本脑');
  if (need && need.value >= 55) tags.push(needTagMap[need.key] ?? `#需要${need.label}`);
  return tags.slice(0, 3);
}

// 结果页专用：错位诊断
export function mismatchDiagnosis(loveDna: LoveDna): {
  label: string;
  text: string;
  gap: number;
  need: number;
  expression: number;
} {
  let maxGap = -1;
  let maxKey = '';
  for (const key of LOVE_KEYS) {
    const gap = Math.abs(loveDna.need[key] - loveDna.expression[key]);
    if (gap > maxGap) {
      maxGap = gap;
      maxKey = key;
    }
  }
  const labelMap: Record<string, string> = {
    words: '渴望赞赏',
    time: '陪伴饥饿',
    gifts: '礼物缺口',
    acts: '行动落差',
    touch: '肢体饥饿',
  };
  const need = loveDna.need[maxKey];
  const expression = loveDna.expression[maxKey];
  if (maxGap <= 20) {
    return {
      label: '难得的同频者',
      text: '你渴望被爱的方式，恰好就是你输出爱的方式。你的知行高度合一，和你谈恋爱非常省心。',
      gap: maxGap,
      need,
      expression,
    };
  }
  const texts: Record<string, string> = {
    words:
      '你极其需要听到具体的夸奖来确信被爱，但你自己却很少开口肯定对方，容易让关系变成互不低头的死局。',
    time:
      '你骨子里渴望专属的陪伴时光，但你在表达端却经常「人在心不在」，让对方觉得陪伴质量打了折。',
    gifts:
      '你对仪式感和小惊喜有真实的期待，但你自己却不擅长送礼物，容易让对方误以为你「什么都不在乎」。',
    acts:
      '你期待对方用行动证明爱，但你自己在付出端却偏被动，容易让关系陷入「谁该先动」的僵局。',
    touch:
      '你骨子里极度渴望伴侣的搂抱与牵手，但你自己的表达端得分很低，嘴硬不主动给，导致你在关系里经常处于「情感饥饿」状态。',
  };
  return {
    label: labelMap[maxKey],
    text: texts[maxKey],
    gap: maxGap,
    need,
    expression,
  };
}
