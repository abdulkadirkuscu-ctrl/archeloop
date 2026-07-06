export type IntegrationJourney = {
  slug: string;
  loop: string;
  element: "Fire" | "Air" | "Water" | "Earth";
  archetype: "Sovereign" | "Magician" | "Lover" | "Warrior";
  path: string;
  integratedState: string;
  overview: string;
  coreBelief: string;
  coreFear: string;
  hiddenLonging: string;
  bodyActivation: string;
  primaryState: string;
  suppression: string;
  compensation: string;
  collision: string;
  stages: {
    title: string;
    objective: string;
    realisation: string;
    practices: string[];
    prompts: string[];
    successMarker: string;
  }[];
  integratedIdentity: string[];
integratedSelf?: {
  thinks: string[];
  feels: string[];
  values: string[];
  fears: string[];
  actions: string[];
};
finalStatement: string;
};

export const integrationJourneys: IntegrationJourney[] = [
  {
    slug: "visibility-path",
    loop: "Dimmed Light",
    element: "Fire",
    archetype: "Sovereign",
    path: "Visibility Path",
    integratedState: "Healthy Visibility",
    overview:
      "Dimmed Light forms when the Sovereign archetype learns that visibility is unsafe. The individual wants to be seen, expressed, valued, and recognised, but simultaneously fears criticism, judgment, rejection, humiliation, or exposure.",
    coreBelief: "It is unsafe to be seen.",
    coreFear:
      "If people truly see me, they will judge me, criticise me, reject me, or discover I am not enough.",
    hiddenLonging:
      "I want to be seen. I want to matter. I want to express myself. I want to have impact.",
    bodyActivation:
      "Chest / Solar Plexus, with secondary activation in the throat.",
    primaryState: "Inadequate / Exposed",
    suppression:
      "The Invisible Sovereign stays quiet, avoids attention, hides opinions, avoids leadership, and self-censors.",
    compensation:
      "The Performing Sovereign seeks approval, overachieves, manages image, performs worth, and tries to become impressive enough to feel safe.",
    collision:
      "The Ambivalent Sovereign wants visibility but cannot tolerate being seen.",
    stages: [
      {
        title: "Understand",
        objective: "Recognise the loop.",
        realisation:
          "I am not avoiding visibility. I am protecting myself from visibility.",
        practices: [
          "Track activations using I Am Triggered.",
          "Notice when you hide.",
          "Notice when you self-censor.",
          "Notice when you shrink.",
          "Notice when you abandon your voice.",
        ],
        prompts: [
          "Where do I hide most often?",
          "What situations make me disappear?",
          "What am I protecting myself from?",
          "What would happen if people truly saw me?",
        ],
        successMarker:
          "I can recognise Dimmed Light while it is happening.",
      },
      {
        title: "Interrupt",
        objective: "Build tolerance for visibility.",
        realisation:
          "Visibility feels uncomfortable. Visibility is not dangerous.",
        practices: [
          "Ask a question.",
          "Share a preference.",
          "Leave a public comment.",
          "Share an idea.",
          "Express an opinion.",
        ],
        prompts: [
          "What visibility did I tolerate today?",
          "What did I expect would happen?",
          "What actually happened?",
        ],
        successMarker: "I can remain present while being seen.",
      },
      {
        title: "Integrate",
        objective: "Express yourself consistently.",
        realisation: "I do not need permission to exist visibly.",
        practices: [
          "Lead a conversation.",
          "Share a creative project.",
          "Speak first in a meeting.",
          "Share a personal truth.",
          "Create and publish content.",
          "Express a need directly.",
          "Initiate a difficult conversation.",
        ],
        prompts: [
          "What part of myself am I now allowing others to see?",
          "Where am I still shrinking?",
          "What would my Integrated Sovereign do here?",
        ],
        successMarker:
          "I can be visible without abandoning myself.",
      },
    ],
    integratedIdentity: [
      "Expresses ideas without apology.",
      "Shares opinions without collapse.",
      "Allows visibility without performance.",
      "Leads without domination.",
      "Receives criticism without shrinking.",
      "Takes up space naturally.",
      "Trusts their own voice.",
      "Allows themselves to be seen.",
    ],

    integratedSelf: {
  thinks: [
    "My voice matters.",
    "I do not need permission to be visible.",
    "Being seen does not mean I am unsafe.",
    "I can take up space without performing.",
  ],
  feels: [
    "Present while being seen.",
    "Grounded in their own worth.",
    "Open to visibility without needing approval.",
    "Steady enough to receive feedback.",
  ],
  values: [
    "Authentic expression.",
    "Self-respect.",
    "Visibility without performance.",
    "Honest presence.",
  ],
  fears: [
    "Living hidden.",
    "Abandoning their voice.",
    "Shrinking to stay safe.",
    "Letting fear decide how visible they are.",
  ],
  actions: [
    "Shares an honest opinion.",
    "Speaks before overthinking.",
    "Allows themselves to be seen.",
    "Asks directly for what they need.",
    "Stays present during discomfort.",
  ],
},
    finalStatement:
      "Being visible is not the danger. Abandoning myself is the danger. I can be seen without losing who I am.",
    },
  {
    slug: "authentic-sovereignty-path",
    loop: "Paper Crown",
    element: "Fire",
    archetype: "Sovereign",
    path: "Authentic Sovereignty Path",
    integratedState: "Authentic Leadership",
    overview:
      "Paper Crown forms when worth becomes dependent on achievement, status, appearance, performance, or external recognition. The person tries to prove their value instead of embodying it.",
    coreBelief: "I must achieve in order to be worthy.",
    coreFear:
      "Without success, recognition, status, or approval, I am not enough.",
    hiddenLonging:
      "I want to feel valuable. I want to feel respected. I want to feel enough without needing to perform.",
    bodyActivation: "Chest / Solar Plexus.",
    primaryState: "Inadequate / Exposed",
    suppression:
      "The Deflated Sovereign feels never good enough, avoids visibility, fears success, and collapses under comparison.",
    compensation:
      "The Performing Sovereign overworks, perfects, seeks status, chases recognition, and tries to earn worth through achievement.",
    collision:
      "The Divided Sovereign wants success but resents needing success to feel valuable.",
    stages: [
      {
        title: "Understand",
        objective: "Recognise the performance loop.",
        realisation:
          "I have confused achievement with worth.",
        practices: [
          "Notice when you seek validation.",
          "Notice comparison.",
          "Notice when rest feels unsafe.",
          "Track moments where worth feels dependent on performance.",
        ],
        prompts: [
          "Where do I try to prove myself?",
          "What achievement am I using to feel worthy?",
          "Who am I trying to impress?",
          "What happens if I stop performing?",
        ],
        successMarker:
          "I can recognise when I am performing for worth.",
      },
      {
        title: "Interrupt",
        objective: "Separate value from performance.",
        realisation:
          "My value exists before achievement.",
        practices: [
          "Rest without earning it.",
          "Celebrate effort rather than outcome.",
          "Do something imperfectly on purpose.",
          "Notice when you seek approval and pause before acting.",
        ],
        prompts: [
          "What did I do today without needing recognition?",
          "Where did I allow imperfection?",
          "What part of me believes worth must be earned?",
        ],
        successMarker:
          "I can experience worth without needing immediate proof.",
      },
      {
        title: "Integrate",
        objective: "Lead from authenticity instead of performance.",
        realisation:
          "I do not need to prove my right to exist.",
        practices: [
          "Create without checking for validation.",
          "Lead without performing.",
          "Make a decision based on values, not image.",
          "Allow yourself to be respected without needing to impress.",
        ],
        prompts: [
          "What would authentic leadership look like here?",
          "Where am I still performing?",
          "What would I choose if I already felt enough?",
        ],
        successMarker:
          "I can lead, create, and achieve without attaching my worth to the outcome.",
      },
    ],
    integratedIdentity: [
      "Achieves from purpose, not insecurity.",
      "Leads without performing.",
      "Allows imperfection.",
      "Feels valuable without external proof.",
      "Receives recognition without becoming dependent on it.",
      "Creates from authenticity.",
    ],
    integratedSelf: {
  thinks: [
    "My authority comes from within.",
    "I do not need approval to lead.",
    "I can be respected without performing.",
    "Recognition is welcome, but it is not my foundation.",
  ],
  feels: [
    "Secure in their own value.",
    "Calm without constant validation.",
    "Grounded in authentic authority.",
    "Able to lead without proving.",
  ],
  values: [
    "Inner authority.",
    "Integrity.",
    "Authentic leadership.",
    "Worth that is not outsourced.",
  ],
  fears: [
    "Living for approval.",
    "Performing instead of leading.",
    "Losing themselves to image.",
    "Mistaking recognition for worth.",
  ],
  actions: [
    "Leads from values.",
    "Acts without waiting for approval.",
    "Celebrates effort over validation.",
    "Makes decisions from inner authority.",
    "Allows recognition without depending on it.",
  ],
},
    finalStatement:
      "The crown becomes real when worth no longer depends on performance. I can achieve because I choose to, not because I need proof that I matter.",
  },
  {
    slug: "action-path",
    loop: "Stalled Flame",
    element: "Fire",
    archetype: "Sovereign",
    path: "Action Path",
    integratedState: "Purposeful Action",
    overview:
      "Stalled Flame forms when desire, ambition, vision, or creative fire is present, but fear interrupts movement. The person wants to act, but hesitation repeatedly stops the flame from becoming action.",
    coreBelief: "If I act, I might fail.",
    coreFear:
      "If I move forward, I may fail, be judged, waste effort, or discover I am not capable.",
    hiddenLonging:
      "I want movement. I want purpose. I want momentum. I want to bring my vision into reality.",
    bodyActivation: "Chest / Solar Plexus.",
    primaryState: "Inadequate / Exposed",
    suppression:
      "The Frozen Sovereign delays, waits, avoids action, postpones decisions, and stays stuck.",
    compensation:
      "The Planning Sovereign researches, prepares, learns, and plans endlessly instead of moving.",
    collision:
      "The Divided Flame wants movement but cannot tolerate the risk of action.",
    stages: [
      {
        title: "Understand",
        objective: "Recognise where fear interrupts movement.",
        realisation:
          "The problem is not lack of motivation. The problem is fear of action.",
        practices: [
          "Notice where you delay.",
          "Notice where you wait for certainty.",
          "Track moments where desire appears but movement stops.",
          "Name the action you are avoiding.",
        ],
        prompts: [
          "What action am I postponing?",
          "What am I afraid will happen if I begin?",
          "Where do I confuse preparation with movement?",
        ],
        successMarker:
          "I can recognise Stalled Flame while it is happening.",
      },
      {
        title: "Interrupt",
        objective: "Create small movement before certainty arrives.",
        realisation:
          "Action creates momentum.",
        practices: [
          "Take one five-minute action.",
          "Complete one imperfect step.",
          "Start before you feel ready.",
          "Choose movement over more planning.",
        ],
        prompts: [
          "What small action did I take today?",
          "What became clearer after moving?",
          "Where did I choose action over delay?",
        ],
        successMarker:
          "I can take small action without needing full confidence.",
      },
      {
        title: "Integrate",
        objective: "Become someone who moves with purpose.",
        realisation:
          "Movement matters more than certainty.",
        practices: [
          "Ship before ready.",
          "Take initiative.",
          "Make one visible move toward your vision.",
          "Act consistently instead of waiting for motivation.",
        ],
        prompts: [
          "What would purposeful action look like here?",
          "Where am I still waiting for permission?",
          "What does my Integrated Sovereign choose next?",
        ],
        successMarker:
          "I can move before certainty appears.",
      },
    ],
    integratedIdentity: [
      "Takes action before confidence is perfect.",
      "Builds momentum through movement.",
      "Acts from purpose.",
      "Allows imperfection.",
      "Turns vision into steps.",
      "Trusts movement more than hesitation.",
    ],
    integratedSelf: {
  thinks: [
    "Small action creates momentum.",
    "Purpose returns through movement.",
    "I do not need perfect motivation to begin.",
    "Progress matters more than intensity.",
  ],
  feels: [
    "Reconnected to direction.",
    "Willing to begin again.",
    "Steady rather than defeated.",
    "More alive through action.",
  ],
  values: [
    "Purpose.",
    "Momentum.",
    "Meaningful progress.",
    "Consistent action.",
  ],
  fears: [
    "Remaining stuck.",
    "Letting discouragement decide.",
    "Abandoning their own fire.",
    "Waiting forever to feel ready.",
  ],
  actions: [
    "Takes one meaningful step.",
    "Reconnects with personal goals.",
    "Chooses progress over perfection.",
    "Moves before motivation is complete.",
    "Returns to purpose after setbacks.",
  ],
},
    finalStatement:
      "The flame does not grow by waiting. It grows through movement. I do not need certainty before I act. I become clear by moving.",
    },
  {
    slug: "creative-expression-path",
    loop: "Blank Page",
    element: "Air",
    archetype: "Magician",
    path: "Creative Expression Path",
    integratedState: "Authentic Expression",
    overview:
      "Blank Page forms when expression becomes unsafe. The person may have ideas, feelings, creativity, and insight internally, but when expression is required, the mind goes blank and the voice disappears.",
    coreBelief: "Nothing meaningful will come through me.",
    coreFear:
      "If I express myself, it will be wrong, stupid, meaningless, or rejected.",
    hiddenLonging:
      "I want to express myself. I want to create. I want to contribute. I want to share what is inside me.",
    bodyActivation: "Head / Throat.",
    primaryState: "Confused / Overthinking",
    suppression:
      "The Silent Magician says nothing, avoids creating, avoids contributing, and waits for inspiration.",
    compensation:
      "The Perfectionist Creator edits endlessly, over-plans, researches forever, and waits until everything feels ready.",
    collision:
      "The Stuck Creator wants expression but cannot allow expression.",
    stages: [
      {
        title: "Understand",
        objective: "Recognise the freeze.",
        realisation:
          "I am not lacking creativity. I am protecting myself from expression.",
        practices: [
          "Notice where your mind goes blank.",
          "Notice where you self-censor.",
          "Notice where you wait for perfection.",
          "Track moments where expression freezes.",
        ],
        prompts: [
          "Where does my mind go blank?",
          "What am I afraid will happen if I express myself?",
          "What ideas do I consistently withhold?",
          "When did expression become unsafe?",
        ],
        successMarker:
          "I can recognise Blank Page while it is happening.",
      },
      {
        title: "Interrupt",
        objective: "Allow imperfect expression.",
        realisation:
          "Expression does not need perfection.",
        practices: [
          "Write for five minutes.",
          "Share one opinion.",
          "Create something unfinished.",
          "Speak before fully rehearsing.",
          "Publish imperfectly.",
        ],
        prompts: [
          "What did I express today?",
          "What happened after expression?",
          "Was perfection actually required?",
        ],
        successMarker:
          "I can express myself without needing certainty.",
      },
      {
        title: "Integrate",
        objective: "Trust creative flow.",
        realisation:
          "Expression creates clarity.",
        practices: [
          "Publish something.",
          "Share creative work.",
          "Start before feeling ready.",
          "Speak without scripting.",
          "Create consistently.",
        ],
        prompts: [
          "What wants to move through me?",
          "What am I now allowing myself to express?",
          "What would my Integrated Magician create?",
        ],
        successMarker:
          "I trust expression more than perfection.",
      },
    ],
    integratedIdentity: [
      "Expresses ideas freely.",
      "Creates without perfectionism.",
      "Trusts inspiration and action.",
      "Speaks without excessive self-editing.",
      "Allows creativity to move.",
      "Shares without needing certainty.",
      "Communicates authentically.",
    ],
    integratedSelf: {
  thinks: [
    "My voice matters.",
    "Expression creates clarity.",
    "I do not need perfection before I begin.",
    "I discover my ideas by expressing them.",
  ],
  feels: [
    "Open to creative movement.",
    "Comfortable being heard.",
    "Less frozen by uncertainty.",
    "Connected to their own voice.",
  ],
  values: [
    "Authentic expression.",
    "Creativity.",
    "Contribution.",
    "Imperfect action.",
  ],
  fears: [
    "Living silently.",
    "Withholding what wants to move through them.",
    "Waiting forever for perfect words.",
    "Abandoning creative truth.",
  ],
  actions: [
    "Shares ideas.",
    "Creates before feeling ready.",
    "Speaks without over-rehearsing.",
    "Writes the first draft.",
    "Allows expression to be imperfect.",
  ],
},
    finalStatement:
      "The problem was never a lack of ideas. The problem was fear of expression. I do not discover my voice before I speak. I discover my voice by speaking.",
  },
  {
    slug: "truth-path",
    loop: "Smoky Mirrors",
    element: "Air",
    archetype: "Magician",
    path: "Truth Path",
    integratedState: "Self-Honesty",
    overview:
      "Smoky Mirrors forms when truth becomes distorted through rationalisation, projection, denial, self-deception, image management, or narrative construction. The truth is often visible beneath the surface, but becomes obscured by explanations and stories.",
    coreBelief: "The truth is dangerous.",
    coreFear:
      "If I fully face reality, something will have to change.",
    hiddenLonging:
      "I want truth. I want freedom. I want authenticity. I want clarity.",
    bodyActivation: "Head / Throat.",
    primaryState: "Confused / Overthinking",
    suppression:
      "The Avoider ignores reality, minimises problems, avoids difficult conversations, and pretends things are fine.",
    compensation:
      "The Storyteller explains everything, justifies behaviour, creates narratives, and intellectualises emotions.",
    collision:
      "The Divided Magician knows the truth but cannot face the truth.",
    stages: [
      {
        title: "Understand",
        objective: "Recognise distortion.",
        realisation:
          "I know more than I admit.",
        practices: [
          "Notice excuses.",
          "Notice avoidance.",
          "Notice repeated stories.",
          "Notice where reality feels uncomfortable.",
        ],
        prompts: [
          "What truth keeps returning?",
          "What am I avoiding?",
          "What reality am I resisting?",
          "What story am I using to avoid change?",
        ],
        successMarker:
          "I can recognise distortion.",
      },
      {
        title: "Interrupt",
        objective: "Name reality directly.",
        realisation:
          "Truth hurts less than avoidance.",
        practices: [
          "Admit what is true.",
          "Name one reality without explaining it away.",
          "Speak a difficult truth respectfully.",
          "Pause when you begin over-explaining.",
        ],
        prompts: [
          "What am I pretending not to know?",
          "What changes if I tell the truth?",
          "What am I explaining instead of facing?",
        ],
        successMarker:
          "I can tolerate truth.",
      },
      {
        title: "Integrate",
        objective: "Live according to truth.",
        realisation:
          "Truth creates freedom.",
        practices: [
          "Make one reality-based decision.",
          "Stop negotiating with an obvious truth.",
          "Align one action with what you already know.",
          "Take responsibility without distortion.",
        ],
        prompts: [
          "What decision becomes clear when I stop distorting reality?",
          "Where does truth create freedom?",
          "What would my Integrated Magician name clearly?",
        ],
        
        successMarker:
          "I can live according to truth.",
      },
    ],
    integratedIdentity: [
      "Sees clearly.",
      "Names reality honestly.",
      "Does not distort perception to stay comfortable.",
      "Trusts truth.",
      "Acts from reality.",
      "Takes responsibility without self-deception.",
    ],
    integratedSelf: {
  thinks: [
    "Truth creates freedom.",
    "I can face reality without collapsing.",
    "I do not need to distort what I already know.",
    "Clarity begins when I stop explaining away the truth.",
  ],
  feels: [
    "Clearer when reality is named.",
    "Relieved by honesty.",
    "Braver around uncomfortable truths.",
    "Less attached to self-deception.",
  ],
  values: [
    "Truth.",
    "Integrity.",
    "Reality.",
    "Self-responsibility.",
  ],
  fears: [
    "Living inside a false story.",
    "Avoiding what they already know.",
    "Choosing comfort over truth.",
    "Losing freedom through distortion.",
  ],
  actions: [
    "Names what is true.",
    "Stops over-explaining.",
    "Makes reality-based decisions.",
    "Takes responsibility without distortion.",
    "Chooses honesty over image.",
  ],
},
    finalStatement:
      "The truth was never the threat. Avoiding the truth was the threat. Freedom begins where distortion ends.",
  },
  {
    slug: "clarity-path",
    loop: "Mind Maze",
    element: "Air",
    archetype: "Magician",
    path: "Clarity Path",
    integratedState: "Clear Thinking",
    overview:
      "Mind Maze forms when thinking becomes a substitute for certainty. The person becomes trapped in analysis, planning, prediction, and mental recursion. Instead of creating clarity, thinking creates more thinking.",
    coreBelief:
      "If I think enough, I will eventually feel safe.",
    coreFear:
      "If I make the wrong decision, everything will go wrong.",
    hiddenLonging:
      "I want clarity. I want certainty. I want understanding. I want peace.",
    bodyActivation: "Head / Throat.",
    primaryState: "Confused / Overthinking",
    suppression:
      "The Frozen Thinker avoids decisions, delays action, and waits for certainty.",
    compensation:
      "The Endless Analyst researches forever, consumes information, creates endless plans, and thinks instead of acting.",
    collision:
      "The Trapped Magician wants action but cannot stop thinking.",
    stages: [
      {
        title: "Understand",
        objective: "Recognise overthinking.",
        realisation:
          "Thinking is not the same as clarity.",
        practices: [
          "Observe repetitive thoughts.",
          "Notice analysis loops.",
          "Track indecision moments.",
          "Name the decision you are postponing.",
        ],
        prompts: [
          "What decision am I postponing?",
          "What certainty am I waiting for?",
          "What am I afraid will happen?",
          "What thought keeps repeating?",
        ],
        successMarker:
          "I can recognise overthinking while it is happening.",
      },
      {
        title: "Interrupt",
        objective: "Separate clarity from mental noise.",
        realisation:
          "Not every thought deserves attention.",
        practices: [
          "Separate facts from fears.",
          "Limit unnecessary research.",
          "Choose one next step.",
          "Reduce information consumption before deciding.",
        ],
        prompts: [
          "Which thoughts are useful?",
          "Which thoughts are repetitive?",
          "What facts do I actually have?",
          "What fear is pretending to be logic?",
        ],
        successMarker:
          "I can separate clarity from noise.",
      },
      {
        title: "Integrate",
        objective: "Act from clear enough understanding.",
        realisation:
          "Action creates clarity.",
        practices: [
          "Make a decision sooner.",
          "Act before certainty arrives.",
          "Trust direct experience.",
          "Learn by doing instead of only thinking.",
        ],
        prompts: [
          "What became clear through action?",
          "What did thinking fail to solve?",
          "What would my Integrated Magician choose now?",
        ],
        successMarker:
          "I trust movement more than mental certainty.",
      },
    ],
    integratedIdentity: [
      "Thinks clearly.",
      "Discerns effectively.",
      "Makes decisions.",
      "Acts without perfect certainty.",
      "Uses thought as a tool, not a prison.",
      "Trusts direct experience.",
    ],
    integratedSelf: {
  thinks: [
    "Clarity comes from choosing the next step.",
    "I do not need complete certainty to move.",
    "Thinking supports action; it does not replace it.",
    "A decision can be good enough.",
  ],
  feels: [
    "Mentally clearer.",
    "Less trapped in over-analysis.",
    "Steady enough to choose.",
    "Calmer with uncertainty.",
  ],
  values: [
    "Clarity.",
    "Discernment.",
    "Decisive movement.",
    "Mental spaciousness.",
  ],
  fears: [
    "Losing life to endless thinking.",
    "Mistaking rumination for wisdom.",
    "Remaining paralysed by options.",
    "Waiting for impossible certainty.",
  ],
  actions: [
    "Chooses one next step.",
    "Reduces information intake.",
    "Makes a decision with available information.",
    "Writes down what is known and unknown.",
    "Returns from thought into action.",
  ],
},
    finalStatement:
      "Clarity is not found at the end of endless thinking. Clarity emerges through engagement with reality. I do not think my way to certainty. I move my way to clarity.",
  },
  {
    slug: "vulnerability-path",
    loop: "Emotional Lockdown",
    element: "Water",
    archetype: "Lover",
    path: "Vulnerability Path",
    integratedState: "Emotional Openness",
    overview:
      "Emotional Lockdown forms when emotional expression becomes unsafe. The person learns to suppress, disconnect from, or numb emotional experience in order to maintain control, function, or avoid pain.",
    coreBelief: "Emotion is dangerous.",
    coreFear:
      "If I fully feel, I may be overwhelmed, rejected, hurt, or consumed.",
    hiddenLonging:
      "I want connection. I want intimacy. I want to feel. I want to be understood.",
    bodyActivation: "Gut / Lower Abdomen.",
    primaryState: "Hurt / Longing",
    suppression:
      "The Disconnected Lover numbs feelings, withdraws emotionally, avoids vulnerability, and struggles to identify emotions.",
    compensation:
      "The Functional Self stays busy, solves problems, focuses on tasks, and intellectualises emotion.",
    collision:
      "The Closed Heart wants intimacy but fears vulnerability.",
    stages: [
      {
        title: "Understand",
        objective: "Recognise emotional shutdown.",
        realisation:
          "Numbness is also a feeling.",
        practices: [
          "Notice when you disconnect.",
          "Notice when you say you are fine without checking.",
          "Track moments where emotion disappears.",
          "Name one feeling each day.",
        ],
        prompts: [
          "Where do I shut down emotionally?",
          "What emotion feels unsafe to feel?",
          "What do I do instead of feeling?",
          "When did vulnerability become dangerous?",
        ],
        successMarker:
          "I can recognise Emotional Lockdown while it is happening.",
      },
      {
        title: "Interrupt",
        objective: "Allow emotion safely.",
        realisation:
          "Feeling is not weakness.",
        practices: [
          "Name the emotion before explaining it.",
          "Share one feeling with a safe person.",
          "Pause before numbing or distracting.",
          "Let the body register emotion without rushing away.",
        ],
        prompts: [
          "What feeling did I allow today?",
          "What happened when I named it?",
          "Where did I choose openness instead of shutdown?",
        ],
        successMarker:
          "I can allow emotion without immediately closing down.",
      },
      {
        title: "Integrate",
        objective: "Practise emotional openness and connection.",
        realisation:
          "Connection requires vulnerability.",
        practices: [
          "Express a vulnerable truth.",
          "Receive support without deflecting.",
          "Let someone know how you actually feel.",
          "Stay present during emotional intimacy.",
        ],
        prompts: [
          "Where am I now allowing myself to be emotionally known?",
          "What would my Integrated Lover express here?",
          "What connection becomes possible when I stay open?",
        ],
        successMarker:
          "I can remain open without losing myself.",
      },
    ],
    integratedIdentity: [
      "Feels emotions without shame.",
      "Expresses vulnerability safely.",
      "Connects authentically.",
      "Receives care.",
      "Allows emotional intimacy.",
      "Remains open-hearted without becoming overwhelmed.",
    ],
    integratedSelf: {
  thinks: [
    "My feelings are allowed to exist.",
    "Vulnerability can be safe with the right people.",
    "I do not have to disconnect to protect myself.",
    "Emotional openness is strength, not weakness.",
  ],
  feels: [
    "Softer without losing boundaries.",
    "More emotionally available.",
    "Able to feel without shutting down.",
    "Connected to their own heart.",
  ],
  values: [
    "Vulnerability.",
    "Emotional honesty.",
    "Softness with safety.",
    "Open-hearted connection.",
  ],
  fears: [
    "Living emotionally closed.",
    "Never letting themselves be known.",
    "Confusing numbness with safety.",
    "Losing connection through self-protection.",
  ],
  actions: [
    "Names one real feeling.",
    "Allows safe vulnerability.",
    "Stays emotionally present.",
    "Lets someone know what matters.",
    "Softens without abandoning boundaries.",
  ],
},
    finalStatement:
      "The goal is not to feel less. The goal is to feel safely. I can remain open without losing myself.",
  },
  {
    slug: "connection-path",
    loop: "Fantasy Fog",
    element: "Water",
    archetype: "Lover",
    path: "Connection Path",
    integratedState: "Genuine Connection",
    overview:
      "Fantasy Fog forms when longing replaces connection. Instead of engaging with reality, the person retreats into imagined futures, idealised relationships, emotional fantasy, or unattainable possibilities.",
    coreBelief: "Fantasy is safer than reality.",
    coreFear:
      "Real connection will disappoint me.",
    hiddenLonging:
      "I want love. I want connection. I want closeness. I want belonging.",
    bodyActivation: "Gut / Lower Abdomen.",
    primaryState: "Hurt / Longing",
    suppression:
      "The Dreamer escapes reality, lives in imagined futures, and avoids present connection.",
    compensation:
      "The Idealiser projects perfection, creates unrealistic expectations, chases unavailable people, and confuses longing with intimacy.",
    collision:
      "The Divided Lover wants real connection but keeps choosing fantasy.",
    stages: [
      {
        title: "Understand",
        objective: "Recognise where longing has replaced reality.",
        realisation:
          "Longing is not connection.",
        practices: [
          "Notice idealisation.",
          "Notice imagined conversations or futures.",
          "Track unavailable attachments.",
          "Name what is real versus imagined.",
        ],
        prompts: [
          "Where am I living in fantasy instead of reality?",
          "What am I longing for?",
          "Who or what am I idealising?",
          "What real connection am I avoiding?",
        ],
        successMarker:
          "I can recognise Fantasy Fog while it is happening.",
      },
      {
        title: "Interrupt",
        objective: "Return to grounded connection.",
        realisation:
          "Reality is where intimacy happens.",
        practices: [
          "Name the facts of the situation.",
          "Engage with someone available.",
          "Choose presence over fantasy.",
          "Ask directly instead of imagining.",
        ],
        prompts: [
          "What is actually happening?",
          "What am I imagining?",
          "Where can I choose real connection today?",
        ],
        successMarker:
  "I can separate fantasy from genuine connection.",
      },
      {
        title: "Integrate",
        objective: "Choose intimacy rooted in reality.",
        realisation:
          "Connection requires reality.",
        practices: [
          "Practise honest communication.",
          "Stay present with actual relationships.",
          "Let unavailable fantasies go.",
          "Build intimacy through real contact.",
        ],
        prompts: [
          "What kind of connection is available here?",
          "What does genuine connection require from me?",
          "What would my Integrated Lover choose?",
        ],
        successMarker:
          "I can choose real connection over emotional fantasy.",
      },
    ],
    integratedIdentity: [
      "Chooses real connection.",
      "Recognises idealisation.",
      "Stays emotionally present.",
      "Builds intimacy through reality.",
      "Allows relationships to be human, not perfect.",
      "Values presence over fantasy.",
    ],
    integratedSelf: {
  thinks: [
    "Real connection is built in reality.",
    "Fantasy is not the same as intimacy.",
    "I can desire connection without losing discernment.",
    "I deserve relationships that are present and mutual.",
  ],
  feels: [
    "Grounded in real connection.",
    "Less attached to imagined potential.",
    "More present with what is actually happening.",
    "Open without becoming lost.",
  ],
  values: [
    "Genuine connection.",
    "Mutuality.",
    "Presence.",
    "Emotional reality.",
  ],
  fears: [
    "Mistaking fantasy for love.",
    "Chasing unavailable connection.",
    "Abandoning reality for hope.",
    "Losing themselves in projection.",
  ],
  actions: [
    "Looks at what is actually present.",
    "Checks whether connection is mutual.",
    "Chooses reality over fantasy.",
    "Communicates directly.",
    "Builds connection through real interaction.",
  ],
},
    finalStatement:
      "Fantasy may feel safer, but intimacy only exists in reality. I choose connection that can actually meet me.",
  },
  {
    slug: "emotional-regulation-path",
    loop: "Flooded Waters",
    element: "Water",
    archetype: "Lover",
    path: "Emotional Regulation Path",
    integratedState: "Emotional Flow",
    overview:
      "Flooded Waters forms when emotion overwhelms containment. The person becomes consumed by feelings, reactions, attachments, or emotional intensity until emotion controls the system rather than moving through it.",
    coreBelief: "My emotions are stronger than me.",
    coreFear:
      "If I feel, I may drown.",
    hiddenLonging:
      "I want peace. I want stability. I want emotional safety. I want to feel without being consumed.",
    bodyActivation: "Gut / Lower Abdomen.",
    primaryState: "Hurt / Longing",
    suppression:
      "The Emotional Dam bottles feelings, avoids emotion, and attempts to hold everything back until the pressure builds.",
    compensation:
      "The Emotional Storm overreacts, seeks reassurance, becomes consumed by feelings, and struggles to return to centre.",
    collision:
      "The Flooded Lover wants emotional safety but cannot contain emotional intensity.",
    stages: [
      {
        title: "Understand",
        objective: "Recognise emotional flooding.",
        realisation:
          "I am overwhelmed, not broken.",
        practices: [
          "Name the emotion before reacting.",
          "Track emotional intensity.",
          "Notice when urgency takes over.",
          "Pause before seeking reassurance or escalating.",
        ],
        prompts: [
          "What emotion is flooding me?",
          "What story is intensifying the feeling?",
          "What does my body need right now?",
          "What happens just before I become overwhelmed?",
        ],
        successMarker:
          "I can recognise Flooded Waters while it is happening.",
      },
      {
        title: "Interrupt",
        objective: "Contain emotion without suppressing it.",
        realisation:
          "Emotions can be held without being suppressed.",
        practices: [
          "Ground through the body.",
          "Slow the breath.",
          "Delay reactive messages.",
          "Use emotional naming before action.",
          "Create space before responding.",
        ],
        prompts: [
          "What helped me return to centre?",
          "What did I need before reacting?",
          "How can I hold this emotion safely?",
        ],
        successMarker:
          "I can feel emotion without immediately being controlled by it.",
      },
      {
        title: "Integrate",
        objective: "Let emotion move through without drowning.",
        realisation:
          "Feelings are information, not commands.",
        practices: [
          "Express emotion clearly.",
          "Self-soothe before seeking reassurance.",
          "Choose response over reaction.",
          "Let emotion complete without making it identity.",
        ],
        prompts: [
          "What is this emotion trying to tell me?",
          "What response would honour the feeling without being ruled by it?",
          "What would my integrated Lover do here?",
        ],
        successMarker:
          "I can feel deeply and remain emotionally present.",
      },
    ],
    integratedIdentity: [
      "Feels deeply without drowning.",
      "Regulates emotional intensity.",
      "Responds rather than reacts.",
      "Uses emotion as information.",
      "Creates safety inside the body.",
      "Allows emotional flow without collapse.",
    ],
    
    integratedSelf: {
  thinks: [
    "Feelings move through me; they do not have to control me.",
    "I can feel deeply and remain present.",
    "Intensity is information, not instruction.",
    "Regulation helps emotion become wisdom.",
  ],
  feels: [
    "Emotionally alive but not overwhelmed.",
    "Able to stay with intensity.",
    "More regulated during emotional waves.",
    "Connected to feeling without drowning in it.",
  ],
  values: [
    "Emotional regulation.",
    "Emotional truth.",
    "Inner steadiness.",
    "Healthy expression.",
  ],
  fears: [
    "Being ruled by emotional intensity.",
    "Hurting themselves or others through reactivity.",
    "Losing clarity inside feeling.",
    "Drowning in what needs to move.",
  ],
  actions: [
    "Pauses before reacting.",
    "Names the feeling.",
    "Regulates the body first.",
    "Allows emotion to move safely.",
    "Responds after the wave softens.",
  ],
},
    finalStatement:
      "I do not need to suppress emotion. I do not need to drown in emotion. I can let emotion move through me.",
  },
  {
    slug: "boundaries-path",
    loop: "Compliance",
    element: "Earth",
    archetype: "Warrior",
    path: "Boundaries Path",
    integratedState: "Self-Respect",
    overview:
      "Compliance forms when safety becomes dependent upon approval. The person learns to suppress anger, preferences, needs, limits, and authenticity in order to remain accepted, liked, included, or safe.",
    coreBelief:
      "If I upset people, I will lose connection.",
    coreFear:
      "Rejection, disapproval, conflict, abandonment, or being seen as difficult.",
    hiddenLonging:
      "I want acceptance. I want belonging. I want connection. I want safety without abandoning myself.",
    bodyActivation: "Legs / Feet / Full Body.",
    primaryState: "Defensive / Tense",
    suppression:
      "The Pleaser says yes when they mean no, avoids conflict, prioritises others, and treats their own needs as less important.",
    compensation:
      "The Chameleon adapts to everyone, changes identity, seeks approval, and tries to become acceptable to stay safe.",
    collision:
      "The Divided Warrior wants boundaries but fears the consequences of having them.",
    stages: [
      {
        title: "Understand",
        objective: "Recognise self-abandonment.",
        realisation:
          "People pleasing is self-abandonment.",
        practices: [
          "Notice automatic yeses.",
          "Notice resentment.",
          "Track moments where you suppress your preference.",
          "Notice when you fear disappointing someone.",
        ],
        prompts: [
          "Where do I say yes when I mean no?",
          "What conflict am I avoiding?",
          "What part of myself gets sacrificed for acceptance?",
          "What am I afraid will happen if I am honest?",
        ],
        successMarker:
          "I can recognise Compliance while it is happening.",
      },
      {
        title: "Interrupt",
        objective: "Practise preference and limit-setting.",
        realisation:
          "My needs matter.",
        practices: [
          "Express one preference.",
          "Pause before agreeing.",
          "Say no to one small request.",
          "Name one need clearly.",
          "Let someone be mildly disappointed without fixing it.",
        ],
        prompts: [
          "What did I actually want?",
          "Where did I pause before agreeing?",
          "What happened when I expressed a preference?",
          "Was the discomfort temporary?",
        ],
        successMarker:
          "I can express a preference without immediately abandoning it.",
      },
      {
        title: "Integrate",
        objective: "Hold boundaries without losing self-respect.",
        realisation:
          "Boundaries protect connection.",
        practices: [
          "Communicate a clear boundary.",
          "Hold a limit without over-explaining.",
          "Tolerate someone else's disappointment.",
          "Choose self-respect over approval.",
        ],
        prompts: [
          "What boundary protects my integrity here?",
          "Where am I still trading self-respect for approval?",
          "What would my integrated Warrior protect?",
        ],
        successMarker:
          "I can disappoint others without abandoning myself.",
      },
    ],
    integratedIdentity: [
      "Respects their own needs.",
      "Expresses preferences clearly.",
      "Holds boundaries without excessive guilt.",
      "Tolerates conflict when necessary.",
      "Chooses integrity over approval.",
      "Protects connection without self-abandonment.",
    ],
    integratedSelf: {
  thinks: [
    "My needs matter.",
    "Saying no can protect connection.",
    "I do not have to abandon myself to be accepted.",
    "Peace without self-respect is not real peace.",
  ],
  feels: [
    "More grounded in boundaries.",
    "Less controlled by guilt.",
    "Worthy of space and choice.",
    "Able to disappoint others without collapsing.",
  ],
  values: [
    "Boundaries.",
    "Self-respect.",
    "Honest consent.",
    "Mutual relationship.",
  ],
  fears: [
    "Living in self-abandonment.",
    "Being loved only when compliant.",
    "Losing themselves to harmony.",
    "Saying yes while meaning no.",
  ],
  actions: [
    "Says no clearly.",
    "Names a boundary.",
    "Checks their own needs before agreeing.",
    "Allows discomfort without people-pleasing.",
    "Chooses self-respect over automatic compliance.",
  ],
},
    finalStatement:
      "I can disappoint others without abandoning myself. Boundaries do not destroy connection. They protect the self that enters connection.",
  },
  {
    slug: "trust-path",
    loop: "Fortress",
    element: "Earth",
    archetype: "Warrior",
    path: "Trust Path",
    integratedState: "Connected Strength",
    overview:
      "Fortress forms when protection becomes isolation. The person learns that vulnerability is dangerous and dependence is unsafe, so walls become safety and distance becomes protection.",
    coreBelief:
      "People cannot be trusted.",
    coreFear:
      "Dependence, betrayal, being hurt, being controlled, or needing someone who may not be safe.",
    hiddenLonging:
      "I want connection. I want support. I want trust. I want closeness without losing safety.",
    bodyActivation: "Legs / Feet / Full Body.",
    primaryState: "Defensive / Tense",
    suppression:
      "The Isolated Warrior withdraws, handles everything alone, avoids support, and distances from vulnerability.",
    compensation:
      "The Hyper-Independent Warrior refuses help, over-functions, controls everything, and depends on nobody to avoid being hurt.",
    collision:
      "The Divided Warrior wants closeness but trusts distance more than connection.",
    stages: [
      {
        title: "Understand",
        objective: "Recognise where protection has become isolation.",
        realisation:
          "Protection has become isolation.",
        practices: [
          "Notice when you withdraw.",
          "Notice when you refuse support.",
          "Track moments where closeness feels threatening.",
          "Notice when independence becomes armour.",
        ],
        prompts: [
          "Where do I protect myself by disappearing?",
          "What kind of support do I reject?",
          "Who feels unsafe to need?",
          "What did distance originally protect me from?",
        ],
        successMarker:
          "I can recognise Fortress while it is happening.",
      },
      {
        title: "Interrupt",
        objective: "Test safe connection gradually.",
        realisation:
          "Not everyone is dangerous.",
        practices: [
          "Accept small support.",
          "Ask for help in a low-risk situation.",
          "Share one honest feeling with a safe person.",
          "Notice who responds with care.",
        ],
        prompts: [
          "Who feels safe enough for small trust?",
          "What happened when I allowed support?",
          "Where did I remain protected without becoming isolated?",
        ],
        successMarker:
          "I can allow small support without losing strength.",
      },
      {
        title: "Integrate",
        objective: "Build connected strength.",
        realisation:
          "Trust is strength.",
        practices: [
          "Share responsibility.",
          "Practise healthy dependence.",
          "Stay present instead of withdrawing.",
          "Let someone support you without immediately repaying or controlling it.",
        ],
        prompts: [
          "What does connected strength look like here?",
          "Where am I still confusing walls with safety?",
          "What would my integrated Warrior allow?",
        ],
        successMarker:
          "I can remain strong while allowing connection.",
      },
    ],
    integratedIdentity: [
      "Stays strong without becoming isolated.",
      "Allows safe support.",
      "Discerns who is trustworthy.",
      "Shares vulnerability selectively.",
      "Protects boundaries without building walls around everything.",
      "Lets connection and strength coexist.",
    ],
    integratedSelf: {
  thinks: [
    "I can protect myself without isolating.",
    "Trust can be gradual and discerning.",
    "Strength includes allowing support.",
    "Connection does not have to mean losing control.",
  ],
  feels: [
    "Strong without being closed.",
    "Open with discernment.",
    "Less guarded when safety is present.",
    "Able to receive support.",
  ],
  values: [
    "Trust.",
    "Connected strength.",
    "Discernment.",
    "Protection without isolation.",
  ],
  fears: [
    "Living behind walls forever.",
    "Mistaking isolation for strength.",
    "Rejecting support that could help.",
    "Becoming unreachable.",
  ],
  actions: [
    "Asks for help.",
    "Shares one vulnerable truth.",
    "Allows safe support.",
    "Sets boundaries without shutting down.",
    "Stays connected while protecting themselves.",
  ],
},
    finalStatement:
      "I do not need walls to remain safe. I can protect myself and still allow connection. Strength does not require isolation.",
  },
  {
    slug: "vitality-path",
    loop: "Barren Ground",
    element: "Earth",
    archetype: "Warrior",
    path: "Vitality Path",
    integratedState: "Inner Vitality",
    overview:
      "Barren Ground forms when survival replaces vitality. Life becomes duty, endurance, and responsibility while softness, joy, desire, pleasure, and aliveness feel distant or unavailable.",
    coreBelief:
      "Life is something to survive.",
    coreFear:
      "Hope, disappointment, wanting more, or discovering that life may not give back what I need.",
    hiddenLonging:
      "I want meaning. I want vitality. I want joy. I want life to feel alive again.",
    bodyActivation: "Legs / Feet / Full Body.",
    primaryState: "Defensive / Tense",
    suppression:
      "The Survivor endures, settles, gives up on desires, disconnects from vitality, and treats wanting more as dangerous.",
    compensation:
      "The Workhorse becomes constantly productive, chooses duty over joy, and tries to earn worth through effort.",
    collision:
      "The Divided Warrior wants vitality but expects disappointment.",
    stages: [
      {
        title: "Understand",
        objective: "Recognise survival mode.",
        realisation:
          "I am surviving, not living.",
        practices: [
          "Notice where life feels like endurance.",
          "Notice where joy feels irresponsible.",
          "Track moments of numbness, duty, or resignation.",
          "Name one desire you have dismissed.",
        ],
        prompts: [
          "Where am I merely surviving?",
          "What desire have I buried?",
          "Where did I learn that joy is unsafe or impractical?",
          "What part of life feels barren?",
        ],
        successMarker:
          "I can recognise Barren Ground while it is happening.",
      },
      {
        title: "Interrupt",
        objective: "Reconnect with desire, nourishment, and life force.",
        realisation:
          "Joy is not irresponsible.",
        practices: [
          "Choose one nourishing action.",
          "Rest without earning it.",
          "Do one thing for pleasure, not productivity.",
          "Name one thing you want.",
          "Create space for softness.",
        ],
        prompts: [
          "What brought me even a small sense of aliveness?",
          "Where did I allow nourishment?",
          "What desire deserves attention?",
        ],
        successMarker:
          "I can choose nourishment without guilt.",
      },
      {
        title: "Integrate",
        objective:
  "Live from inner vitality rather than survival alone.",
        realisation:
  "Vitality is not a luxury. It is part of being alive.",
        practices: [
          "Build routines that include rest and vitality.",
          "Choose meaning, not only obligation.",
          "Practise receiving without immediately earning.",
          "Create space for play, pleasure, or creativity.",
        ],
        prompts: [
          "What makes life feel worth living?",
          "Where am I still treating myself like a machine?",
          "What would my integrated Warrior protect and nourish?",
        ],
        successMarker:
  "I can live from inner vitality rather than only endurance.",
      },
    ],
    integratedIdentity: [
      "Feels worthy beyond productivity.",
      "Creates space for vitality.",
      "Balances effort with nourishment.",
      "Allows joy without guilt.",
      "Reconnects with desire.",
      "Lives rather than only survives.",
    ],
    integratedSelf: {
  thinks: [
    "My energy matters.",
    "Rest is part of strength.",
    "I am allowed to feel alive, not just responsible.",
    "Vitality is not a luxury; it is part of being human.",
  ],
  feels: [
    "More nourished.",
    "Less depleted by constant responsibility.",
    "Connected to aliveness.",
    "Able to restore before pushing.",
  ],
  values: [
    "Vitality.",
    "Restoration.",
    "Aliveness.",
    "Sustainable strength.",
  ],
  fears: [
    "Existing only to endure.",
    "Becoming empty from over-responsibility.",
    "Losing joy and life force.",
    "Confusing exhaustion with strength.",
  ],
  actions: [
    "Restores energy before pushing.",
    "Identifies what is draining them.",
    "Chooses nourishment.",
    "Reconnects with joy.",
    "Takes responsibility without abandoning vitality.",
  ],
},
    finalStatement:
      "I am not here only to survive. I am here to live. My value exists before productivity, and my life is allowed to contain joy.",
  },
];