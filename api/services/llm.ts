import dotenv from 'dotenv';
dotenv.config();

import OpenAI from 'openai';
import type {
  Answers,
  DnaAnalyzeResponse,
  LoveDna,
  Soulmate,
  SoulmateMatch,
  StoryEvent,
  RelationshipState,
  Ending,
  Replay,
} from '../../src/types/index.js';

function formatLoveDna(loveDna: LoveDna): string {
  return JSON.stringify(
    {
      依恋类型: loveDna.attachment.type === 'secure' ? '安全型' : '不安全型',
      依恋焦虑: loveDna.attachment.anxiety,
      依恋回避: loveDna.attachment.avoidance,
      爱的语言需求: loveDna.need,
      爱的语言表达: loveDna.expression,
      恋爱风格: loveDna.lee,
      爱情三元: loveDna.triad,
      关系信念: loveDna.belief,
    },
    null,
    2
  );
}

const MODEL = process.env.MODEL_NAME || 'glm-4-air';
const USE_MOCK = process.env.USE_MOCK_LLM === 'true' || !process.env.OPENAI_API_KEY;

function getClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey && !USE_MOCK) {
    throw new Error('Missing OPENAI_API_KEY environment variable');
  }
  return new OpenAI({
    apiKey: apiKey || 'mock',
    baseURL: process.env.OPENAI_BASE_URL,
  });
}

const mockLoveDna: DnaAnalyzeResponse = {
  loveDna: {
    attachment: { anxiety: 42, avoidance: 35, type: 'secure' },
    need: { words: 65, time: 80, gifts: 50, acts: 70, touch: 60 },
    expression: { words: 55, time: 60, gifts: 40, acts: 85, touch: 50 },
    lee: { eros: 45, ludus: 30, storge: 85, pragma: 60, mania: 35, agape: 75 },
    triad: { intimacy: 85, passion: 45, commitment: 80 },
    belief: 72,
  },
  summary: '你更像一位慢慢把信任交给对方的陪伴者，重视安稳胜于心动。',
  personality: {
    id: 'handKnit',
    name: '手织毛衣',
    slogan: '越穿越暖，慢热长情',
    tagline: '比起一见钟情，更信「在一起舒服」。',
    lee: 'storge',
    attachment: 'secure',
    portrait:
      '你是日久生情的典范。比起一见钟情，更信「在一起舒服」。慢热，可一旦热起来，长情得惊人。',
    spark: '稳定、可靠、不折腾，是能一起过日子的那种人。安全型让你敢循序渐进地交付信任。',
    flip: '太慢热，可能错过窗口期；对方以为「没感觉」，其实你在升温。激情不足易让关系变「室友」。',
    advice: [
      '喜欢就说，别等对方先开口——你的慢可能被误读为冷淡。',
      '偶尔主动制造浪漫，给陪伴加点火花。',
      '正缘是并肩走了很久仍想走下去的那个人，值得你等。',
    ],
    fit: 78,
  },
  top3: [
    { id: 'handKnit', name: '手织毛衣', slogan: '越穿越暖，慢热长情', fit: 78 },
    { id: 'baymax', name: '暖心大白', slogan: '给得起的温柔，才有边界', fit: 65 },
    { id: 'thermos', name: '养生保温杯', slogan: '反浪漫，但靠谱到离谱', fit: 58 },
  ],
};

const mockSoulmate: Soulmate = {
  name: '林知远',
  age: 28,
  occupation: '独立书店主理人',
  city: '杭州',
  traits: ['温和', '慢热', '细腻', '有边界感'],
  loveView:
    '他认为爱情不是占有，而是两个人各自保有完整的自己，然后决定一起走向更远的地方。',
  expression:
    '他不擅长说甜言蜜语，但记得你随口提过想看的书，会在某个雨天把它递到你手里。',
  mbti: 'INFJ',
  attachment: '安全型',
  lifeGoal: '开一家能留住旧时光的书店，和喜欢的人慢慢变老。',
  hobbies: ['读书', '煮咖啡', '逛旧书店', '胶片摄影'],
  strengths: ['善于倾听', '情绪稳定', '有生活仪式感'],
  weaknesses: ['不擅拒绝', '偶尔逃避冲突', '过度理想化'],
  vulnerability: '害怕被真正看见后，仍然不被选择。',
  firstImpression:
    '第一次见你，他觉得你说话很轻，但眼神里有股不轻易示人的坚定。',
  conflictArea: '你在意及时的回应，而他习惯把情绪先放一放再想清楚。',
  avatarPrompt:
    'A gentle young man with soft eyes, pixel art portrait, warm lighting, 16-bit style, bookstore background',
};

