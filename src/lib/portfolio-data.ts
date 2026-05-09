export const profile = {
  name: "Mauricio Obando",
  title: "Backend, Data, Cloud, and AI Engineer",
  subtitle:
    "I build production-grade data platforms, FastAPI backends, AWS architectures, Redshift analytics systems, and LLM-powered workflows.",
  about:
    "Python-first engineer focused on backend, data, cloud, and AI systems. I work across production APIs, warehouse architecture, FinOps visibility, analytics pipelines, and applied LLM workflows with a strong delivery mindset.",
  bio: "Backend, data, and cloud engineer with hands-on delivery across AWS, Redshift, dbt, Spark, FastAPI, and AI-assisted engineering workflows.",
  email: "mauricioobgo@gmail.com",
  location: "Bogotá, Colombia",
  company: "Globant",
  resume_link:
    "https://drive.google.com/file/d/197iszNCfu2tIdIlV5CLF--6Lk3bMSBFH/view?usp=sharing",
  github: "https://github.com/mauricioobgo",
  linkedin: "https://www.linkedin.com/in/mauricioobgo/",
  skills: [
    "Python 3.14",
    "FastAPI",
    "AWS",
    "Redshift",
    "dbt",
    "LLMs",
    "Data Engineering",
    "Cloud Architecture",
  ],
};

export const heroCommands: { kind: "in" | "out" | "blank"; text: string }[] = [
  { kind: "in", text: "$ whoami" },
  { kind: "out", text: "mauricio_obando" },
  { kind: "blank", text: "" },
  { kind: "in", text: "$ current_focus" },
  { kind: "out", text: "backend_engineering | data_platforms | cloud_architecture | llm_systems" },
  { kind: "blank", text: "" },
  { kind: "in", text: "$ stack --top" },
  { kind: "out", text: "python3.14 fastapi aws redshift dbt llms spark" },
];

export const assistantPrompts = [
  "Summarize Mauricio for a backend platform engineering role.",
  "Which AWS, Redshift, and data engineering strengths stand out the most?",
  "How does Mauricio apply AI and LLM systems in practical delivery work?",
  "What production patterns appear across Mauricio's backend and cloud projects?",
];

