/**
 * Sheryar Amir - Portfolio Knowledge Base & Flexible Grounded Intelligence Engine
 * Built strictly from the user's verified README.md source of truth.
 */

export const KNOWLEDGE_FAQS = [
  // 1. Profile & Who is Sheryar
  {
    id: 1,
    topics: ['profile', 'who is', 'about sheryar', 'introduction', 'bio'],
    triggers: [
      'who is sheryar', 'who is sheryar amir', 'tell me about sheryar',
      'who are you', 'short introduction', 'professional bio', 'what makes him interested',
      'who is he', 'about him', 'profile', 'student profile'
    ],
    answer: "Sheryar Amir is a BS Computer Science student specializing in Gaming & Animation at NED University of Engineering and Technology (NEDUET) in Karachi (current CGPA: 3.5). His primary areas of interest are game development, 3D modelling, and 3D environment design. He has worked on projects using Unreal Engine 5, Unity, and Blender, and has also explored web development, AI automation, and vibe coding."
  },

  // 2. Education & University
  {
    id: 2,
    topics: ['education', 'university', 'neduet', 'degree', 'cgpa', 'gpa', 'batch'],
    triggers: [
      'university', 'neduet', 'ned university', 'where does he study', 'which university',
      'degree', 'what is he studying', 'cgpa', 'gpa', 'current cgpa', 'academic focus',
      'gaming & animation', 'specialization'
    ],
    answer: "Sheryar attends NED University of Engineering and Technology (NEDUET) in Karachi, pursuing a Bachelor of Science in Computer Science (BSCS) with a formal specialization in Gaming & Animation. His current CGPA is 3.5 / 4.00."
  },

  // 3. College & FSc
  {
    id: 3,
    topics: ['college', 'fsc', 'intermediate', 'dj sindh', 'high school', 'percentage', 'marks'],
    triggers: [
      'college', 'dj sindh', 'dj sindh government science college', 'fsc', 'intermediate',
      'percentage', 'fsc percentage', 'marks', 'matric', 'where did he do fsc', 'pre engineering'
    ],
    answer: "Sheryar completed his Intermediate (FSc Pre-Engineering) from DJ Sindh Government Science College, Karachi, achieving an 84% grade."
  },

  // 4. Why NED University & Game Dev Passion
  {
    id: 4,
    topics: ['why ned', 'passion', 'motivation', 'admission', 'why game dev'],
    triggers: [
      'why ned', 'why did he choose ned', 'why he got admit', 'why did he get admitted',
      'admission', 'thirst for knowledge', 'why game dev', 'why game development',
      'what makes him interested in game development'
    ],
    answer: "Sheryar got admitted to NED University because of his deep thirst for knowledge about software development and creative designing, specifically in the field of gaming. He enjoys combining programming logic with visual, interactive 3D worlds."
  },

  // 5. Top Skills
  {
    id: 5,
    topics: ['skills', 'top skills', 'strongest skills', 'main skills'],
    triggers: [
      'top skills', 'what are his top skills', 'strongest skills', 'main skills',
      'key skills', 'core skills', 'what is he best at', 'what skills does he have'
    ],
    answer: "Sheryar's top skills are:\n• Game Development: Creating 2D and 3D games in Unity and Unreal Engine 5, gameplay mechanics, enemy AI, stealth systems, and interactive VR experiences.\n• 3D Modelling: Character sculpts, creature models, and assets in Blender.\n• Environment Design: Building, staging, and lighting 3D scenes."
  },

  // 6. Additional Skills & Vibe Coding
  {
    id: 6,
    topics: ['additional skills', 'vibe coding', 'ai automation', 'excel', 'web dev'],
    triggers: [
      'additional skills', 'vibe coding', 'ai automation', 'excel', 'microsoft excel',
      'what is vibe coding', 'ai assisted coding', 'ai tools', 'does he know web development'
    ],
    answer: "Sheryar's additional skills include:\n• Web Development (React, modern JavaScript, Node.js)\n• AI Automation (automation workflows and scripting)\n• Vibe Coding (using AI tools to assist with coding, prototyping, and rapid development)\n• Microsoft Excel (spreadsheet analysis and calculations)."
  },

  // 7. Game Development & Engines (Unity vs Unreal Engine)
  {
    id: 7,
    topics: ['game engines', 'game developer', 'engines', 'unreal', 'unity'],
    triggers: [
      'is he a game developer', 'game engines', 'which engines', 'does he work with unreal',
      'does he know unity', 'unreal engine 5', 'ue5', 'unity 3d', 'game dev'
    ],
    answer: "Yes, Sheryar has hands-on experience in both Unreal Engine 5 (UE5) and Unity:\n• In Unreal Engine 5: He built ShipBrawl, exploring ocean water simulation, boat buoyancy, and enemy AI.\n• In Unity: He built Dungeon Escape (2D stealth), Defenders (GameJam defense), and his AR/VR final lab project."
  },

  // 8. ShipBrawl Project (Unreal Engine 5)
  {
    id: 8,
    topics: ['shipbrawl', 'ocean', 'buoyancy', 'cannons', 'water simulation', 'ue5'],
    triggers: [
      'shipbrawl', 'ship brawl', 'boat', 'ocean simulation', 'water simulation',
      'buoyancy', 'side cannons', 'enemy ships', 'unreal project', 'ship combat'
    ],
    answer: "ShipBrawl is a 3D ship-combat game developed in Unreal Engine 5. The player controls a boat equipped with side cannons and battles enemy ships on dynamic seas. While building ShipBrawl, Sheryar explored ocean water simulation, boat buoyancy physics, ship helm controls, and enemy AI."
  },

  // 9. Dungeon Escape Project (Unity 2D Stealth)
  {
    id: 9,
    topics: ['dungeon escape', 'stealth', 'siege of the sandfox', 'sandfox', 'unity 2d'],
    triggers: [
      'dungeon escape', 'dungeon', 'stealth game', 'sandfox', 'siege of the sandfox',
      '2d stealth', 'stealth mechanics', 'escape game'
    ],
    answer: "Dungeon Escape is a 2D stealth-based escape game developed in Unity, inspired by 'The Siege of the Sandfox'. It helped Sheryar learn the fundamentals of Unity game development and stealth mechanics, where players sneak past guards and avoid vision cones to escape."
  },

  // 10. Defenders Project (GameJam)
  {
    id: 10,
    topics: ['defenders', 'gamejam', 'military base', 'tanks', 'tower defense'],
    triggers: [
      'defenders', 'defender', 'gamejam', 'base defenders', 'military base',
      'tanks and infantry', 'game jam', 'defense game'
    ],
    answer: "Defenders is a 2D military base defense game created during a competitive GameJam. The player protects a military base against incoming enemy waves including tanks and infantry."
  },

  // 11. AR/VR Final Lab Project
  {
    id: 11,
    topics: ['ar/vr', 'vr project', 'master shifu', 'virtual reality', 'vr lab'],
    triggers: [
      'ar/vr', 'vr', 'virtual reality', 'ar/vr final lab', 'vr lab', 'master shifu',
      'shifu', 'harassing master shifu', 'vr skills', 'unity vr'
    ],
    answer: "Sheryar's AR/VR Final Lab is an academic virtual reality project created in Unity to showcase his VR skills, featuring interactive 6-DOF controller tracking and playful interaction in a 3D environment."
  },

  // 12. Blender 3D Art & Models
  {
    id: 12,
    topics: ['blender', '3d models', 'monster', 'chicken', 'donut', 'human character'],
    triggers: [
      'blender', 'what has he modelled in blender', 'monster', 'monster model',
      'donut', 'did he make a donut', 'chicken', 'low-poly chicken', 'human character',
      'man with an environment', '3d art', 'sculpt'
    ],
    answer: "In Blender, Sheryar has created multiple models and assets including:\n• A monster creature model with dramatic lighting\n• A human character presented in a 3D environment\n• The classic 3D donut modeling exercise\n• A stylized low-poly chicken character."
  },

  // 13. Hobbies, Sports & Leisure
  {
    id: 13,
    topics: ['hobbies', 'interests', 'sports', 'free time', 'swimming', 'table tennis', 'cricket', 'chess', 'reading'],
    triggers: [
      'hobby', 'hobbies', 'free time', 'what does he do in his free time', 'interests',
      'sports', 'table tennis', 'ping pong', 'cricket', 'chess', 'does he play chess',
      'swimming', 'does he go swimming', 'reading', 'what does he enjoy'
    ],
    answer: "In his free time, Sheryar's hobbies and personal interests include reading, learning Blender, swimming, playing table tennis, playing cricket, and playing chess."
  },

  // 14. Brain Tumor 3D Visualization FYP (Research Project)
  {
    id: 14,
    topics: ['brain tumor', 'fyp', 'research', 'mri', 'segmentation', 'unreal visualization'],
    triggers: [
      'brain tumor', 'brain tumour', 'fyp', 'final year project', 'mri',
      'segmentation', 'prediction', 'medical', 'brain visualization', 'research project'
    ],
    answer: "Sheryar has discussed an FYP/research project direction with the working title '3D Visualization of Brain Tumor and Its Segmentation + Prediction'. The proposed direction includes preprocessing brain MRI data, segmenting the tumor, generating a mask, extracting volume growth across time, and creating an interactive 3D inspection interface in Unreal Engine. (Note: this is an active project direction under development)."
  },

  // 15. Future Startup Plans & Vision
  {
    id: 15,
    topics: ['future', 'startup', 'career vision', 'plans after graduation'],
    triggers: [
      'future', 'future plans', 'what are his plans for future', 'startup',
      'after graduation', 'after degree', 'career goal', 'vision'
    ],
    answer: "Sheryar's future plan is to build his own startup in Game Development after completing his BSCS degree at NEDUET. He aims to establish an indie game studio crafting mechanically rich indie games, physics simulations, and innovative 3D titles."
  },

  // 16. Professional Studio Experience Question
  {
    id: 16,
    topics: ['studio experience', 'employment', 'formal job', 'commercial studio'],
    triggers: [
      'studio experience', 'does he have professional studio experience',
      'commercial studio', 'where did he work', 'formal employment'
    ],
    answer: "This portfolio knowledge base describes Sheryar's academic and personal projects. It does not currently confirm professional studio employment."
  },

  // 17. Contact & Collaboration
  {
    id: 17,
    topics: ['contact', 'email', 'whatsapp', 'phone', 'reach', 'message'],
    triggers: [
      'contact', 'how to contact', 'email', 'what is his email', 'whatsapp',
      'phone number', 'whatsapp number', 'how can i message him', 'collaborate', 'hire'
    ],
    answer: "You can contact Sheryar directly via:\n• WhatsApp: +923351810651 (https://wa.me/923351810651)\n• Email: sheryaramir576@gmail.com\n• Or submit a message through the Contact form on this portfolio."
  },

  // 18. What does he bring to a team
  {
    id: 18,
    topics: ['team', 'hire', 'strengths', 'contributions'],
    triggers: [
      'what does he bring to a team', 'why hire', 'team player', 'strengths'
    ],
    answer: "Sheryar brings practical hands-on experience across Unity and Unreal Engine 5, 3D modelling and environment design in Blender, strong CS foundations (OOP, DSA, DBMS), experience with AI automation/vibe coding, and enthusiasm for building practical game projects."
  }
];

/**
 * Flexible Multi-Keyword Scorer
 * Scores user query against triggers, topics, and question patterns.
 */
export function findBestKnowledgeAnswer(query) {
  if (!query || typeof query !== 'string') return null;

  const raw = query.toLowerCase().trim();
  const clean = raw.replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ');
  const tokens = clean.split(' ').filter((w) => w.length > 2);

  let bestEntry = null;
  let highestScore = 0;

  for (const entry of KNOWLEDGE_FAQS) {
    let score = 0;

    // Direct phrase matching on triggers (high weight)
    for (const trigger of entry.triggers) {
      if (raw.includes(trigger) || clean.includes(trigger)) {
        score += 15;
      }
    }

    // Individual token matching on triggers and topics
    for (const token of tokens) {
      for (const trigger of entry.triggers) {
        if (trigger.includes(token)) score += 2;
      }
      for (const topic of entry.topics) {
        if (topic.includes(token)) score += 3;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestEntry = entry;
    }
  }

  // Threshold to avoid false positive on completely irrelevant queries
  if (bestEntry && highestScore >= 5) {
    return bestEntry.answer;
  }

  return null;
}