const mockMatches: SoulmateMatch[] = [
  {
    type: 'best',
    typeLabel: '最佳适配型',
    matchScore: 94,
    reason: '你们在长期相处的节奏上最为契合，ta 能给你稳定感，你也能给 ta 空间。',
    pros: ['亲密需求互补', '冲突处理方式匹配', '未来方向一致'],
    cons: ['两个人都偏慢热，前期可能需要更多耐心'],
    soulmate: { ...mockSoulmate, name: '林知远' },
  },
  {
    type: 'soul',
    typeLabel: '灵魂共鸣型',
    matchScore: 91,
    reason: 'ta 最懂你没说出口的部分，你们在精神层面上很容易产生共鸣。',
    pros: ['价值观高度一致', '都重视深度交流', '能理解彼此的脆弱'],
    cons: ['两个人都容易想太多，偶尔需要有人先开口'],
    soulmate: { ...mockSoulmate, name: '沈念', occupation: '古籍修复师' },
  },
  {
    type: 'growth',
    typeLabel: '成长挑战型',
    matchScore: 86,
    reason: 'ta 会带你走出舒适区，让你学会更直接地表达爱和需求。',
    pros: ['激发你的表达欲', '带来新鲜体验', '帮助你建立安全感'],
    cons: ['节奏差异可能带来摩擦'],
    soulmate: { ...mockSoulmate, name: '陈屿', occupation: '独立音乐人' },
  },
];

const mockStoryEvent: StoryEvent = {
  stage: 'meet',
  scene: '雨夜的旧书店',
  story:
    '你推开书店的门，檐角的雨珠跟着你落了一地。他正站在梯子上整理高处的书，听见门铃声低头看了你一眼，说：「雨很大，先坐会儿吧。」',
  illustrationPrompt:
    'Pixel art of a cozy old bookstore on a rainy night, warm yellow light, 16-bit style',
  choices: [
    {
      text: '笑着点头，在窗边坐下，随手翻起一本旧诗集',
      effects: { intimacy: 5, trust: 3, communication: 2 },
    },
    {
      text: '道谢后站在门口，想等雨小一点就离开',
      effects: { trust: 2, intimacy: -2, love: 1 },
    },
    {
      text: '主动问他在找什么书，借机搭话',
      effects: { communication: 6, passion: 3, trust: -1 },
    },
  ],
};

const mockEnding: Ending = {
  title: '晚风替我吻你',
  rarity: 'epic',
  achievement: '温柔共生',
  number: 'No.083',
  prose:
    '你们没有成为童话里的结局，却成为了彼此生活里那个最踏实的存在。多年以后，你依然会想起那个雨夜，他递来一杯热茶，眼神像旧书页一样安静。你们学会了在各自的世界里发光，也学会了在对方需要的时候，刚好出现。',
  illustrationPrompt:
    'Pixel art couple silhouette under sunset, warm pastel colors, 16-bit style, cinematic',
};

const mockReplay: Replay = {
  firstCrush: '大概是在他低头为你推荐那本诗集的时候，声音轻得像怕惊动文字。',
  biggestTurningPoint:
    '那次吵架后，他没有立刻辩解，而是写了一封信，让你第一次觉得被认真对待。',
  happiestMoment: '某个周末的早晨，阳光很好，你们在书店里各自看书，没有说话却很安心。',
  biggestRegret: '有一次你太想确定关系，逼得他后退了几步，让彼此都多走了一些弯路。',
  mostInfluentialChoice:
    '你选择在他沉默的时候，没有追问，而是给了他空间，这让他后来更愿意主动靠近你。',
  ifRestart:
    '你可能会更早学会直接表达不安，而不是等他猜。',
  advice: [
    '你值得被选择，但不必通过不断确认来证明这一点。',
    '慢一点不是不爱，有时候是更慎重地在爱。',
    '真正让你安心的关系，不需要你时刻完美。',
  ],
};

async function chatJson<T>(system: string, user: string, temperature = 0.75): Promise<T> {
  const response = await getClient().chat.completions.create({
    model: MODEL,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
    temperature,
    response_format: { type: 'json_object' },
  });

  const content = response.choices[0]?.message?.content || '{}';
  try {
    return JSON.parse(content) as T;
  } catch {
    const cleaned = content.replace(/^```json\s*|\s*```$/g, '').trim();
    return JSON.parse(cleaned) as T;
  }
}

