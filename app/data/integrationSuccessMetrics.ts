export type IntegrationSuccessMetric = {
  loop: string
  path: string
  integratedState: string
  integratedIdentity: {
    name: string
    description: string
  }
  statements: string[]
  practices: string[]
  successMarkers: string[]
}

export const integrationSuccessMetrics: IntegrationSuccessMetric[] = [
  {
    loop: "Dimmed Light",
    path: "Visibility Path™",
    integratedState: "Healthy Visibility",
    integratedIdentity: {
      name: "The Visible Sovereign™",
      description:
        "The Visible Sovereign no longer hides their voice, ideas, or presence. They allow themselves to be seen without needing to perform, impress, or seek permission. They express themselves honestly, contribute naturally, and trust their right to take up space.",
    },
    statements: [
      "I feel comfortable being seen.",
      "I trust my own voice.",
      "I can express my opinions.",
      "I allow myself to take up space.",
      "I do not need permission to be visible.",
      "I can receive attention without shrinking.",
      "I can tolerate criticism without collapsing.",
    ],
    practices: [
      "Share an opinion.",
      "Ask a question.",
      "Express a preference.",
      "Start a conversation.",
      "Share a creative idea.",
      "Create something visible.",
      "Lead part of a discussion.",
    ],
    successMarkers: [
      "I hide less.",
      "I speak more freely.",
      "I express myself more naturally.",
      "I recover faster from criticism.",
      "I allow myself to be seen without performing.",
    ],
  },
  {
    loop: "Paper Crown",
    path: "Authentic Sovereignty Path™",
    integratedState: "Authentic Leadership",
    integratedIdentity: {
      name: "The Authentic Sovereign™",
      description:
        "The Authentic Sovereign leads from inner worth rather than performance. They no longer need achievement, approval, or status to feel valuable. They create, lead, and succeed from purpose rather than insecurity.",
    },
    statements: [
      "My worth is not dependent on achievement.",
      "I can succeed without needing to prove myself.",
      "I can rest without feeling guilty.",
      "I can be respected without performing.",
      "I can lead without needing approval.",
      "I allow imperfection without losing my value.",
      "I choose purpose over image.",
    ],
    practices: [
      "Do something imperfectly.",
      "Rest without earning it.",
      "Make one decision without seeking validation.",
      "Celebrate effort instead of outcome.",
      "Create without checking for approval.",
      "Notice comparison and return to your own values.",
    ],
    successMarkers: [
      "I perform less for approval.",
      "I feel less controlled by comparison.",
      "I can rest without shame.",
      "I make decisions from values.",
      "I feel valuable without needing external proof.",
    ],
  },
  {
    loop: "Stalled Flame",
    path: "Action Path™",
    integratedState: "Purposeful Action",
    integratedIdentity: {
      name: "The Moving Sovereign™",
      description:
        "The Moving Sovereign turns vision into action. They no longer wait for perfect certainty before beginning. They trust movement, take imperfect steps, and allow momentum to build through action.",
    },
    statements: [
      "I can act before I feel fully ready.",
      "I trust movement more than hesitation.",
      "I can take imperfect action.",
      "I do not need certainty before beginning.",
      "I can turn vision into steps.",
      "I follow through on what matters.",
      "I allow momentum to build through movement.",
    ],
    practices: [
      "Take one five-minute action.",
      "Start before you feel ready.",
      "Complete one imperfect step.",
      "Choose movement over planning.",
      "Make one visible move toward your goal.",
      "Finish something small today.",
    ],
    successMarkers: [
      "I delay less.",
      "I start sooner.",
      "I take more consistent action.",
      "I recover faster from hesitation.",
      "I trust action to create clarity.",
    ],
  },
  {
    loop: "Blank Page",
    path: "Creative Expression Path™",
    integratedState: "Authentic Expression",
    integratedIdentity: {
      name: "The Expressive Magician™",
      description:
        "The Expressive Magician trusts that meaning emerges through expression. They no longer wait for perfect ideas before speaking, writing, creating, or contributing. Their voice becomes clearer through use.",
    },
    statements: [
      "I can express myself before everything feels perfect.",
      "I trust that expression creates clarity.",
      "I have something meaningful to say.",
      "I can create without over-editing.",
      "I allow ideas to move through me.",
      "I can share unfinished thoughts.",
      "My voice becomes clearer through expression.",
    ],
    practices: [
      "Write for five minutes.",
      "Share one imperfect thought.",
      "Create something unfinished.",
      "Speak before fully rehearsing.",
      "Publish or share something small.",
      "Say the simple version first.",
    ],
    successMarkers: [
      "I freeze less when expression is needed.",
      "I share ideas more easily.",
      "I create more consistently.",
      "I need less perfection before speaking.",
      "I trust my voice more.",
    ],
  },
  {
    loop: "Smoky Mirrors",
    path: "Truth Path™",
    integratedState: "Self-Honesty",
    integratedIdentity: {
      name: "The Clear Magician™",
      description:
        "The Clear Magician chooses truth over distortion. They are willing to see reality clearly, name what is uncomfortable, and make decisions from honesty rather than self-deception.",
    },
    statements: [
      "I can face uncomfortable truths.",
      "I can name reality without distorting it.",
      "I do not need to explain everything away.",
      "I can be honest with myself.",
      "Truth creates freedom for me.",
      "I can take responsibility without shame.",
      "I trust clarity more than avoidance.",
    ],
    practices: [
      "Name one truth directly.",
      "Notice when you are over-explaining.",
      "Write down the facts without interpretation.",
      "Admit what you already know.",
      "Make one reality-based decision.",
      "Pause before justifying yourself.",
    ],
    successMarkers: [
      "I rationalise less.",
      "I face reality sooner.",
      "I make clearer decisions.",
      "I avoid self-deception less often.",
      "I feel freer after telling the truth.",
    ],
  },
  {
    loop: "Mind Maze",
    path: "Clarity Path™",
    integratedState: "Clear Thinking",
    integratedIdentity: {
      name: "The Decisive Magician™",
      description:
        "The Decisive Magician uses thought as a tool rather than a prison. They can separate facts from fears, make decisions without perfect certainty, and let action create clarity.",
    },
    statements: [
      "I can separate facts from fears.",
      "I do not need perfect certainty to decide.",
      "I can stop thinking when thinking is no longer useful.",
      "I trust action to create clarity.",
      "I can make decisions without endless analysis.",
      "I use thought as a tool, not a prison.",
      "I can tolerate uncertainty.",
    ],
    practices: [
      "Choose one next step.",
      "Set a time limit for thinking.",
      "Separate facts from fears.",
      "Make a small decision quickly.",
      "Act before certainty arrives.",
      "Reduce unnecessary research.",
    ],
    successMarkers: [
      "I overthink less.",
      "I decide sooner.",
      "I feel less trapped in my mind.",
      "I act with enough clarity.",
      "I tolerate uncertainty more easily.",
    ],
  },
  {
    loop: "Emotional Lockdown",
    path: "Vulnerability Path™",
    integratedState: "Emotional Openness",
    integratedIdentity: {
      name: "The Open Lover™",
      description:
        "The Open Lover allows emotion to be felt and shared safely. They no longer need to shut down to survive closeness. They remain open-hearted while staying connected to themselves.",
    },
    statements: [
      "I can name what I feel.",
      "I can allow emotion without shutting down.",
      "I can share feelings with safe people.",
      "I can receive emotional support.",
      "I can stay present during vulnerability.",
      "Feeling does not make me weak.",
      "I can remain open without losing myself.",
    ],
    practices: [
      "Name one feeling.",
      "Share one honest emotion with a safe person.",
      "Pause before numbing or distracting.",
      "Let the body register emotion.",
      "Receive support without deflecting.",
      "Write down what you actually feel.",
    ],
    successMarkers: [
      "I shut down less often.",
      "I identify emotions more easily.",
      "I share feelings more safely.",
      "I receive care more openly.",
      "I remain present during emotional moments.",
    ],
  },
  {
    loop: "Fantasy Fog",
    path: "Connection Path™",
    integratedState: "Grounded Intimacy",
    integratedIdentity: {
      name: "The Grounded Lover™",
      description:
        "The Grounded Lover chooses real connection over fantasy, projection, or longing. They remain present with what is available, build intimacy through reality, and allow relationships to be human rather than perfect.",
    },
    statements: [
      "I can separate fantasy from reality.",
      "I choose real connection over longing.",
      "I can stay present with actual relationships.",
      "I do not need idealisation to feel hope.",
      "I can let unavailable fantasies go.",
      "I allow relationships to be human.",
      "I build intimacy through real contact.",
    ],
    practices: [
      "Name the facts of the situation.",
      "Notice idealisation.",
      "Reach toward available connection.",
      "Ask directly instead of imagining.",
      "Choose presence over fantasy.",
      "Let go of one unavailable fantasy.",
    ],
    successMarkers: [
      "I idealise less.",
      "I return to reality faster.",
      "I invest more in available connection.",
      "I confuse longing with intimacy less often.",
      "I choose presence over projection.",
    ],
  },
  {
    loop: "Flooded Waters",
    path: "Emotional Regulation Path™",
    integratedState: "Emotional Flow",
    integratedIdentity: {
      name: "The Regulated Lover™",
      description:
        "The Regulated Lover feels deeply without drowning. They understand emotion as information rather than command, and can stay connected to themselves while intense feelings move through.",
    },
    statements: [
      "I can feel deeply without drowning.",
      "I can pause before reacting.",
      "My feelings are information, not commands.",
      "I can return to emotional centre.",
      "I can express emotion clearly.",
      "I can self-soothe before escalating.",
      "I can let emotion move through me.",
    ],
    practices: [
      "Name the emotion before reacting.",
      "Pause before sending a message.",
      "Ground through the body.",
      "Slow the breath.",
      "Delay reassurance-seeking.",
      "Choose response over reaction.",
    ],
    successMarkers: [
      "I react less impulsively.",
      "I recover faster from overwhelm.",
      "I express emotion more clearly.",
      "I self-soothe more effectively.",
      "I feel deeply without losing myself.",
    ],
  },
  {
    loop: "Compliance",
    path: "Boundaries Path™",
    integratedState: "Self-Respect",
    integratedIdentity: {
      name: "The Grounded Warrior™",
      description:
        "The Grounded Warrior protects self-respect without becoming harsh or disconnected. They can express needs, hold limits, and remain connected without abandoning themselves for approval.",
    },
    statements: [
      "I can say no.",
      "I can express my needs.",
      "I can disappoint people without abandoning myself.",
      "My worth does not depend on pleasing others.",
      "I can hold boundaries without excessive guilt.",
      "I can choose self-respect over approval.",
      "My needs matter.",
    ],
    practices: [
      "Pause before saying yes.",
      "Express one preference.",
      "Say no to one small request.",
      "Name one need clearly.",
      "Hold a limit without over-explaining.",
      "Let someone be mildly disappointed.",
    ],
    successMarkers: [
      "I people-please less.",
      "I express preferences more clearly.",
      "I feel less resentment.",
      "I hold boundaries more often.",
      "I choose self-respect more consistently.",
    ],
  },
  {
    loop: "Fortress",
    path: "Trust Path™",
    integratedState: "Connected Strength",
    integratedIdentity: {
      name: "The Connected Warrior™",
      description:
        "The Connected Warrior no longer mistakes isolation for strength. They can protect themselves while allowing support, trust selectively, and remain open without abandoning discernment.",
    },
    statements: [
      "I can ask for help.",
      "I can receive support.",
      "I can trust selectively.",
      "I do not need walls to stay safe.",
      "Connection is not weakness.",
      "I can be strong and supported.",
      "I can stay open without losing myself.",
    ],
    practices: [
      "Ask for help in a small way.",
      "Accept support without deflecting.",
      "Share one honest feeling with a safe person.",
      "Notice who responds with care.",
      "Stay present instead of withdrawing.",
      "Let someone support you without immediately repaying it.",
    ],
    successMarkers: [
      "I isolate less.",
      "I ask for support more easily.",
      "I trust safe people more selectively.",
      "I remain connected while protected.",
      "I let connection and strength coexist.",
    ],
  },
  {
    loop: "Barren Ground",
    path: "Self-Worth Path™",
    integratedState: "Inner Value",
    integratedIdentity: {
      name: "The Living Warrior™",
      description:
        "The Living Warrior no longer lives only in survival, duty, or endurance. They protect vitality, allow nourishment, and recognise worth beyond productivity.",
    },
    statements: [
      "My worth exists beyond productivity.",
      "I am allowed to rest.",
      "I am allowed to enjoy life.",
      "Joy is not irresponsible.",
      "I can choose nourishment without guilt.",
      "I am here to live, not only survive.",
      "My life is allowed to contain softness and vitality.",
    ],
    practices: [
      "Choose one nourishing action.",
      "Rest without earning it.",
      "Do something for pleasure, not productivity.",
      "Name one desire.",
      "Create space for softness.",
      "Do one thing that brings aliveness.",
    ],
    successMarkers: [
      "I survive less and live more.",
      "I allow rest more easily.",
      "I reconnect with desire.",
      "I feel more vitality.",
      "I experience worth beyond productivity.",
    ],
  },
]