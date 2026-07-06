import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API client if the key is available
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenerativeAI(apiKey);
};

// High-fidelity templates for Mock AI responses when API key is missing
const MOCK_AI_RESPONSES: Record<string, Function> = {
  planner: (input: string) => {
    const goal = input || "Complete my upcoming project";
    return {
      success: true,
      data: {
        goal: goal,
        estimatedDuration: "14 hours over 5 days",
        copilotGuidance: `I have analyzed your goal: "${goal}". To make it manageable and prevent overwhelm, I have broken it down into 5 sequential steps, prioritized them, and created a daily schedule. Focus on the high-priority foundation tasks first.`,
        tasks: [
          { id: "p1", title: "Define project scope, outline requirements, and structure components", duration: "2 hours", priority: "high", category: "Planning", status: "todo", date: "Day 1" },
          { id: "p2", title: "Set up development workspace, install dependencies, and configure environment", duration: "3 hours", priority: "high", category: "Setup", status: "todo", date: "Day 2" },
          { id: "p3", title: "Create core interfaces, write primary logical functions, and connect storage", duration: "4 hours", priority: "medium", category: "Core Development", status: "todo", date: "Day 3" },
          { id: "p4", title: "Integrate dashboard view widgets and assemble sub-components", duration: "3 hours", priority: "medium", category: "UI Integration", status: "todo", date: "Day 4" },
          { id: "p5", title: "Run verification tests, fix bugs, optimize styles, and prepare deployment", duration: "2 hours", priority: "low", category: "Polishing", status: "todo", date: "Day 5" }
        ],
        schedule: [
          { id: "s1", time: "09:00 AM - 11:00 AM", task: "Step 1: Define project scope & requirements", category: "Planning" },
          { id: "s2", time: "11:30 AM - 01:00 PM", task: "Step 2: Initialize environment & files", category: "Setup" },
          { id: "s3", time: "02:00 PM - 04:00 PM", task: "Step 3: Develop core business logic", category: "Core Development" }
        ],
        timeline: [
          { phase: "Phase 1: Foundation", details: "Steps 1 and 2 completed. Initial architecture set up." },
          { phase: "Phase 2: Execution", details: "Core coding phase. Implement primary user flows." },
          { phase: "Phase 3: Launch", details: "Testing, styling updates, and final deployment setup." }
        ]
      }
    };
  },
  researcher: (input: string) => {
    const topic = input || "Web Development with Next.js";
    return {
      success: true,
      data: {
        topic: topic,
        summary: `This AI-generated learning roadmap covers "${topic}". It is structured into consecutive learning phases from absolute basics to advanced implementation. Additionally, it highlights standard resources and milestones to assess your understanding.`,
        roadmap: [
          {
            phase: "Phase 1: Core Concepts & Principles",
            description: "Build a strong theoretical foundation before writing code.",
            items: ["Key definitions and core terminology", "Underlying architectures and basic models", "Primary ecosystem overview and standard paradigms"]
          },
          {
            phase: "Phase 2: Hands-on Basics",
            description: "Apply your knowledge by building small, sandbox experiments.",
            items: ["Setting up basic configuration frameworks", "Writing first practical scripts or modules", "Understanding debugging and log diagnostics"]
          },
          {
            phase: "Phase 3: Advanced Optimization",
            description: "Scale your application, optimize performance, and refine security.",
            items: ["Caching strategies, lazy loading, and state optimization", "Error tracking and security threat remediation", "CI/CD deployment pipelines and cloud configurations"]
          }
        ],
        resources: [
          { type: "Documentation", title: `Official ${topic} Guide`, link: "https://docs.example.com" },
          { type: "Video Tutorial", title: `${topic} crash course for Beginners`, link: "https://youtube.com" },
          { type: "Interactive Practice", title: "Sandbox playgrounds and exercises", link: "https://github.com" }
        ],
        milestones: [
          { id: "m1", title: "Complete conceptual quiz and outline definitions", checked: false },
          { id: "m2", title: "Build and run a working sandbox demo", checked: false },
          { id: "m3", title: "Optimize and deploy a complete production build", checked: false }
        ]
      }
    };
  },
  decision: (input: string) => {
    // Expected format: "Option A vs Option B"
    const options = input.split(" vs ").map(o => o.trim());
    const optA = options[0] || "Option A";
    const optB = options[1] || "Option B";

    return {
      success: true,
      data: {
        comparison: `${optA} vs ${optB}`,
        recommendation: `Based on your productivity goals, structural stability, and learning curves, ${optA} is the recommended path. It aligns better with autonomous long-term scaling, whereas ${optB} is suitable for quick proof-of-concept projects.`,
        confidenceScore: 84,
        options: [optA, optB],
        metrics: [
          { label: "Learning Curve", valueA: "Moderate (Well documented)", valueB: "Low (Very intuitive)" },
          { label: "Performance", valueA: "Excellent (Optimized runtime)", valueB: "Average" },
          { label: "Ecosystem Stability", valueA: "High (Backed by large community)", valueB: "Moderate" }
        ],
        prosCons: {
          [optA]: {
            pros: ["Highly scalable architecture", "Outstanding performance options", "Robust community and active package ecosystem"],
            cons: ["Slightly steeper initial setup curve", "Stricter folder architecture rules"]
          },
          [optB]: {
            pros: ["Extremely fast prototyping speed", "Minimal boilerplate files needed"],
            cons: ["Harder to scale as application codebase grows", "Fewer off-the-shelf optimization frameworks"]
          }
        },
        risks: {
          [optA]: "Transitioning legacy files might take more time.",
          [optB]: "May encounter performance bottlenecks at scale."
        }
      }
    };
  },
  email: (input: any) => {
    const { type, recipient, sender, tone, details } = input;
    const emailSubject = `${type.charAt(0).toUpperCase() + type.slice(1)} Request - ${sender || "Employee"}`;
    const formattedTone = tone || "professional";
    
    let emailBody = "";
    if (type === "leave") {
      emailBody = `Dear ${recipient || "Manager"},\n\nI am writing to formally request a leave of absence starting from next Monday. ${details ? `This request is due to ${details}.` : "I need this time to attend to personal matters."}\n\nI will ensure that all my ongoing deliverables are documented and handed over. I will have limited access to my email but can be reached in case of critical emergencies.\n\nThank you for your understanding and support.\n\nBest regards,\n${sender || "Your Name"}`;
    } else if (type === "internship") {
      emailBody = `Dear hiring team at ${recipient || "Company"},\n\nI am writing to express my strong interest in the Software Engineering Internship position. I have been following your achievements in AI development and would love to contribute my technical skills in TypeScript and Next.js.\n\n${details ? `My background: ${details}.` : "I have built several full-stack applications with elegant dashboard designs and robust integrations."}\n\nI have attached my resume and links to my recent works. I look forward to the possibility of discussing how I can add value to your team.\n\nSincerely,\n${sender || "Your Name"}`;
    } else {
      emailBody = `Dear ${recipient || "Recipient"},\n\nI hope this email finds you well. I am reaching out to follow up on our previous conversation regarding the dashboard integration project.\n\n${details ? `${details}` : "Please let me know if you need any additional files or clarifications to proceed."}\n\nLooking forward to your response.\n\nBest regards,\n${sender || "Your Name"}`;
    }

    return {
      success: true,
      data: {
        subject: emailSubject,
        body: emailBody,
        tone: formattedTone,
        copilotTip: "Tip: Read the draft through once to customize names and dates before sending. Send follow-ups mid-week for the highest response rate."
      }
    };
  },
  wellness: (input: string) => {
    return {
      success: true,
      data: {
        copilotTip: "Work-life balance is key to continuous high productivity. Taking structured micro-breaks increases focus.",
        suggestions: [
          { title: "Hydration Check", desc: "Drink 250ml of water right now. Keep a bottle at your desk.", category: "hydration" },
          { title: "20-20-20 Rule", desc: "Look away from your screen at an object 20 feet away for 20 seconds to rest your eyes.", category: "exercise" },
          { title: "Desk Stretch", desc: "Roll your shoulders backward 5 times and stretch your wrists.", category: "exercise" }
        ],
        insights: "Your recent task completion frequency is high. This is great, but don't forget to take a 10-minute walk outside."
      }
    };
  },
  emergency: (tasks: any[]) => {
    // Process input tasks, sort by priority, and filter out low/medium if user is overloaded
    const filteredTasks = tasks.filter(t => t.priority === 'high' || t.urgent);
    const postponedCount = tasks.length - filteredTasks.length;
    
    return {
      success: true,
      data: {
        message: "Cognitive overload detected. I have temporarily archived low-priority items and designed a focused, high-impact schedule for today. Take a deep breath — you only have 3 critical objectives right now. Everything else can wait until tomorrow.",
        prioritizedTasks: filteredTasks.map(t => ({ ...t, status: 'todo' })),
        postponedCount: postponedCount,
        calmingTips: [
          "Close all unnecessary browser tabs.",
          "Work on one task for 25 minutes (Pomodoro), then step away entirely.",
          "Remember that physical well-being always comes before digital lists."
        ]
      }
    };
  }
};

