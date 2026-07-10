export type QuestionType = 'scenario';

export interface ScenarioOption {
  label: string;
  value: string;
  effects: Record<string, number>;
}

export interface Question {
  id: string;
  part: string;
  type: QuestionType;
  text: string;
  options: ScenarioOption[];
}

export const questions: Question[] = [
  // ===== Part A：依恋类型探测（6题）=====
  // A=低焦虑低回避  B=高焦虑低回避  C=低焦虑高回避  D=高焦虑高回避
  {
    id: 'a1',
    part: 'A',
    type: 'scenario',
    text: '恋爱中，对方突然因为加班连续 5 个小时没回你消息，此时你的大脑剧场是？',
    options: [
      { label: '估计忙晕了，正好我也刷刷剧、跟朋友打把游戏，等 ta 忙完。', value: 'a1a', effects: { 'attachment.anxiety': 20, 'attachment.avoidance': 20 } },
      { label: '是不是我说错什么话了？反复点开对话框，忍不住又发一条“你还在忙吗？”', value: 'a1b', effects: { 'attachment.anxiety': 85, 'attachment.avoidance': 20 } },
      { label: '无所谓，ta 不回我我也不回。刚好享受一下没人打扰的绝对自由。', value: 'a1c', effects: { 'attachment.anxiety': 20, 'attachment.avoidance': 85 } },
      { label: 'ta 是不是开始厌烦我、冷暴力我了？算了，反正迟早要分的，各走各的吧。', value: 'a1d', effects: { 'attachment.anxiety': 85, 'attachment.avoidance': 85 } },
    ],
  },
  {
    id: 'a2',
    part: 'A',
    type: 'scenario',
    text: '两个人闹了严重别扭，家里陷入可怕的死寂，你接下来的标准反应是？',
    options: [
      { label: '觉得一直僵着没意思，主动倒杯水递过去，找个台阶破冰。', value: 'a2a', effects: { 'attachment.anxiety': 20, 'attachment.avoidance': 20 } },
      { label: '坐在房间里抓心挠肝、泪流满面，疯狂看手机等 ta 过来哄我、抱我。', value: 'a2b', effects: { 'attachment.anxiety': 85, 'attachment.avoidance': 20 } },
      { label: '戴上耳机干自己的事，甚至觉得难得清静，完全不想理对方。', value: 'a2c', effects: { 'attachment.anxiety': 20, 'attachment.avoidance': 85 } },
      { label: '越等越崩溃，情绪大爆发，忍不住连发消息连环质问，接着又全部撤回。', value: 'a2d', effects: { 'attachment.anxiety': 85, 'attachment.avoidance': 85 } },
    ],
  },
  {
    id: 'a3',
    part: 'A',
    type: 'scenario',
    text: '刚交往不久，对方突然试探性地说“我觉得我们是不是进展太快了，需要一点空间”，你第一反应？',
    options: [
      { label: '“没问题呀，那这周末我们先各忙各的，保持你舒服的节奏。”', value: 'a3a', effects: { 'attachment.anxiety': 20, 'attachment.avoidance': 20 } },
      { label: '瞬间觉得天塌了，陷入巨大的恐慌：“ ta 是不是不爱我了？想分手了？”', value: 'a3b', effects: { 'attachment.anxiety': 85, 'attachment.avoidance': 20 } },
      { label: '心里暗暗松了口气，其实你心里也正嫌天天黏在一起有点烦。', value: 'a3c', effects: { 'attachment.anxiety': 20, 'attachment.avoidance': 85 } },
      { label: '既觉得受伤和愤怒，又本能地想直接退缩：“行，既然你退一步，那我退十步。”', value: 'a3d', effects: { 'attachment.anxiety': 85, 'attachment.avoidance': 85 } },
    ],
  },
  {
    id: 'a4',
    part: 'A',
    type: 'scenario',
    text: '当你惊觉自己已经“狠狠爱上”并极其依赖一个人时，你的相处状态是？',
    options: [
      { label: '越喜欢越有底气，能够极度放松、坦荡地在这个人面前展示自己的缺点。', value: 'a4a', effects: { 'attachment.anxiety': 20, 'attachment.avoidance': 20 } },
      { label: '越喜欢越自卑、越敏感，整天担心自己表现不够好，害怕有一天会被丢下。', value: 'a4b', effects: { 'attachment.anxiety': 85, 'attachment.avoidance': 20 } },
      { label: '越喜欢越本能地想要往后退，害怕被看穿软肋，甚至想故意找茬推开对方。', value: 'a4c', effects: { 'attachment.anxiety': 20, 'attachment.avoidance': 85 } },
      { label: '陷入疯狂的自我拉扯：一边极度渴望和 ta 融为一体，一边怀疑 ta 随时会背叛我。', value: 'a4d', effects: { 'attachment.anxiety': 85, 'attachment.avoidance': 85 } },
    ],
  },
  {
    id: 'a5',
    part: 'A',
    type: 'scenario',
    text: '关系进入稳定期，如果伴侣温和地提醒你最近“占有欲太强”或“太冷淡”，你内心深处怎么想？',
    options: [
      { label: '“明白了，可能最近节奏没对上，我们聊聊怎么调整最舒服。”', value: 'a5a', effects: { 'attachment.anxiety': 20, 'attachment.avoidance': 20 } },
      { label: '非常委屈和受伤：“我只是太爱你了，难道在乎你也有错吗？”', value: 'a5b', effects: { 'attachment.anxiety': 85, 'attachment.avoidance': 20 } },
      { label: '感到被挑剔和被束缚：“我本来就是这个性格，接受不了就别勉强。”', value: 'a5c', effects: { 'attachment.anxiety': 20, 'attachment.avoidance': 85 } },
      { label: '感到极大的防御和恐慌：“ ta 是不是在为抛弃我找借口？我是不是要被甩了？”', value: 'a5d', effects: { 'attachment.anxiety': 85, 'attachment.avoidance': 85 } },
    ],
  },
  {
    id: 'a6',
    part: 'A',
    type: 'scenario',
    text: '发现伴侣和一位新来的异性同事走得比较近（正常工作社交），你的潜意识举动是？',
    options: [
      { label: '相信 ta 的分寸，偶尔打趣一下，大方见个面认识一下也没问题。', value: 'a6a', effects: { 'attachment.anxiety': 20, 'attachment.avoidance': 20 } },
      { label: '嘴上不说但心里狂吃醋，翻遍 ta 所有社交网络，控制不住地想查 ta 手机。', value: 'a6b', effects: { 'attachment.anxiety': 85, 'attachment.avoidance': 20 } },
      { label: '表面毫无波动甚至装大度，但内心彻底关闭信任，开始给自己找退路。', value: 'a6c', effects: { 'attachment.anxiety': 20, 'attachment.avoidance': 85 } },
      { label: '故意在 ta 面前提起别的异性来气 ta，用互相伤害来测试 ta 到头来还在不在乎我。', value: 'a6d', effects: { 'attachment.anxiety': 85, 'attachment.avoidance': 85 } },
    ],
  },

  // ===== 模块一：爱语·需求端（3题）=====
  // A=言语 B=时刻 C=礼物 D=行动 E=接触
  {
    id: 'b1',
    part: 'B',
    type: 'scenario',
    text: '当你结束了极其疲惫、备受委屈的一天回到家，伴侣做出什么举动最能让你瞬间感到被治愈？',
    options: [
      { label: '认真地看着你，温柔地鼓励你：“你已经做得很好了，在我心里你是最棒的。”', value: 'b1a', effects: { 'need.words': 100 } },
      { label: '放下所有手头的事，倒一杯热茶坐在你身边，专心听你倾诉并安抚你。', value: 'b1b', effects: { 'need.time': 100 } },
      { label: '递给你一个专门为你买的解压小玩具，或者你念叨了很久的零食，给你一个惊喜。', value: 'b1c', effects: { 'need.gifts': 100 } },
      { label: '什么也没多问，默默去厨房为你煮了一碗热腾腾的面，并帮你把洗澡水放好。', value: 'b1d', effects: { 'need.acts': 100 } },
      { label: '走过来紧紧抱住你，摸摸你的头，让你在 Ta 的怀里靠一会儿。', value: 'b1e', effects: { 'need.touch': 100 } },
    ],
  },
  {
    id: 'b2',
    part: 'B',
    type: 'scenario',
    text: '在平淡的日常生活中，以下哪种场景会让你打心底觉得“选择这个人真选对了”？',
    options: [
      { label: '无论你换了新发型还是做了一道新菜，Ta 总能第一眼发现并真诚地赞美你。', value: 'b2a', effects: { 'need.words': 100 } },
      { label: '你们约好每周末空出半天，关掉手机，单纯地一起散步、聊天或看电影。', value: 'b2b', effects: { 'need.time': 100 } },
      { label: '对方出差或逛街时看到适合你的衣服、日常用品，总会顺手买回来送给你。', value: 'b2c', effects: { 'need.gifts': 100 } },
      { label: 'Ta 顺手帮你把车加满了油、主动包揽了难洗的油烟机，用行动为你分担。', value: 'b2d', effects: { 'need.acts': 100 } },
      { label: '在沙发上看电视时自然地把脚搭在 Ta 腿上，或者并肩走路时 Ta 会习惯性地牵起你的手。', value: 'b2e', effects: { 'need.touch': 100 } },
    ],
  },
  {
    id: 'b3',
    part: 'B',
    type: 'scenario',
    text: '在你的生日或重要的纪念日，你内心最期待对方以何种方式为你庆祝？',
    options: [
      { label: '写一封长长的手写信或发一段真挚的小作文，表达 Ta 对你的爱意与感谢。', value: 'b3a', effects: { 'need.words': 100 } },
      { label: '推掉所有的朋友聚会和加班，开启“二人世界”模式，整天只属于彼此。', value: 'b3b', effects: { 'need.time': 100 } },
      { label: '收到一份对方精心挑选、充满仪式感且包装精致的礼物。', value: 'b3c', effects: { 'need.gifts': 100 } },
      { label: '对方全权操办了所有的行程攻略、餐厅预订，带你享受无忧无虑的一天。', value: 'b3d', effects: { 'need.acts': 100 } },
      { label: '两人能有浪漫的肢体互动，亲吻、拥抱，并整夜依偎在一起入睡。', value: 'b3e', effects: { 'need.touch': 100 } },
    ],
  },

  // ===== 模块二：爱语·表达端（3题）=====
  // A=言语 B=时刻 C=礼物 D=行动 E=接触
  {
    id: 'c1',
    part: 'C',
    type: 'scenario',
    text: '当你的伴侣遭遇职场重挫、心情极度低落时，你最本能的情感输出方式是？',
    options: [
      { label: '开启“夸夸群”模式，不断肯定 Ta 的能力，告诉 Ta 在自己眼里 Ta 有多优秀、多重要。', value: 'c1a', effects: { 'expression.words': 100 } },
      { label: '马上推掉不必要的社交应酬，雷打不动地陪在 Ta 身边，给 Ta 百分之百的专注陪伴。', value: 'c1b', effects: { 'expression.time': 100 } },
      { label: '去买一件 Ta 一直舍不得买的礼物送给 Ta，试图用物质的惊喜来转移 Ta 的注意力、冲淡悲伤。', value: 'c1c', effects: { 'expression.gifts': 100 } },
      { label: '默默帮 Ta 承担生活琐事，或者动用自己的资源和人脉，帮 Ta 出谋划策、解决实际难题。', value: 'c1d', effects: { 'expression.acts': 100 } },
      { label: '不说什么安抚的话，只是心疼地把 Ta 抱在怀里，不断地抚摸 Ta 的后背或亲吻 Ta。', value: 'c1e', effects: { 'expression.touch': 100 } },
    ],
  },
  {
    id: 'c2',
    part: 'C',
    type: 'scenario',
    text: '在日常生活中，你最习惯、最频繁使用哪种方式向对方暗示“我很爱你”？',
    options: [
      { label: '频繁对 Ta 说“我想你”、“辛苦了”，在朋友圈或者朋友面前毫不吝啬地夸奖 Ta。', value: 'c2a', effects: { 'expression.words': 100 } },
      { label: '经常主动提议一起做点什么，比如“我们今晚去探店吧”或者“下个月一起去旅行吧”。', value: 'c2b', effects: { 'expression.time': 100 } },
      { label: '经常买一些小零食、鲜花或 Ta 喜欢的小盲盒带回家，当作无理由的小惊喜。', value: 'c2c', effects: { 'expression.gifts': 100 } },
      { label: '帮 Ta 洗衣服、做饭、顺路接送 Ta 上下班，用照顾 Ta 生活起居的实际行动来表达。', value: 'c2d', effects: { 'expression.acts': 100 } },
      { label: '习惯性地进行身体贴贴，路过 Ta 身边时摸摸头、捏捏脸，或者从背后抱住 Ta。', value: 'c2e', effects: { 'expression.touch': 100 } },
    ],
  },
  {
    id: 'c3',
    part: 'C',
    type: 'scenario',
    text: '当你们发生争吵、冷战后，你通常会如何主动跨出第一步去破冰？',
    options: [
      { label: '主动发微信和解，真诚地表达自己的歉意，并重新口头确认对 Ta 的爱。', value: 'c3a', effects: { 'expression.words': 100 } },
      { label: '约 Ta 出来单独吃个饭或喝杯咖啡，心平气和、不被打扰地把事情聊透。', value: 'c3b', effects: { 'expression.time': 100 } },
      { label: '买一个 Ta 喜欢的礼物或者一份精致的甜品送过去，借由物质载体传递求和信号。', value: 'c3c', effects: { 'expression.gifts': 100 } },
      { label: '默默把家务做了，或者做一桌 Ta 爱吃的饭菜，用实际的服侍行为暗示“翻篇”。', value: 'c3d', effects: { 'expression.acts': 100 } },
      { label: '走到 Ta 身边，扯扯衣角，主动拉 Ta 的手或者从背后抱住 Ta，用肢体温度融化冰冻。', value: 'c3e', effects: { 'expression.touch': 100 } },
    ],
  },

  // ===== Part D：恋爱风格 Lee 探测（6题）=====
  // 每题 4 选项分别映射到 6 风格中的 4 种；每风格出现 4 次
  {
    id: 'd1',
    part: 'D',
    type: 'scenario',
    text: '你直觉中，一段让人心跳加速的理想恋爱应该怎么拉开序幕？',
    options: [
      { label: '一眼对视，电光石火间产生极强烈的性吸引力与身心契合感。', value: 'd1eros', effects: { 'lee.eros': 1 } },
      { label: '频繁地打趣、互撩，享受推拉和暧昧阶段的博弈乐趣。', value: 'd1ludus', effects: { 'lee.ludus': 1 } },
      { label: '从身边的朋友、同学或同事自然过渡，知根知底最安心。', value: 'd1storge', effects: { 'lee.storge': 1 } },
      { label: '算清楚两个人的硬件条件、三观、未来规划是否匹配再开始。', value: 'd1pragma', effects: { 'lee.pragma': 1 } },
    ],
  },
  {
    id: 'd2',
    part: 'D',
    type: 'scenario',
    text: '两个人爆发激烈争吵之后，你内心最认可的完美和好方式是？',
    options: [
      { label: '不需要长篇大论，一个充满激情的深情热吻和拥抱就能化解一切。', value: 'd2eros', effects: { 'lee.eros': 1 } },
      { label: '彼此都有点幽默感，过两天当没发生过一样继续开玩笑、约吃饭。', value: 'd2ludus', effects: { 'lee.ludus': 1 } },
      { label: '像认识多年的老朋友一样坐下来，客观理性地把话说明白。', value: 'd2storge', effects: { 'lee.storge': 1 } },
      { label: '像做项目复盘一样列出根本问题，商量出下一次的防范措施。', value: 'd2pragma', effects: { 'lee.pragma': 1 } },
    ],
  },
  {
    id: 'd3',
    part: 'D',
    type: 'scenario',
    text: '恋爱中你最真实、最常展现出来的常态是以下哪一种？',
    options: [
      { label: '情绪高度跟着对方起落，爱得轰轰烈烈，经常有坐过山车的感觉。', value: 'd3mania', effects: { 'lee.mania': 1 } },
      { label: '天然地、习惯性地想去照顾 ta、迁就 ta，甚至愿意为 ta 妥协自己的利益。', value: 'd3agape', effects: { 'lee.agape': 1 } },
      { label: '疯狂热恋，渴望时刻和对方产生电波共振与浪漫火花。', value: 'd3eros', effects: { 'lee.eros': 1 } },
      { label: '保持相对独立，相处轻松就好，绝对不搞沉重的情感绑架。', value: 'd3ludus', effects: { 'lee.ludus': 1 } },
    ],
  },
  {
    id: 'd4',
    part: 'D',
    type: 'scenario',
    text: '你打心底里最无法忍受伴侣在关系中出现以下哪种行为？',
    options: [
      { label: '忽冷忽热，发消息不回，让我整个人陷入失控的疯狂试探中。', value: 'd4mania', effects: { 'lee.mania': 1 } },
      { label: '理所当然地享受我的好，自私自利，完全看不到我的退让与付出。', value: 'd4agape', effects: { 'lee.agape': 1 } },
      { label: '恋爱久了彻底变成毫无波澜的“室友”，没有任何浪漫与亲近感。', value: 'd4storge', effects: { 'lee.storge': 1 } },
      { label: '浑浑噩噩没有上进心，或者发现两人的未来生活目标完全不一致。', value: 'd4pragma', effects: { 'lee.pragma': 1 } },
    ],
  },
  {
    id: 'd5',
    part: 'D',
    type: 'scenario',
    text: '如果用一句话来概括你的“恋爱底层观”，它最接近？',
    options: [
      { label: '真正的爱就必须全力以赴、飞蛾扑火，哪怕痛彻心扉也轰轰烈烈。', value: 'd5mania', effects: { 'lee.mania': 1 } },
      { label: '爱是动词，只要 ta 能过得幸福快乐，我即便退回幕后付出也值得。', value: 'd5agape', effects: { 'lee.agape': 1 } },
      { label: '生命苦短，如果没有纯粹的心动和浪漫，恋爱将毫无意义。', value: 'd5eros', effects: { 'lee.eros': 1 } },
      { label: '陪伴是最长情的告白，最好的爱就是处成细水长流的习惯。', value: 'd5storge', effects: { 'lee.storge': 1 } },
    ],
  },
  {
    id: 'd6',
    part: 'D',
    type: 'scenario',
    text: '不幸面临分手时，你最典型、最可能出现的下意识反应是？',
    options: [
      { label: '产生巨大的戒断反应，很久都走不出来，反复回看过去的碎片。', value: 'd6mania', effects: { 'lee.mania': 1 } },
      { label: '哪怕被伤害了，分开时还会习惯性担心 ta 一个人能不能过好、有没有按时吃饭。', value: 'd6agape', effects: { 'lee.agape': 1 } },
      { label: '虽然会难过个几天，但直觉告诉你“旧的不去新的不来”，很快就能翻篇。', value: 'd6ludus', effects: { 'lee.ludus': 1 } },
      { label: '极其清醒地复盘这段感情失败的客观原因，争取在寻找下一个正缘时避坑。', value: 'd6pragma', effects: { 'lee.pragma': 1 } },
    ],
  },

  // ===== 模块三：理想爱结构（3题）=====
  // A=三元-激情  B=三元-亲密  C=三元-承诺  D=Lee-友谊  E=Lee-务实
  {
    id: 'e1',
    part: 'E',
    type: 'scenario',
    text: '当你闭上眼想象一段最完美的长期关系，你认为最不可或缺的“顶梁柱”是？',
    options: [
      { label: '强烈的性吸引力、浪漫的火花与心动感，没有热情的爱只是一潭死水。', value: 'e1passion', effects: { 'triad.passion': 1 } },
      { label: '毫无保留的坦诚、深度的懂与情感共鸣，彼此是世界上最了解对方的人。', value: 'e1intimacy', effects: { 'triad.intimacy': 1 } },
      { label: '无论贫穷富有、疾病健康都死守到底的契约精神，是责任和对家庭的坚守。', value: 'e1commitment', effects: { 'triad.commitment': 1 } },
      { label: '彼此支持、共同进步，像最好的战友一样在关系中不断成为更好的人。', value: 'e1storge', effects: { 'lee.storge': 1 } },
      { label: '三观一致、经济稳定，能安稳过好柴米油盐、抵御现实风险的生活共同体。', value: 'e1pragma', effects: { 'lee.pragma': 1 } },
    ],
  },
  {
    id: 'e2',
    part: 'E',
    type: 'scenario',
    text: '当关系进入不可避免的“七年之痒”与平淡倦怠期，你认为什么才是维系两人的纽带？',
    options: [
      { label: '重新制造心动，通过约会、旅行或亲密接触来重新点燃最初的浪漫与激情。', value: 'e2passion', effects: { 'triad.passion': 1 } },
      { label: '保持高频且高质量的深层沟通，确保两个人的内心世界依然紧密相连。', value: 'e2intimacy', effects: { 'triad.intimacy': 1 } },
      { label: '坚守当初结婚或在一起时的承诺，出于对家庭、孩子及社会关系的责任感。', value: 'e2commitment', effects: { 'triad.commitment': 1 } },
      { label: '重新调整双方的共同目标（如一起创业、置业），在追逐新目标中重新找到共鸣。', value: 'e2storge', effects: { 'lee.storge': 1 } },
      { label: '已经深度绑定的经济资产、稳定的家庭分工，以及高度习惯的现实生活节奏。', value: 'e2pragma', effects: { 'lee.pragma': 1 } },
    ],
  },
  {
    id: 'e3',
    part: 'E',
    type: 'scenario',
    text: '如果必须做一选一的极端取舍，你最希望你的“正缘”在灵魂深处扮演什么角色？',
    options: [
      { label: '浪漫的情人：总能带给你心跳加速的激情，生活永远充满了火花。', value: 'e3passion', effects: { 'triad.passion': 1 } },
      { label: '知心的密友：懂你所有的欲言又止，能接住你所有的脆弱与负面情绪。', value: 'e3intimacy', effects: { 'triad.intimacy': 1 } },
      { label: '忠诚的守护者：永远不会背叛，给你雷打不动的安全感与家庭归属感。', value: 'e3commitment', effects: { 'triad.commitment': 1 } },
      { label: '人生的导师/战友：能和你并肩作战，互相鞭策，带领彼此拓展人生的边界。', value: 'e3storge', effects: { 'lee.storge': 1 } },
      { label: '靠谱的合伙人：有极强的现实生存能力，能和你高效率地把日子过得稳扎稳打。', value: 'e3pragma', effects: { 'lee.pragma': 1 } },
    ],
  },

  // ===== 模块四：关系信念（3题）=====
  // A=宿命+痴迷0.5  B=成长-焦虑0.5-回避0.5  C=理性+游戏0.5  D=独立+回避1  E=共生+焦虑1+奉献0.5
  {
    id: 'f1',
    part: 'F',
    type: 'scenario',
    text: '面对感情中必然会出现的摩擦、分歧与生活习惯差异，你的底层逻辑更倾向于？',
    options: [
      { label: '“真正对的人是不用费力磨合的，频繁吵架只能说明我们不是彼此的‘正缘’。”', value: 'f1destiny', effects: { 'belief.destiny': 1, 'lee.mania': 0.5 } },
      { label: '“世上没有天生完美的组合，完美的感情都是靠后天不断沟通、妥协和经营出来的。”', value: 'f1growth', effects: { 'belief.growth': 1, 'attachment.anxiety': -0.5, 'attachment.avoidance': -0.5 } },
      { label: '“感情只是生活的一部分，只要两人的现实利益、大方向一致，小摩擦不需要过度放大。”', value: 'f1rational', effects: { 'belief.rational': 1, 'lee.ludus': 0.5 } },
      { label: '“伴侣也是独立的个体，亲密有间。各自管好自己的情绪和人生，就没那么多矛盾。”', value: 'f1independent', effects: { 'belief.independent': 1, 'attachment.avoidance': 1 } },
      { label: '“爱就要轰轰烈烈、完全托付。为了关系的长久，任何一方做出牺牲和改变都是值得的。”', value: 'f1symbiotic', effects: { 'belief.symbiotic': 1, 'attachment.anxiety': 1, 'lee.agape': 0.5 } },
    ],
  },
  {
    id: 'f2',
    part: 'F',
    type: 'scenario',
    text: '关于世界上是否存在“唯一契合的灵魂伴侣（Soulmate）”，你的真实看法是？',
    options: [
      { label: '绝对存在。命运一定安排了一个完美契合你的人，找到了就是一生，找不到就是将就。', value: 'f2destiny', effects: { 'belief.destiny': 1, 'lee.mania': 0.5 } },
      { label: '灵魂伴侣不是天生的，而是在漫长的岁月里，通过彼此包容、共同成长“打磨”出来的。', value: 'f2growth', effects: { 'belief.growth': 1, 'attachment.anxiety': -0.5, 'attachment.avoidance': -0.5 } },
      { label: '“灵魂伴侣”是虚无缥缈的幻想。婚姻本质是现实合同，搭伙过日子不需要那么多精神共鸣。', value: 'f2rational', effects: { 'belief.rational': 1, 'lee.ludus': 0.5 } },
      { label: '每个人自己就是完整的，不需要另一个人来填补。两个独立灵魂的相遇只是阶段性结伴同行。', value: 'f2independent', effects: { 'belief.independent': 1, 'attachment.avoidance': 1 } },
      { label: '真正的爱就是两个个体的完全融合。你的痛苦就是我的痛苦，我们要融合成一个生命体。', value: 'f2symbiotic', effects: { 'belief.symbiotic': 1, 'attachment.anxiety': 1, 'lee.agape': 0.5 } },
    ],
  },
  {
    id: 'f3',
    part: 'F',
    type: 'scenario',
    text: '在亲密关系中，当自己的核心生活习惯/性格与对方发生冲突时，你认为应该？',
    options: [
      { label: '顺其自然。如果爱我，Ta 就会接受我原本的样子；如果需要我大改，说明缘分不够。', value: 'f3destiny', effects: { 'belief.destiny': 1, 'lee.mania': 0.5 } },
      { label: '双方各退一步。为了关系的长久，主动、理性地调整自己的行为，共同进化。', value: 'f3growth', effects: { 'belief.growth': 1, 'attachment.anxiety': -0.5, 'attachment.avoidance': -0.5 } },
      { label: '算一笔现实账。如果改变的代价小于分手的代价，那就改，这是一种经营策略。', value: 'f3rational', effects: { 'belief.rational': 1, 'lee.ludus': 0.5 } },
      { label: '坚守边界。我可以妥协边缘小事，但我的核心个性和生活自由绝对不为任何人改变。', value: 'f3independent', effects: { 'belief.independent': 1, 'attachment.avoidance': 1 } },
      { label: '甘愿改变。为了让对方开心、让感情圆满，我愿意做出任何退让和重塑。', value: 'f3symbiotic', effects: { 'belief.symbiotic': 1, 'attachment.anxiety': 1, 'lee.agape': 0.5 } },
    ],
  },
];

export const TOTAL_QUESTIONS = questions.length;