const basePersona = `你是一位温柔、克制、诗意的叙事者，正在创作一个沉浸式恋爱人生模拟体验。
你的语气像一位老朋友在讲述故事，不说教、不鸡汤、不做心理分析。
绝对不要出现百分比、匹配度、测试分数、星座、塔罗等测试感词汇。
所有内容都应该是中文，不要混用英文单词或英文缩写（MBTI 字段除外）。

去模板化铁律：
- 禁止使用这些陈词滥调："在A与B之间起舞/平衡/摇摆"、"你既渴望…又害怕…"、"像一封没有署名的信"、"像一杯温热的茶"、"像一扇半开的门"、"你像…"、"相互扶持"、"相互理解和支持"、"细水长流"、"岁月静好"、"小确幸"、"彼此成就"、"灵魂的契合"、"照亮"、"灯塔"、"旅程"、"温暖而真诚"。
- 不要给每个人都写"温柔""细腻""有边界感"，要从用户具体的选择里提炼出只属于ta的形状。
- 用具体画面和小动作代替抽象形容词。"会记得你随口提过的事"比"细心"更动人。
- 不要写通用感悟，要写只有这个人会做出的动作。`;

export async function analyzeLoveDna(answers: Answers): Promise<DnaAnalyzeResponse> {
  if (USE_MOCK) return mockLoveDna;

  const system = `${basePersona}
请根据用户的 Love DNA 问卷答案，推导出一份恋爱自我认知画像，并生成一句只专属于这位用户的判词。

测试维度说明：
- 依恋取向（焦虑/回避）：决定用户在关系里能否安心停留
- 爱的语言·需求端（言语/时刻/礼物/行动/接触）：用户最感到被爱的方式
- 爱的语言·表达端（同上）：用户习惯如何给出爱
- 恋爱风格（Lee 六色：eros/ludus/storge/pragma/mania/agape）
- 理想爱结构（Sternberg 三元：亲密/激情/承诺）
- 关系信念（0=纯宿命，100=纯成长）

分类规则：
先由离散网格确定 12 原型之一：主导 Lee 风格 × 依恋类型（安全/不安全）。
12 原型列表：心火长明者、热烈追光者、洒脱漫游者、游离风旅者、月光共鸣者、含苞迟放者、稳舵同舟者、静岸甄珠者、深焰锚心者、飞蛾扑焰者、暖心奉爱者、倾心付爱者。

要求：
1. 必须结合用户具体的选择内容，体现分数差异，不要全部在 55-65 之间。
2. summary 只能是 1 句 40-60 字的中文，描述用户在亲密关系里的典型姿态，避免比喻和抽象形容词堆砌。
3. personality 必须对应 12 原型之一，包含 id、name（五字原型名）、tagline（一句话标签）、lee、attachment、narrative（200-300 字）、advice（2-3 条）。
4. fit 为 0-100 的整数，表示用户 8 维向量（5 需求爱语 + 3 三元）与该原型向量的契合程度。

输出 JSON 格式：
{
  "loveDna": {
    "attachment": { "anxiety": 0-100, "avoidance": 0-100, "type": "secure|insecure" },
    "need": { "words": 0-100, "time": 0-100, "gifts": 0-100, "acts": 0-100, "touch": 0-100 },
    "expression": { "words": 0-100, "time": 0-100, "gifts": 0-100, "acts": 0-100, "touch": 0-100 },
    "lee": { "eros": 0-100, "ludus": 0-100, "storge": 0-100, "pragma": 0-100, "mania": 0-100, "agape": 0-100 },
    "triad": { "intimacy": 0-100, "passion": 0-100, "commitment": 0-100 },
    "belief": 0-100
  },
  "summary": "40-60 字判词",
  "personality": {
    "id": "原型 id",
    "name": "五字中文名",
    "tagline": "一句话标签",
    "lee": "eros|ludus|storge|pragma|mania|agape",
    "attachment": "secure|insecure",
    "narrative": "200-300 字核心叙事",
    "advice": ["2-3 条相处建议"],
    "fit": 0-100
  }
}`;

  return chatJson<DnaAnalyzeResponse>(system, JSON.stringify(answers, null, 2), 0.78);
}

