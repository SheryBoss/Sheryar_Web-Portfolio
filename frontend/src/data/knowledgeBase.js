/**
 * Sheryar Amir - Portfolio Knowledge Base & Flexible Grounded Intelligence Engine (Frontend Client Fallback)
 * Built strictly from the user's verified knowledge base and CV sources of truth.
 */

const STOP_WORDS = new Set([
  'what', 'which', 'who', 'how', 'when', 'where', 'why', 'is', 'are', 'was', 'were',
  'the', 'a', 'an', 'and', 'or', 'to', 'for', 'of', 'in', 'on', 'at', 'by', 'with',
  'about', 'can', 'you', 'tell', 'me', 'him', 'his', 'he', 'has', 'have', 'had',
  'does', 'did', 'do', 'any', 'some', 'from', 'this', 'that', 'these', 'those'
]);

export const KNOWLEDGE_FAQS = [
  // 0. ARIA Full Form & Identity
  {
    id: 0,
    topics: ['aria', 'full form', 'acronym', 'meaning', 'name', 'bot name', 'assistant'],
    triggers: [
      'aria', 'a.r.i.a.', 'aria full form', 'what is aria', 'who is aria',
      'what does aria stand for', 'aria meaning', 'full form of aria',
      'stand for', 'acronym', 'what is the full form of aria'
    ],
    answer: "A.R.I.A. stands for Autonomous Retrieval & Intelligence Assistant. It is Sheryar Amir's portfolio AI companion designed to provide grounded, factual answers strictly based on his verified CV, project documentation, and academic background."
  },

  // 1. Profile & Who is Sheryar
  {
    id: 1,
    topics: ['profile', 'who is', 'about sheryar', 'introduction', 'bio', 'background'],
    triggers: [
      'who is sheryar', 'who is sheryar amir', 'tell me about sheryar',
      'who are you', 'short introduction', 'professional bio', 'what makes him interested',
      'who is he', 'about him', 'profile', 'student profile', 'give me an intro',
      'introduce sheryar'
    ],
    answer: "Sheryar Amir is a BS Computer Science student specializing in Gaming & Animation at NED University of Engineering and Technology (NEDUET) in Karachi (current CGPA: 3.5). His primary areas of interest are game development, 3D modelling, and 3D environment design. He has worked on projects using Unreal Engine 5, Unity, and Blender, and has also explored web development, AI automation, and vibe coding."
  },

  // 2. Education & University (NEDUET)
  {
    id: 2,
    topics: ['education', 'university', 'neduet', 'degree', 'cgpa', 'gpa', 'batch', 'standing'],
    triggers: [
      'university', 'neduet', 'ned university', 'where does he study', 'which university',
      'degree', 'what is he studying', 'cgpa', 'gpa', 'current cgpa', 'academic focus',
      'gaming & animation', 'specialization', 'what semester', 'which batch'
    ],
    answer: "Sheryar attends NED University of Engineering and Technology (NEDUET) in Karachi, pursuing a Bachelor of Science in Computer Science (BSCS) with a formal specialization in Gaming & Animation (Batch 2023–2027, 4th Year). His current CGPA is 3.5 / 4.00."
  },

  // 3. College & FSc Percentage
  {
    id: 3,
    topics: ['college', 'fsc', 'intermediate', 'dj sindh', 'percentage', 'marks', 'grade'],
    triggers: [
      'college', 'dj sindh', 'dj sindh government science college', 'fsc', 'intermediate',
      'percentage', 'fsc percentage', 'intermediate percentage', 'marks', 'matric',
      'where did he do fsc', 'pre engineering', 'what did he score in college', '84%'
    ],
    answer: "Sheryar completed his Intermediate (FSc Pre-Engineering) from DJ Sindh Government Science College, Karachi, achieving an 84% grade (percentage: 84.0%)."
  },

  // 4. Why NED University & Game Dev Passion
  {
    id: 4,
    topics: ['why ned', 'passion', 'motivation', 'admission', 'why game dev', 'reasons'],
    triggers: [
      'why ned', 'why did he choose ned', 'why he got admit', 'why did he get admitted',
      'admission', 'thirst for knowledge', 'why game dev', 'why game development',
      'what makes him interested in game development', 'why did he join ned'
    ],
    answer: "Sheryar got admitted to NED University because of his deep thirst for knowledge about software development and creative designing, specifically in the field of gaming. He chose the specialized Gaming & Animation stream to combine computer science programming fundamentals with artistic, interactive 3D world creation."
  },

  // 5. Top Skills
  {
    id: 5,
    topics: ['skills', 'top skills', 'strongest skills', 'main skills', 'expertise'],
    triggers: [
      'top skills', 'what are his top skills', 'strongest skills', 'main skills',
      'key skills', 'core skills', 'what is he best at', 'what skills does he have',
      'skills overview', 'technical skills'
    ],
    answer: "Sheryar's top skills are:\n• Game Development: Creating 2D and 3D games in Unity and Unreal Engine 5, gameplay mechanics, enemy AI, stealth gameplay, and interactive VR experiences.\n• 3D Modelling: Sculpting character/creature models and hard-surface assets in Blender.\n• Environment Design: Staging, lighting, and arranging 3D game scenes."
  },

  // 6. Additional Skills & Vibe Coding
  {
    id: 6,
    topics: ['additional skills', 'vibe coding', 'ai automation', 'excel', 'web dev'],
    triggers: [
      'additional skills', 'vibe coding', 'ai automation', 'excel', 'microsoft excel',
      'what is vibe coding', 'ai assisted coding', 'ai tools', 'does he know web development',
      'other skills'
    ],
    answer: "Sheryar's additional skills include:\n• Web Development: Front-end and interactive web technologies (React, JavaScript, HTML/CSS, Node.js).\n• AI Automation: AI-assisted developer workflows and automation scripting.\n• Vibe Coding: Using modern AI tools to accelerate coding, rapid prototyping, and software experimentation.\n• Microsoft Excel: Data analysis, formulas, and reporting."
  },

  // 7. Game Projects Overview (Unreal Engine & Unity Games)
  {
    id: 7,
    topics: ['games', 'game projects', 'game dev', 'games made', 'gaming projects'],
    triggers: [
      'what games has he made', 'games made', 'which games', 'game projects', 'show me his games',
      'list of games', 'what games did he develop', 'games developed', 'video games', 'games he made'
    ],
    answer: "Sheryar has developed several notable game projects across Unreal Engine 5 and Unity:\n1. ShipBrawl (UE5): A 3D naval combat game with side cannons, real-time ocean water simulation, buoyancy physics, and enemy AI.\n2. Dungeon Escape (Unity): A 2D stealth escape game inspired by 'The Siege of the Sandfox' exploring stealth mechanics and Unity 2D foundations.\n3. Defenders (Unity): A 2D military base defense game created during a GameJam where the player defends against tanks and infantry.\n4. Harassing Master Shifu (Unity VR): An interactive room-scale VR experience featuring motion controller tracking and physics."
  },

  // 7b. All Projects Overview (Cross-Disciplinary)
  {
    id: 21,
    topics: ['all projects', 'portfolio projects', 'list of projects', 'what projects has he done'],
    triggers: [
      'all projects', 'list of projects', 'what projects has he done', 'what did he build',
      'what has he built', 'portfolio items', 'show me all projects', 'project list', 'all his projects'
    ],
    answer: "Sheryar's portfolio spans Game Development, 3D Modeling, AR/VR, and Web/AI projects:\n• Game Dev: ShipBrawl (UE5 naval combat), Dungeon Escape (Unity 2D stealth), Defenders (GameJam base defense).\n• 3D Modeling (Blender): Low-poly Monster street scene with volumetric lighting, Stylized Chick character, Donut, and Human character sculpts.\n• AR/VR: Harassing Master Shifu (Unity 6-DOF VR final project).\n• Web & AI: Developer's Universe (3D Three.js portfolio with Gemini RAG AI) and Inventory Management (Django full-stack)."
  },

  // 8. ShipBrawl (Unreal Engine 5)
  {
    id: 8,
    topics: ['shipbrawl', 'ocean', 'buoyancy', 'cannons', 'water simulation', 'ue5', 'unreal'],
    triggers: [
      'shipbrawl', 'ship brawl', 'boat', 'ocean simulation', 'water simulation',
      'buoyancy', 'side cannons', 'enemy ships', 'unreal project', 'ship combat',
      'tell me about shipbrawl', 'how does shipbrawl work'
    ],
    answer: "ShipBrawl is a 3D ship-combat game developed in Unreal Engine 5. The player controls a boat equipped with side cannons and battles enemy ships on dynamic open waters. The gameplay objective is to destroy enemy ships while preventing your boat from being sunk. Through this project, Sheryar explored real-time ocean water simulation, boat buoyancy physics, ship helm navigation, and enemy AI behavior."
  },

  // 9. Dungeon Escape (Unity 2D Stealth)
  {
    id: 9,
    topics: ['dungeon escape', 'stealth', 'siege of the sandfox', 'sandfox', 'unity 2d'],
    triggers: [
      'dungeon escape', 'dungeon', 'stealth game', 'sandfox', 'siege of the sandfox',
      '2d stealth', 'stealth mechanics', 'escape game', 'tell me about dungeon escape'
    ],
    answer: "Dungeon Escape is a 2D stealth-based escape game developed in Unity, inspired by 'The Siege of the Sandfox'. It helped Sheryar practice Unity 2D fundamentals and stealth gameplay, where the player sneaks through dark stone dungeon corridors, hides behind hay bales, and avoids enemy vision cones to escape."
  },

  // 10. Defenders (GameJam Project in Unity)
  {
    id: 10,
    topics: ['defenders', 'gamejam', 'military base', 'tanks', 'tower defense'],
    triggers: [
      'defenders', 'defender', 'gamejam', 'base defenders', 'military base',
      'tanks and infantry', 'game jam', 'defense game', 'tell me about defenders'
    ],
    answer: "Defenders is a 2D military base defense game created during a competitive GameJam. The player protects a tactical military base against escalating waves of incoming enemies, including armored tanks and infantry."
  },

  // 11. AR/VR Final Lab (Unity XR)
  {
    id: 11,
    topics: ['ar/vr', 'vr project', 'master shifu', 'virtual reality', 'vr lab'],
    triggers: [
      'ar/vr', 'vr', 'virtual reality', 'ar/vr final lab', 'vr lab', 'master shifu',
      'shifu', 'harassing master shifu', 'vr skills', 'unity vr', 'tell me about vr'
    ],
    answer: "Sheryar's AR/VR Final Lab is an academic virtual reality project created in Unity to showcase his VR skills, featuring interactive 6-DOF motion controller tracking and playful interaction in a 3D environment."
  },

  // 12. Blender 3D Art & Projects
  {
    id: 12,
    topics: ['blender', 'blender projects', '3d models', '3d art', '3d modeling', 'monster', 'chicken', 'donut', 'human character', 'sculpts'],
    triggers: [
      'blender', 'blender projects', 'blender project', 'projects in blender', 'what has he modelled in blender',
      'blender models', 'blender 3d', 'blender work', 'what are sheryars blender projects', 'monster', 'monster model',
      'donut', 'did he make a donut', 'chicken', 'low-poly chicken', 'human character',
      'man with an environment', '3d art', 'sculpt', 'what 3d models', 'models in blender', '3d modeling projects'
    ],
    answer: "Sheryar's Blender projects and 3D modeling work include:\n1. Stylized Monster Night Scene: Low-poly creature sculpt set in a nocturnal street environment with dramatic dual-lamppost volumetric lighting.\n2. Stylized Chick 3D Model: Clean subdivision quad topology, vibrant stylized materials, and mobile game-ready character design.\n3. Classic Blender Donut: Foundational 3D modeling, sculpting, and procedural texturing.\n4. Human Character in 3D Environment: Character modeling and environmental asset staging in Blender."
  },

  // 13. Hobbies, Sports & Free Time
  {
    id: 13,
    topics: ['hobbies', 'interests', 'sports', 'free time', 'swimming', 'table tennis', 'cricket', 'chess', 'reading'],
    triggers: [
      'hobby', 'hobbies', 'free time', 'what does he do in his free time', 'interests',
      'sports', 'table tennis', 'ping pong', 'cricket', 'chess', 'does he play chess',
      'swimming', 'does he go swimming', 'reading', 'what does he enjoy', 'play sports'
    ],
    answer: "In his free time, Sheryar's hobbies and personal interests include reading, learning Blender, swimming, playing table tennis, playing cricket, and playing chess."
  },

  // 14. Brain Tumor 3D Visualization (FYP Project Direction)
  {
    id: 14,
    topics: ['brain tumor', 'fyp', 'research', 'mri', 'segmentation', 'unreal visualization'],
    triggers: [
      'brain tumor', 'brain tumour', 'fyp', 'final year project', 'mri',
      'segmentation', 'prediction', 'medical', 'brain visualization', 'research project',
      'tell me about brain tumor'
    ],
    answer: "Sheryar has discussed an FYP/research project direction with the working title '3D Visualization of Brain Tumor and Its Segmentation + Prediction'. The proposed direction includes preprocessing brain MRI data, segmenting the tumor, generating a tumor mask, extracting volume growth across time, and creating an interactive 3D inspection interface in Unreal Engine. (Note: this is an active project direction under development)."
  },

  // 15. Future Startup Plans & Career Vision
  {
    id: 15,
    topics: ['future', 'startup', 'career vision', 'plans after graduation', 'ambition'],
    triggers: [
      'future', 'future plans', 'what are his plans for future', 'startup',
      'after graduation', 'after degree', 'career goal', 'vision', 'plans'
    ],
    answer: "Sheryar's future plan is to build his own startup in Game Development after completing his BSCS degree at NEDUET. He aims to establish an indie game studio crafting mechanically rich indie games, physics simulations, and innovative 3D titles."
  },

  // 16. Professional Studio Experience Question
  {
    id: 16,
    topics: ['studio experience', 'employment', 'formal job', 'commercial studio'],
    triggers: [
      'studio experience', 'does he have professional studio experience',
      'commercial studio', 'where did he work', 'formal employment', 'job experience'
    ],
    answer: "This portfolio knowledge base describes Sheryar's academic and personal projects. It does not currently confirm professional studio employment."
  },

  // 17. Contact & Collaboration
  {
    id: 17,
    topics: ['contact', 'email', 'whatsapp', 'phone', 'reach', 'message', 'hire'],
    triggers: [
      'contact', 'how to contact', 'email', 'what is his email', 'whatsapp',
      'phone number', 'whatsapp number', 'how can i message him', 'collaborate', 'hire',
      'get in touch', 'reach out', 'number', 'phone'
    ],
    answer: "You can contact Sheryar directly via:\n• WhatsApp: +923351810651\n• Email: sheryaramir576@gmail.com\n• Direct Contact Form on this portfolio website with real-time transcript dispatch."
  },

  // 18. Value Proposition / Strengths
  {
    id: 18,
    topics: ['strengths', 'value', 'hire', 'team', 'why hire'],
    triggers: [
      'what does he bring to a team', 'why hire', 'team player', 'strengths',
      'why should we hire him'
    ],
    answer: "Sheryar brings practical hands-on experience across Unity and Unreal Engine 5, 3D modelling and environment design in Blender, strong CS foundations (OOP, DSA, DBMS), experience with AI automation/vibe coding, and enthusiasm for building practical game projects."
  },

  // 19. Promotional Video Details
  {
    id: 19,
    topics: ['video', 'promotional video', 'trailer', 'after effects', 'reel', 'duration'],
    triggers: [
      'video', 'promotional video', 'trailer', 'after effects', 'reel', 'how long is the video',
      'video duration', '40 seconds', 'promo reel'
    ],
    answer: "Sheryar's portfolio embeds a 40-second promotional motion graphics trailer (promo-reel.mp4) created with an After Effects compositing workflow, showcasing the 3D graphics universe, project highlights, and portfolio architecture in an interactive HUD player."
  },

  // 20. 3D Avatar on Website
  {
    id: 20,
    topics: ['avatar', '3d model', 'wave', 'character on site', 'stage'],
    triggers: [
      'avatar', '3d avatar', 'model on the website', 'does he wave', 'click the avatar',
      'character model', 'avatar.glb'
    ],
    answer: "Sheryar's portfolio features a custom 3D avatar on the Hero stage. The avatar tracks your mouse cursor in real-time, breathes gently, and when clicked, waves hello, plays a cyber audio chime, and displays a friendly dialogue bubble."
  }
];