// Main generation function
export async function generateAI(agentType: string, inputData: any): Promise<any> {
  const gemini = getGeminiClient();
  const inputString = typeof inputData === 'string' ? inputData : JSON.stringify(inputData);

  // If Gemini API is not configured, fallback immediately to the high-fidelity mock engine
  if (!gemini) {
    if (MOCK_AI_RESPONSES[agentType]) {
      // Simulate artificial delay (e.g., 800ms) to feel like real network AI generation
      await new Promise(resolve => setTimeout(resolve, 800));
      return MOCK_AI_RESPONSES[agentType](inputData);
    }
    return { success: false, error: "Agent type template not found and API key is missing." };
  }

  try {
    const modelName = 'gemini-1.5-flash';
    const model = gemini.getGenerativeModel({ model: modelName });
    
    let systemInstruction = "You are LifePilot AI, a highly efficient personal assistant. Return responses in structured JSON format.";
    
    if (agentType === 'planner') {
      systemInstruction += " Accept a user goal and break it down into an estimated duration, a list of structured tasks with ids, priorities (high, medium, low), category, date, and a daily schedule (ids, time, task, category). Output ONLY JSON.";
    } else if (agentType === 'researcher') {
      systemInstruction += " Generate a learning roadmap for any topic, returning a detailed overview summary, an array of roadmap phases, recommended resource links, and milestones checkmarks. Output ONLY JSON.";
    } else if (agentType === 'decision') {
      systemInstruction += " Perform a detailed decision matrix comparing two options. Return recommendation, confidence score (0-100), key metrics table, pros and cons lists for both options, and risks. Output ONLY JSON.";
    } else if (agentType === 'email') {
      systemInstruction += " Generate a professional draft email based on inputs. Return subject, body, and a practical copilot tip. Output ONLY JSON.";
    } else if (agentType === 'wellness') {
      systemInstruction += " Provide wellness recommendations, hydration tips, exercises, and work-life balance insights. Output ONLY JSON.";
    }

    const response = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: inputString }] }],
      generationConfig: {
        responseMimeType: "application/json"
      }
    });

    const text = response.response.text();
    return {
      success: true,
      data: JSON.parse(text)
    };
  } catch (error: any) {
    console.error("Gemini API Error, falling back to mock response:", error);
    if (MOCK_AI_RESPONSES[agentType]) {
      return MOCK_AI_RESPONSES[agentType](inputData);
    }
    return { success: false, error: error.message };
  }
}