export async function generateSoulmate(loveDna: LoveDna): Promise<{ matches: SoulmateMatch[] }> {
  if (USE_MOCK) return { matches: mockMatches };

  const system = `${basePersona}
请根据用户的 Love DNA，生成三位不同方向上的「正缘对象」。

用户 Love DNA：
${formatLoveDna(loveDna)}

三位方向定义：
1. best（最佳适配型）：长期幸福概率最高。考虑核心需求匹配、性格互补、择偶偏好匹配、人生方向匹配。
2. soul（灵魂共鸣型）：最懂用户的人。考虑相似人格、价值观一致、兴趣契合。
3. growth（成长挑战型）：让用户成为更好的自己。考虑互补程度、吸引力、稳定性。

去模板化要求：
1. 每位正缘姓名要像真实的人，不要过度文艺。年龄 25-35。职业要具体，带生活气息（如"社区图书馆管理员"、"老城区独立烘焙师"、"修旧家具的手艺人"），不要 generic "心理咨询师/程序员/设计师"。
2. traits 3-4 个，不要全是褒义，要有一个小缺点或怪癖。strengths/weaknesses 各 2-3 条，每条必须是一个具体行为/场景，而非形容词标签。
3. 三位正缘必须明显不同：best 更偏向稳定互补，soul 更偏向精神共鸣，growth 更偏向带来挑战和成长。
4. 职业、生活方式、爱好要呼应用户 preference 排序和六维数据。如果用户把"价值观"排第一，正缘就应该有明确的价值取向和生活态度。
5. 人称铁律：soulmate.loveView、expression、vulnerability、firstImpression、conflictArea 全部用第三人称写，主语必须是"他"或"她"。绝对禁止出现"我""我们""对我来说""我觉得""我害怕""他最大的软肋是害怕…"这类第一人称或心理独白式表达。
6. firstImpression 用第二人称"你"，写第一次见面时 ta 注意到的一个细节，而不是泛泛夸赞。
7. conflictArea 要基于两人真实差异，给出具体场景或触发点，不要写"沟通问题""生活节奏不同""处理紧急事务"这类空话。
8. reason、pros、cons 都要具体，不能泛泛而谈。pros/cons 各 2-3 条。
9. matchScore 为 80-98 之间的整数，必须体现三位的相对高低：best 通常最高，soul 和 growth 可略低但各有优势。
10. avatarPrompt 用英文描述外貌、穿着、气质和微小场景，像素风。

反例（不要）："爱情对我来说，是一种相互理解和支持的陪伴，就像两棵树在风中相依相偎。"
正例（参考）："他认为两个人最舒服的状态，是各自有一盏台灯，却坐在同一张桌子的两端。"

输出 JSON 格式：
{
  "matches": [
    {
      "type": "best|soul|growth",
      "typeLabel": "最佳适配型|灵魂共鸣型|成长挑战型",
      "matchScore": 80-98,
      "reason": "为什么是这个方向，1-2句具体说明",
      "pros": ["2-3条契合点"],
      "cons": ["2-3条注意点"],
      "soulmate": {
        "name": "中文姓名",
        "age": 25-35,
        "occupation": "具体生活感职业",
        "city": "城市",
        "traits": ["3-4 个真实标签，含一个小怪癖"],
        "loveView": "他/她对爱情的看法，1-2 句，第三人称，禁止'我'，禁止比喻",
        "expression": "他/她表达爱的具体方式，1-2 句，必须是一个具体动作或物品，第三人称",
        "mbti": "INFJ/ENFP 等",
        "attachment": "依恋类型",
        "lifeGoal": "具体的人生目标，1 句",
        "hobbies": ["3-4 个有画面感的爱好，带地点或频率"],
        "strengths": ["2-3 条具体行为"],
        "weaknesses": ["2-3 条具体行为，真实但不讨厌"],
        "vulnerability": "最大的软肋，1 句，第三人称，用动作写，禁止'我'和'害怕失去'",
        "firstImpression": "第一次见用户时的印象，1-2 句，用第二人称'你'",
        "conflictArea": "未来最容易产生摩擦的具体场景，1 句",
        "avatarPrompt": "英文 prompt，像素风头像"
      }
    }
  ]
}`;

  return chatJson<{ matches: SoulmateMatch[] }>(
    system,
    JSON.stringify({ loveDna: formatLoveDna(loveDna) }, null, 2),
    0.72
  );
}