export function findBestKnowledgeAnswer(query) {
  if (!query || typeof query !== 'string') return null;

  const raw = query.toLowerCase().trim();
  const clean = raw.replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ');
  const tokens = clean.split(' ').filter((w) => w.length > 2 && !STOP_WORDS.has(w));

  let bestEntry = null;
  let highestScore = 0;

  for (const entry of KNOWLEDGE_FAQS) {
    let score = 0;

    // Direct multi-word phrase matching on triggers (highest priority: proportional to trigger length)
    for (const trigger of entry.triggers) {
      if (raw.includes(trigger) || clean.includes(trigger)) {
        const triggerWordCount = trigger.split(' ').length;
        score += 20 + triggerWordCount * 10;
      }
    }

    // Meaningful token matching on triggers and topics
    for (const token of tokens) {
      for (const trigger of entry.triggers) {
        if (trigger.split(' ').includes(token)) score += 4;
      }
      for (const topic of entry.topics) {
        if (topic.split(' ').includes(token)) score += 5;
      }
    }

    // Dedicated Domain Specificity Boosts:
    // 1. Blender queries -> strongly prioritize entry 12 (Blender 3D Art & Projects)
    if (tokens.includes('blender') && entry.id === 12) {
      score += 35;
    }
    // 2. VR / AR / Shifu queries -> strongly prioritize entry 11 (AR/VR Final Lab)
    if ((tokens.includes('vr') || tokens.includes('shifu') || raw.includes('ar/vr')) && entry.id === 11) {
      score += 35;
    }
    // 3. ShipBrawl / ocean / naval -> prioritize entry 8
    if ((tokens.includes('shipbrawl') || tokens.includes('ocean') || tokens.includes('cannons') || tokens.includes('buoyancy')) && entry.id === 8) {
      score += 35;
    }
    // 4. Dungeon Escape -> prioritize entry 9
    if ((tokens.includes('dungeon') || tokens.includes('sandfox')) && entry.id === 9) {
      score += 35;
    }
    // 5. Defenders / GameJam -> prioritize entry 10
    if ((tokens.includes('defenders') || tokens.includes('defender') || tokens.includes('gamejam')) && entry.id === 10) {
      score += 35;
    }
    // 6. Brain tumor / FYP -> prioritize entry 14
    if ((raw.includes('brain tumor') || tokens.includes('fyp') || tokens.includes('mri')) && entry.id === 14) {
      score += 35;
    }
    // 7. Hobbies / sports / chess / table tennis -> prioritize entry 13
    if ((tokens.includes('hobbies') || tokens.includes('hobby') || tokens.includes('sports') || tokens.includes('chess') || tokens.includes('swimming') || tokens.includes('tennis')) && entry.id === 13) {
      score += 35;
    }
    // 8. Contact / email / whatsapp -> prioritize entry 17
    if ((tokens.includes('email') || tokens.includes('whatsapp') || tokens.includes('contact') || tokens.includes('phone') || tokens.includes('message')) && entry.id === 17) {
      score += 35;
    }
    // 9. ARIA full form / meaning -> prioritize entry 0
    if ((tokens.includes('aria') || raw.includes('full form') || tokens.includes('acronym')) && entry.id === 0) {
      score += 35;
    }

    if (score > highestScore) {
      highestScore = score;
      bestEntry = entry;
    }
  }

  // Threshold: requires at least a strong phrase match (25+) or multiple meaningful token matches
  if (bestEntry && highestScore >= 7) {
    return bestEntry.answer;
  }

  return null;
}