export const navSections = [
  { id: "focus", label: "Focus" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "terminal", label: "Terminal" },
  { id: "certifications", label: "Certifications" },
  { id: "github", label: "GitHub" },
  { id: "ai", label: "AI" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];

export type Experience = {
  role: string;
  company: string;
  date: string;
  location: string;
  description: string;
  highlights: string[];
  company_url?: string;
};

export const experience: Experience[] = [
  {
    role: "Data Engineer",
    company: "Globant",
    date: "Current",
    location: "Bogotá, Colombia",
    description:
      "Delivery centered on modern data engineering, AI-oriented workflows, and cloud execution.",
    highlights: [
      "Modern data engineering and platform delivery",
      "Practical AI workflows close to production",
      "Cloud-native execution patterns",
    ],
    company_url: "https://www.globant.com/",
  },
  {
    role: "Technical Account Manager",
    company: "Amazon Web Services",
    date: "May 2024 — Previous role",
    location: "Colombia",
    description:
      "Worked with AWS customers on architecture reliability, Well-Architected guidance, cost optimization, Redshift performance, and cloud intelligence.",
    highlights: [
      "Resiliency, security, and operational-excellence recommendations",
      "FinOps visibility with Python, Athena, Glue, S3",
      "Migration and adoption guidance across services",
    ],
    company_url: "https://aws.amazon.com/",
  },
  {
    role: "Data Engineer Specialist",
    company: "Publicis Media",
    date: "Feb 2023 — May 2024",
    location: "Hybrid delivery",
    description:
      "Designed and operated high-value data pipelines, dashboard architectures, and marketing analytics workflows for enterprise client programs.",
    highlights: [
      "AWS + GCP ingestion pipelines for Stellantis programs",
      "Tableau and Looker insight delivery patterns",
      "Marketing-moment classification model from Google Ads data",
    ],
    company_url: "https://www.publicismedia.com/",
  },
];

export type Project = {
  name: string;
  category: string;
  summary: string;
  problem: string;
  solution: string;
  tech_stack: string[];
  highlights: string[];
  github_url?: string;
  status: string;
};

export const projects: Project[] = [
  {
    name: "AI DataOps Platform",
    category: "LLM",
    summary:
      "Production-style platform for ingesting, validating, querying, and understanding datasets with LLM support.",
    problem:
      "Teams need one workflow for data ingestion, validation, warehouse curation, and AI-assisted dataset understanding.",
    solution:
      "Python-first platform with async APIs, governed dataset flows, retrieval-enhanced assistance, and operational observability.",
    tech_stack: ["FastAPI", "PostgreSQL", "S3", "dbt", "pgvector", "AWS", "LLMs"],
    highlights: ["Async ingestion API", "RAG assistant", "Data quality checks", "CI/CD"],
    github_url: "https://github.com/mauricioobgo/langfuseExploration",
    status: "Portfolio case study",
  },
  {
    name: "Redshift Performance & Cost Analyzer",
    category: "AWS",
    summary:
      "Tooling for analyzing Redshift workloads, WLM behavior, and cost optimization opportunities.",
    problem:
      "Redshift teams often lack a single view that combines workload patterns, tuning signals, and cost guidance.",
    solution:
      "Diagnostic layer that reviews query history, warehouse behavior, and cost signals to surface practical optimization paths.",
    tech_stack: ["Python", "Redshift", "AWS", "SQL", "FastAPI", "CloudWatch"],
    highlights: [
      "Query history analysis",
      "WLM insights",
      "Cost optimization",
      "Serverless vs provisioned",
    ],
    github_url: "https://github.com/mauricioobgo/RedshiftDataApIReferenceArchitecture",
    status: "Portfolio case study",
  },
  {
    name: "LLM Healthcare / HL7 Agent",
    category: "LLM",
    summary:
      "AI agent that classifies HL7 messages, extracts structured patient context, and evaluates relevance for healthcare workflows.",
    problem:
      "HL7 payloads are noisy, domain-heavy, and difficult to triage quickly inside operational healthcare flows.",
    solution:
      "Agent workflow that parses messages, enriches context, and produces structured outputs for downstream review.",
    tech_stack: ["Python", "OpenAI SDK", "FastAPI", "Vector DB", "Structured outputs"],
    highlights: ["HL7 parsing", "LLM classification", "Tool calling", "Evaluation dataset"],
    status: "Private delivery pattern",
  },
  {
    name: "Cloud Cost Intelligence Dashboard",
    category: "AWS",
    summary: "AWS FinOps dashboard that analyzes service usage and recommends cost optimizations.",
    problem:
      "Cloud teams need cost transparency that is technical enough for engineers and practical enough for platform planning.",
    solution:
      "Combined billing, usage, and warehouse views into an engineering-friendly dashboard for cost-aware decisions.",
    tech_stack: ["AWS Cost Explorer", "Python", "FastAPI", "Athena", "Glue", "S3"],
    highlights: ["Cost trend analysis", "S3 optimization", "Athena estimation", "Redshift insights"],
    status: "Portfolio case study",
  },
  {
    name: "FastAPI Production Template",
    category: "Backend",
    summary:
      "Backend template with production-ready architecture, delivery guardrails, and CI/CD foundations.",
    problem:
      "Teams moving fast still need consistent architecture, migrations, testing, and deployment checks from day one.",
    solution:
      "Reusable backend foundation that emphasizes clean structure, observability, and team scale readiness.",
    tech_stack: ["Python 3.14", "FastAPI", "SQLAlchemy", "Alembic", "PostgreSQL", "Docker"],
    highlights: ["Clean architecture", "Auth-ready", "Logging", "Tests", "CI/CD"],
    status: "Portfolio case study",
  },
];

export type Certification = {
  title: string;
  issuer: string;
  level: string;
  category: string;
  status: string;
  featured: boolean;
  issued: string;
  linkedin_url: string;
  skills: string[];
};

export const certifications: Certification[] = [
  {
    title: "AWS Certified Solutions Architect — Professional",
    issuer: "Amazon Web Services",
    level: "Professional",
    category: "Cloud Architecture",
    status: "Active",
    featured: true,
    issued: "Listed on LinkedIn",
    linkedin_url: "https://www.linkedin.com/in/mauricioobgo/details/certifications/",
    skills: ["AWS", "Architecture", "Distributed Systems", "Security", "Cost Optimization"],
  },
  {
    title: "AWS Certified Machine Learning — Specialty",
    issuer: "Amazon Web Services",
    level: "Specialty",
    category: "Machine Learning",
    status: "Active",
    featured: true,
    issued: "Listed on LinkedIn",
    linkedin_url: "https://www.linkedin.com/in/mauricioobgo/details/certifications/",
    skills: ["Machine Learning", "MLOps", "Data Engineering", "AWS"],
  },
  {
    title: "DS4A / Colombia 6.0",
    issuer: "Correlation One",
    level: "Program",
    category: "Data Science",
    status: "Completed",
    featured: false,
    issued: "Jul 2022",
    linkedin_url: "https://www.linkedin.com/in/mauricioobgo/details/certifications/",
    skills: ["Applied data science", "Analytics", "Python"],
  },
  {
    title: "Intro to TensorFlow for AI, ML & Deep Learning",
    issuer: "Coursera",
    level: "Foundations",
    category: "Machine Learning",
    status: "Completed",
    featured: false,
    issued: "Jul 2020",
    linkedin_url: "https://www.linkedin.com/in/mauricioobgo/details/certifications/",
    skills: ["TensorFlow", "Machine Learning", "Deep Learning"],
  },
  {
    title: "Google Analytics Beginners",
    issuer: "Google",
    level: "Foundations",
    category: "Analytics",
    status: "Completed",
    featured: false,
    issued: "Jul 2020",
    linkedin_url: "https://www.linkedin.com/in/mauricioobgo/details/certifications/",
    skills: ["Analytics", "Digital measurement"],
  },
  {
    title: "Best Student Award",
    issuer: "Universidad de la Sabana",
    level: "Award",
    category: "Academic",
    status: "Completed",
    featured: false,
    issued: "Oct 2013",
    linkedin_url: "https://www.linkedin.com/in/mauricioobgo/details/certifications/",
    skills: ["Academic excellence"],
  },
];

export const stack = {
  Languages: ["Python 3.14", "SQL", "TypeScript", "Bash"],
  Backend: ["FastAPI", "SQLAlchemy", "Alembic", "PostgreSQL", "REST", "Async I/O"],
  Cloud: ["AWS", "Redshift", "S3", "Athena", "Glue", "Lambda", "CloudWatch", "GCP"],
  Data: ["dbt", "Spark", "pgvector", "Tableau", "Looker"],
  AI: ["LLMs", "OpenAI SDK", "RAG", "Tool calling", "Structured outputs"],
  DevOps: ["Docker", "GitHub Actions", "CI/CD", "uv"],
};

export const focusPillars = [
  {
    title: "Backend & APIs",
    body: "Production FastAPI services with clean architecture, async I/O, migrations, observability, and CI/CD baked in.",
    accent: "cyan" as const,
  },
  {
    title: "Data & Cloud",
    body: "Redshift, dbt, S3, Athena, Glue. Warehouse modeling, FinOps visibility, and analytics pipelines that hold under load.",
    accent: "amber" as const,
  },
  {
    title: "AI Systems",
    body: "Applied LLM workflows, retrieval, tool calling, and structured outputs wired into real engineering delivery.",
    accent: "violet" as const,
  },
];