function formatHistory(history: StoryEvent[]): string {
  if (history.length === 0) return '（无前序事件）';
  const recent = history.slice(-3);
  const earlierTitles = history.slice(0, -3).map((e, i) => `事件 ${i + 1} [${e.stage}] ${e.scene}`);
  const recentText = recent
    .map((event, offset) => {
      const index = history.length - recent.length + offset;
      const choiceIndex = event.chosenChoiceIndex ?? -1;
      const choiceText = choiceIndex >= 0 ? event.choices[choiceIndex]?.text : '未记录选择';
      return `事件 ${index + 1} [${event.stage}] ${event.scene}\n剧情摘要：${event.story.slice(0, 120)}…\n用户选择：${choiceText}`;
    })
    .join('\n\n');
  const parts: string[] = [];
  if (earlierTitles.length > 0) {
    parts.push(`更早的事件标题：\n${earlierTitles.join('\n')}`);
  }
  parts.push(recentText);
  return parts.join('\n\n');
}

export async function generateStoryEvent(payload: {
  eventIndex: number;
  totalEvents: number;
  loveDna: LoveDna;
  soulmate: Soulmate;
  relationshipState: RelationshipState;
  history: StoryEvent[];
}): Promise<{ event: StoryEvent }> {
  const stageOrder: StoryEvent['stage'][] = ['meet', 'crush', 'ambiguous', 'relationship', 'life'];
  if (USE_MOCK) return { event: { ...mockStoryEvent, stage: stageOrder[Math.min(payload.eventIndex, stageOrder.length - 1)] } };
  const { eventIndex, totalEvents, loveDna, soulmate, relationshipState, history } = payload;
  const stage = stageOrder[Math.min(eventIndex, stageOrder.length - 1)];

  const system = `${basePersona}
你正在写一个恋爱人生模拟器的故事事件。当前是第 ${eventIndex + 1} / ${totalEvents} 个事件，处于「${stage}」阶段。

核心要求：
1. 场景与剧情必须紧密结合用户的 Love DNA 和正缘对象的生活细节。如果用户边界高，就让 ta 在开场时犹豫、退后半步；如果正缘是图书馆管理员/烘焙师等，场景就发生在他/她工作的空间、相关市集或生活街区，不要每次都写"咖啡馆""雨夜街头"。
2. ${history.length === 0 ? '这是第一个事件，没有前史。但你要埋下一个能在后续事件回收的小伏笔：一句未说完的话、一个约定、一个小物件、一个他/她特有的习惯。' : '必须承接上一个事件的故事和用户选择。上一个事件的情节、未完成的约定、出现的小物件、正缘对象的习惯，要在本事件中以自然方式延续或呼应。不要突然换到毫不相关的场景。'}
3. 严禁重复：
   - 不要连续使用同样的环境描写和开场句式（例如"夜幕低垂，咖啡香混合着爵士乐"）。
   - 相邻两个事件必须发生在不同地点或不同时间。如果上一个事件发生在咖啡馆/书店/工作间，下一个事件请换到街道、公园、家里、厨房、市集、车站、天台、河边或正缘对象的另一个生活空间。
   - 同一个句子、同一句台词、同一个比喻在全部 8 个事件中只能出现一次。严禁把某句"人生感悟"当作正缘对象的口头禅反复写。
   - 严禁反复出现"古籍修复需要耐心""就像等待一本好书慢慢展开"这类说教式句子。
4. 当前关系状态会影响剧情：love/trust/intimacy 高时更亲密，conflict 高时更容易产生摩擦，commitment 高时更偏向未来。
5. 提供 3 个选择，每个选择都没有绝对好坏，只是人生方向不同。选择文案要具体、有动作感，不要抽象口号。
6. 每个选择附带对关系状态的数值影响（-10 到 +15 之间），只列出发生变化的状态键。请遵循映射逻辑：主动开口 → communication +；靠近/触碰 → intimacy +；尊重距离/给空间 → trust + 但 intimacy -；追问/逼问 → conflict +；沉默退缩 → communication -。
7. 剧情用第二人称「你」叙述，温柔克制，150-220 字，包含至少两处画面细节（光线、气味、动作、天气、声音等）。
8. scene 标题必须控制在 8-15 字，诗意且有画面感，不要与之前的事件标题重复。禁止把标题写成完整句子。
9. 每个事件的剧情和对话要独一无二：禁止复制之前事件中的任何原句或近似句式。

已发生的事件：
${formatHistory(history)}

输出 JSON 格式：
{
  "event": {
    "stage": "${stage}",
    "scene": "场景标题",
    "story": "剧情文本，150-220字，第二人称，带细节",
    "illustrationPrompt": "英文 prompt，像素风插画",
    "choices": [
      { "text": "选择文案", "effects": { "love": 0, "trust": 0, "communication": 0, "passion": 0, "responsibility": 0, "growth": 0, "intimacy": 0, "conflict": 0, "commitment": 0 } }
    ]
  }
}`;

  return chatJson<{ event: StoryEvent }>(
    system,
    JSON.stringify(
      { loveDna: formatLoveDna(loveDna), soulmate, relationshipState, history, stage },
      null,
      2
    ),
    0.72
  );
}

export async function generateEnding(payload: {
  loveDna: LoveDna;
  soulmate: Soulmate;
  history: StoryEvent[];
  finalState: RelationshipState;
}): Promise<{ ending: Ending }> {
  if (USE_MOCK) return { ending: mockEnding };
  const system = `${basePersona}
请根据用户的 Love DNA、正缘对象、完整恋爱历程和最终关系状态，生成一个唯一的「恋爱图鉴」结局。
结局不是 Good Ending / Bad Ending，而是这段关系自然走向的人生模样。

要求：
1. 标题像电影名或诗集名，必须独特，不要重复使用常见标题。
2. 稀有度根据 finalState 综合判定：legendary（love/trust/commitment/intimacy 都很高）、epic（深刻但有遗憾）、rare（温暖平淡）、common（未能走到一起或普通结局）。
3. 成就名称简短有力，要呼应这段关系的特质，不要 generic。
4. 结局编号随机生成，格式 No.XXX。
5. prose 要融入具体人物和故事细节（例如正缘对象的职业、爱好，或某个历史事件中的物件/地点），不要写成通用感悟。100-180 字，营造情绪与画面。
6. 结局气质要符合 finalState：高 passion 则炽热，高 trust 则安宁，高 conflict 则带有未解的张力。
7. 禁止使用"相互扶持""细水长流""岁月静好""小确幸""彼此成就""灵魂的契合"等模板词。

已发生的事件：
${formatHistory(payload.history)}

输出 JSON 格式：
{
  "ending": {
    "title": "电影名/诗集名",
    "rarity": "common|rare|epic|legendary",
    "achievement": "成就名称",
    "number": "No.047",
    "prose": "诗意小短文，融入故事细节",
    "illustrationPrompt": "英文 prompt，像素风结局插画，描述场景、光线、情绪"
  }
}`;

  return chatJson<{ ending: Ending }>(
    system,
    JSON.stringify({ ...payload, loveDna: formatLoveDna(payload.loveDna) }, null, 2),
    0.75
  );
}

export async function generateReplay(payload: {
  loveDna: LoveDna;
  soulmate: Soulmate;
  history: StoryEvent[];
  finalState: RelationshipState;
  ending: Ending;
}): Promise<{ replay: Replay }> {
  if (USE_MOCK) return { replay: mockReplay };
  const system = `${basePersona}
请根据完整恋爱历程、最终关系状态和结局，生成一段「人生回顾」。

用户 Love DNA：
${formatLoveDna(payload.loveDna)}

要求：
1. 不要像分析报告，要像一位老朋友在回忆这段故事。
2. 每个要点都要基于真实发生的事件（history 中的 scene 和 choices），引用具体场景或选择，不要编造。
3. firstCrush 要指出在哪一个历史事件中、什么细节让ta心动。
4. mostInfluentialChoice 要明确指出用户做出的哪个选择（第几个事件的哪个选项）最影响关系走向。
5. advice 三条，必须结合用户的 Love DNA 特点，强调「理解自己」，而不是「教用户如何恋爱」。
6. 语气温柔克制，像在说一个老朋友的故事。
7. 禁止使用"相互扶持""细水长流""岁月静好""小确幸"等模板词。

已发生的事件：
${formatHistory(payload.history)}

输出 JSON 格式：
{
  "replay": {
    "firstCrush": "第一次心动发生在哪里，1-2 句话，引用具体场景",
    "biggestTurningPoint": "最大的转折，1-2 句话",
    "happiestMoment": "最幸福的一刻，1-2 句话",
    "biggestRegret": "最大的遗憾，1-2 句话",
    "mostInfluentialChoice": "最影响关系的一次选择，1-2 句话，指出事件和选项",
    "ifRestart": "如果重新开始，哪些地方可能改变，1-2 句话",
    "advice": ["三条成长建议，每条 1-2 句话，结合 Love DNA"]
  }
}`;

  return chatJson<{ replay: Replay }>(
    system,
    JSON.stringify(
      {
        loveDna: formatLoveDna(payload.loveDna),
        soulmate: payload.soulmate,
        history: payload.history,
        finalState: payload.finalState,
        ending: payload.ending,
      },
      null,
      2
    ),
    0.72
  );
}
