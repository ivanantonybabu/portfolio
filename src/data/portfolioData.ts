export interface Project {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  category: 'Robotics & SLAM' | 'Software-Defined Radio' | 'Embedded & IoT' | 'Software';
  description: string;
  highlights: string[];
  tags: string[];
  featured?: boolean;
  bentoSpan?: string;
  githubUrl?: string;
  demoUrl?: string;
  image?: string;
  photoPlaceholderNote?: string;
}

export interface Achievement {
  id: string;
  metric: string;
  label: string;
  organization: string;
  year: string;
  description: string;
  image?: string;
  photoPlaceholderNote?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  type: 'internship' | 'leadership';
  highlights: string[];
  tags: string[];
  badge?: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  location: string;
  score: string;
  scoreType: string;
  description?: string;
  courses?: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  credentialId?: string;
  image?: string;
  badge?: string;
}

export interface AcademicReference {
  name: string;
  title: string;
  department: string;
  institution: string;
  location: string;
  email: string;
  phone: string;
}

export const PERSONAL_INFO = {
  name: "Ivan Antony Babu",
  firstName: "Ivan",
  middleName: "Antony",
  lastName: "Babu",
  initials: "IB",
  title: "Robotics & Embedded Systems Engineer",
  tagline: "Building intelligent hardware-software solutions across Autonomous Systems, Software-Defined Radio, and Computer Vision.",
  location: "Kochi, Kerala, India",
  pincode: "682022",
  email: "ivanantonybabu@gmail.com",
  phone: "+91 8078584371",
  github: "https://github.com/Nightsky2004",
  secondaryGithub: "https://github.com/ivanantonybabu",
  linkedin: "https://www.linkedin.com/in/ivan-antony-babu-530265280",
  instagram: "https://www.instagram.com/ivan_antony_babu",
  googleScholar: "https://scholar.google.com",
  resumePath: "/resume.pdf",
  profilePhoto: "/profile.jpg",
  availability: "Available for Engineering Roles & Research",
  bioHeadline: "I design, build, and deploy intelligent autonomous systems — from real-time visual-inertial SLAM on edge compute to adaptive anti-jamming wireless modems.",
  bioDescription: "I bridge the gap between low-level hardware constraints and high-level algorithmic intelligence. With a dual-degree background in Electronics & Communications (CUSAT) and Data Science (IIT Madras), I combine robotics engineering, DSP, and machine learning to build resilient systems for GPS-denied environments and complex wireless channels."
};

export const RELEVANT_COURSEWORK = [
  "Linear Algebra & Transform Techniques",
  "Calculus",
  "Signals & Systems",
  "Digital Signal Processing (DSP)",
  "Digital Image Processing",
  "Artificial Intelligence & Robotics",
  "Microprocessors & Microcontrollers",
  "Embedded Systems",
  "Cyber Physical Systems",
  "Control Systems",
  "RF Circuit Design",
  "Object Oriented Programming in C++",
  "Data Communications & Networking"
];

export const SKILL_CATEGORIES = [
  {
    symbol: "◈",
    title: "Robotics & Autonomous Systems",
    skills: ["ROS", "Gazebo", "Visual-Inertial SLAM", "ToF LiDAR", "Multi-Sensor Fusion", "Autonomous Navigation", "UAVs / Drones", "Avionics Architecture", "Path Planning"]
  },
  {
    symbol: "⬡",
    title: "Embedded Systems & Hardware",
    skills: ["Raspberry Pi 5", "ESP8266", "ARM Microcontrollers", "Arduino", "KiCad (PCB)", "SolidWorks (CAD)", "VLSI SoC (Verilog HDL)", "Proteus", "LTSpice", "ANSYS HFSS"]
  },
  {
    symbol: "⚡",
    title: "SDR & Wireless Communication",
    skills: ["GNU Radio", "Software-Defined Radio", "USRP (Ettus B210)", "RTL-SDR", "Spectrum Sensing", "FSK Modulation", "Anti-Jamming Systems", "NBFM Transmission", "RF Circuits"]
  },
  {
    symbol: "△",
    title: "Software, AI & Tools",
    skills: ["Python", "C++", "C", "Java", "OpenCV", "Computer Vision", "Flask", "Django", "SQL", "Linux / Bash", "MATLAB", "LaTeX", "Git / GitHub", "VS Code"]
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "star-pnt",
    metric: "STAR-PNT",
    label: "Fellowship Awardee",
    organization: "IIT Tirupati Navavishkar I-Hub",
    year: "2026",
    description: "Awarded prestigious fellowship for cutting-edge research in Positioning, Navigation, and Timing (PNT) technologies.",
    photoPlaceholderNote: "Add IIT Tirupati fellowship award ceremony or lab photo"
  },
  {
    id: "isdc",
    metric: "World #15",
    label: "Space Drone Challenge",
    organization: "ISDC 2026 • Kerala Rank 1",
    year: "2026",
    description: "Led team AROHA to World Rank 15 and Kerala Rank 1 in the premier International Space Drone Challenge.",
    photoPlaceholderNote: "Add AROHA Drone team at ISDC photo"
  },
  {
    id: "aerothon",
    metric: "AIR 9",
    label: "SAE AeroTHON",
    organization: "SAE India • Kerala Rank 1",
    year: "2025",
    description: "Secured All India Rank 9 and State Rank 1 in SAE India's flagship autonomous UAV competition.",
    photoPlaceholderNote: "Add SAE AeroTHON UAV payload testing photo"
  },
  {
    id: "nptel-top",
    metric: "Top 1%",
    label: "Computer Architecture",
    organization: "NPTEL • IIT Kharagpur",
    year: "2025",
    description: "Achieved elite Top 1% national rank in Computer Architecture and Organization examination.",
    photoPlaceholderNote: "Add NPTEL Certificate badge or photo"
  },
  {
    id: "cgpa-cusat",
    metric: "8.58",
    label: "B.Tech ECE CGPA",
    organization: "Cochin University of Science & Tech",
    year: "2023–2027",
    description: "Consistently ranked at top of cohort in Electronics and Communications Engineering."
  },
  {
    id: "ideathon",
    metric: "3rd Place",
    label: "Ideathon Winners",
    organization: "AI Drone Farming Solution",
    year: "2024",
    description: "Awarded 3rd place for designing an AI-driven agricultural drone system for precision crop health analytics.",
    photoPlaceholderNote: "Add Ideathon pitch presentation photo"
  },
  {
    id: "nso",
    metric: "Rank 1",
    label: "Science Olympiad Topper",
    organization: "National Science Olympiad",
    year: "2020 & 2022",
    description: "School topper and district top-10 finalist across consecutive National Science Olympiads."
  }
];

export const PROJECTS: Project[] = [
  {
    id: "indoor-mapping-slam",
    title: "Indoor Mapping & Navigation System using Raspberry Pi 5",
    subtitle: "Low-Cost ToF LiDAR & Visual-Inertial SLAM with Sensor Fusion",
    year: "2026",
    category: "Robotics & SLAM",
    featured: true,
    bentoSpan: "lg:col-span-3 lg:row-span-2",
    description: "A research-grade, low-cost indoor localization and mapping system developed in collaboration with IIT Tirupati Navavishkar i-Hub Foundation and CUSAT. Combines Raspberry Pi 5 with monocular camera, 6-DoF IMU, and Time-of-Flight (ToF) LiDAR.",
    highlights: [
      "Engineered real-time 2D occupancy grid mapping for GPS-denied indoor environments.",
      "Implemented Visual-Inertial SLAM with multi-sensor kalman fusion to eliminate odometry drift.",
      "Integrated ToF range validation, yielding significant trajectory accuracy gains over pure visual SLAM.",
      "Designed a responsive QR-code framework allowing mobile users to access indoor maps and automated shortest-path navigation via web UI."
    ],
    tags: ["ROS", "Raspberry Pi 5", "ToF LiDAR", "VI-SLAM", "Sensor Fusion", "Computer Vision", "Python"],
    githubUrl: "https://github.com/Nightsky2004",
    photoPlaceholderNote: "Add hardware setup photo: Raspberry Pi 5 mounted with monocular camera and ToF LiDAR sensor"
  },
  {
    id: "sdr-anti-jamming",
    title: "SDR-Based Anti-Jamming Audio Communication System",
    subtitle: "Full-Duplex Ettus B210 Interference Mitigation",
    year: "2026",
    category: "Software-Defined Radio",
    featured: true,
    bentoSpan: "lg:col-span-2 lg:row-span-1",
    description: "Designed a full-duplex Software Defined Radio communication link using the Ettus USRP B210 to investigate and mitigate intentional hostile jamming in wireless audio channels.",
    highlights: [
      "Simulated wideband noise jamming while transmitting Narrowband FM (NBFM) audio over independent SDR channels.",
      "Developed adaptive digital filtering in GNU Radio to suppress high-power jamming and restore intelligible audio.",
      "Evaluated receiver performance across varying jamming power, filter bandwidth, and Signal-to-Noise Ratio (SNR)."
    ],
    tags: ["GNU Radio", "Ettus USRP B210", "DSP", "NBFM", "Anti-Jamming", "Spectrum Sensing"],
    githubUrl: "https://github.com/Nightsky2004",
    photoPlaceholderNote: "Add SDR lab setup photo: Ettus USRP B210 with RF antennas and GNU Radio spectrum FFT"
  },
  {
    id: "fsk-acoustic-modem",
    title: "Audio-Band FSK Text Modem using GNU Radio",
    subtitle: "Acoustic Over-The-Air Data Transmission",
    year: "2026",
    category: "Software-Defined Radio",
    featured: false,
    bentoSpan: "lg:col-span-2 lg:row-span-1",
    description: "Implemented an end-to-end Frequency Shift Keying (FSK) acoustic modem transmitting digital text through ordinary computer microphones and speakers over air.",
    highlights: [
      "Built complete transmitter & receiver flowgraphs: FSK modulation, quadrature demodulation, binary slicing, and bit reconstruction.",
      "Converted digital payloads to distinct audio tone pairs and recovered error-free messages in real time.",
      "Benchmarked performance across varying acoustic noise floors and reverberant room conditions."
    ],
    tags: ["GNU Radio", "Acoustic Modem", "FSK Modulation", "DSP", "Python", "Audio Processing"],
    githubUrl: "https://github.com/Nightsky2004",
    photoPlaceholderNote: "Add GNU Radio companion flowgraph screenshot"
  },
  {
    id: "sams-smart-attendance",
    title: "Smart Attendance & Student Monitoring System (SAMS)",
    subtitle: "Raspberry Pi 5 + RFID + Facial Landmark EAR Attention Tracking",
    year: "2025",
    category: "Embedded & IoT",
    featured: true,
    bentoSpan: "lg:col-span-3 lg:row-span-1",
    description: "Comprehensive intelligent classroom monitoring and attendance platform combining hardware RFID authentication with real-time computer vision analysis.",
    highlights: [
      "Architected automated attendance logging with ESP8266 and RFID scanners synced to a centralized Flask backend.",
      "Implemented facial landmark detection and Eye Aspect Ratio (EAR) algorithms to track student attention levels in real time.",
      "Built analytics dashboard displaying attendance rates, focus metrics, and classroom anomalies."
    ],
    tags: ["Raspberry Pi 5", "ESP8266", "OpenCV", "Facial Landmarks", "Flask", "IoT", "SQL"],
    githubUrl: "https://github.com/Nightsky2004",
    photoPlaceholderNote: "Add classroom hardware module photo or OpenCV attention heatmap screenshot"
  },
  {
    id: "smart-fence-intrusion",
    title: "Smart Fence Intrusion Detection System",
    subtitle: "Perimeter Security with Multi-Sensor Array",
    year: "2024",
    category: "Embedded & IoT",
    featured: false,
    bentoSpan: "lg:col-span-2 lg:row-span-1",
    description: "Developed an autonomous perimeter intrusion detection system capable of monitoring fences against unauthorized breach events.",
    highlights: [
      "Integrated environmental vibration, infrared, and tilt sensors with embedded controllers.",
      "Implemented thresholding filters to discriminate ambient weather noise from genuine intrusion tampering.",
      "Triggered automated alarms and wireless telemetry alerts."
    ],
    tags: ["Embedded Controllers", "Sensors", "Perimeter Security", "IoT", "C++"],
    githubUrl: "https://github.com/Nightsky2004",
    photoPlaceholderNote: "Add prototype sensor enclosure on test fence photo"
  },
  {
    id: "library-management",
    title: "Intelligent Library Management System",
    subtitle: "Built during KELTRON Internship",
    year: "2024",
    category: "Software",
    featured: false,
    bentoSpan: "lg:col-span-3 lg:row-span-1",
    description: "Desktop software suite designed and implemented at Kerala State Electronics Development Corporation (KELTRON) for comprehensive cataloging and member lending records.",
    highlights: [
      "Engineered clean Tkinter graphical user interface with SQL database relational backend.",
      "Implemented barcode scanning, due-date calculation, fine tracking, and automated book reservation."
    ],
    tags: ["Python", "SQL", "Tkinter", "Database Design", "Desktop App"],
    githubUrl: "https://github.com/Nightsky2004"
  }
];

export const PUBLICATION = {
  title: "A Low-Cost ToF LiDAR-Assisted Visual–Inertial SLAM System Using Multi-Sensor Fusion for Indoor Localization on Raspberry Pi 5",
  authors: "Ivan Antony Babu",
  venue: "International Conference on Trends in Engineering Systems and Technologies (ICTEST)",
  location: "Kochi, India",
  year: "2026",
  status: "Presented",
  abstract: "GPS signals attenuate severely inside multistory buildings and industrial facilities, causing conventional autonomous mobile robots to lose orientation. This paper presents a resilient, cost-effective indoor localization and mapping framework running entirely on a single-board Raspberry Pi 5. By fusing monocular camera visual odometry, 6-DoF inertial measurements, and lightweight Time-of-Flight (ToF) LiDAR distance ranges, the system suppresses trajectory drift by over 40% compared to standard monocam SLAM while maintaining real-time frame rates and generating high-fidelity 2D occupancy grid maps for navigation.",
  keywords: ["Visual-Inertial SLAM", "ToF LiDAR", "Raspberry Pi 5", "Sensor Fusion", "Indoor Localization", "GPS-Denied Navigation", "ROS"],
  photoPlaceholderNote: "Add ICTEST conference presentation slide or paper screenshot"
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "iittnif",
    role: "Project Intern",
    organization: "IIT Tirupati Navavishkar I-Hub Foundation (IITTNiF)",
    location: "Tirupati, India",
    period: "Jan 2026 – Apr 2026",
    type: "internship",
    badge: "STAR-PNT Fellow",
    highlights: [
      "Spearheaded research and development of a custom Indoor Mapping and Localization System using ROS & SLAM.",
      "Engineered multi-sensor fusion pipelines integrating ToF LiDAR, IMU, and monocular vision on resource-constrained embedded SBCs.",
      "Conducted indoor benchmark trials validating drift reduction under varying lighting and dynamic obstacles."
    ],
    tags: ["ROS", "Visual-Inertial SLAM", "Embedded Linux", "Sensor Fusion", "LiDAR"]
  },
  {
    id: "cusat-doe",
    role: "Summer Intern (SDR & Wireless)",
    organization: "Department of Electronics, CUSAT",
    location: "Kochi, India",
    period: "Jun 2026",
    type: "internship",
    highlights: [
      "Completed intensive hands-on research and training on Software-Defined Radio (SDR) platforms.",
      "Constructed signal processing flowgraphs in GNU Radio for real-time spectrum sensing, FSK modulation, and RF audio transmission.",
      "Conducted over-the-air RF signal transmission and analysis using RTL-SDR and Ettus USRP platforms."
    ],
    tags: ["GNU Radio", "SDR", "USRP Ettus", "RTL-SDR", "RF Engineering", "DSP"]
  },
  {
    id: "keltron",
    role: "Summer Intern",
    organization: "Kerala State Electronics Development Corporation (KELTRON)",
    location: "Kochi, India",
    period: "May 2024",
    type: "internship",
    highlights: [
      "Designed and implemented a full-featured Library Management System using Python, SQL database, and Tkinter GUI.",
      "Learned state-of-the-art electronic manufacturing standards, component inspection, and industrial production pipelines."
    ],
    tags: ["Python", "SQL", "Tkinter", "Electronics Manufacturing"]
  },
  {
    id: "aroha",
    role: "Team Lead (Previously Team Manager & Electronics Member)",
    organization: "AROHA Drone Club",
    location: "Kochi, India",
    period: "Mar 2025 – Present",
    type: "leadership",
    badge: "World Rank 15",
    highlights: [
      "Led the university drone development team to national and international competition glory.",
      "Achieved World Rank 15 and Kerala Rank 1 in the International Space Drone Challenge (ISDC 2026).",
      "Achieved All India Rank 9 and Kerala Rank 1 at SAE India AeroTHON 2025 UAV competition.",
      "Direct technical development of custom flight controllers, telemetry, power distribution boards, and payload deployment mechanisms."
    ],
    tags: ["UAV Systems", "Flight Controllers", "Avionics", "Team Leadership", "Telemetry"]
  },
  {
    id: "ieee-aess",
    role: "Founding Chair, Aerospace & Electronic Systems Society (AESS)",
    organization: "IEEE CUSAT Student Branch Chapter",
    location: "Kochi, India",
    period: "Mar 2026 – Present",
    type: "leadership",
    badge: "Founding Chapter",
    highlights: [
      "Spearheaded the official establishment and launch of the IEEE Aerospace and Electronic Systems Society (AESS) chapter at CUSAT.",
      "Architected strategic roadmaps and curricula for student training in autonomous flight systems, satellite communications, and radar avionics.",
      "Conducted university-wide technical workshops on avionics architecture and autonomous UAV navigation."
    ],
    tags: ["Aerospace Systems", "Avionics", "Strategic Planning", "Technical Workshops"]
  },
  {
    id: "ieee-ias",
    role: "Chair, Industry Applications Society (IAS)",
    organization: "IEEE CUSAT Student Branch Chapter",
    location: "Kochi, India",
    period: "Feb 2025 – Mar 2026",
    type: "leadership",
    highlights: [
      "Organized professional technical workshops, bootcamps, and industrial guest lectures.",
      "Conducted hands-on PCB Assembly and SMD soldering tutorials for over 150+ undergraduate engineering students.",
      "Curated multi-day drone development bootcamps bridging theory and flight controller hardware."
    ],
    tags: ["PCB Assembly", "Drone Bootcamp", "Event Leadership", "Technical Education"]
  }
];

export const INVITED_TALK = {
  title: "WINGS WITHOUT PILOTS: Entering the UAV Era",
  host: "IEEE IA/IE/PELS Joint Chapter Kerala Section",
  collaborators: "IEEE SB AJCE, IEEE SB MACE, & IEEE CUSAT SB",
  year: "2026",
  topic: "Autonomous navigation, flight controller architectures, computer vision payloads, and the future of unmanned aerial systems.",
  photoPlaceholderNote: "Add photo from the invited talk or presentation poster"
};

export const EDUCATION_LIST: EducationItem[] = [
  {
    institution: "Cochin University of Science and Technology (CUSAT)",
    degree: "Bachelor of Technology (B.Tech), Electronics and Communications Engineering",
    period: "2023 – 2027",
    location: "Kochi, India",
    score: "8.58",
    scoreType: "CGPA",
    description: "Focus on embedded systems, robotics, digital signal processing, RF circuits, and autonomous systems.",
    courses: ["Signals & Systems", "DSP", "Digital Image Processing", "Microcontrollers", "Embedded Systems", "Cyber Physical Systems", "Control Systems", "AI & Robotics"]
  },
  {
    institution: "Indian Institute of Technology Madras (IIT Madras)",
    degree: "Bachelor of Science (B.Sc), Data Science and Applications",
    period: "2023 – 2027",
    location: "Madras, India",
    score: "8.33",
    scoreType: "CGPA",
    description: "Rigorous foundation in machine learning, statistical modeling, data structures, algorithms, and computational mathematics.",
    courses: ["Linear Algebra", "Calculus", "Data Structures & Algorithms", "Machine Learning", "Object Oriented Programming in C++", "Database Systems"]
  },
  {
    institution: "Lord’s Academy CMI ICSE School",
    degree: "High School Diploma (ISC & ICSE)",
    period: "2008 – 2022",
    location: "Thrissur, India",
    score: "94% ISC / 93% ICSE",
    scoreType: "Distinction",
    description: "Concentration in Physics, Chemistry, Mathematics, and Computer Science."
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: "Computer Architecture and Organization",
    issuer: "NPTEL • IIT Kharagpur",
    year: "2025",
    badge: "Top 1% Rank",
    credentialId: "NPTEL25CS01"
  },
  {
    title: "Matlab ONRAMP Certification",
    issuer: "MathWorks / MATLAB",
    year: "2025",
    badge: "Certified"
  },
  {
    title: "AWS Certifications in Python",
    issuer: "AWS — DevTown",
    year: "2023",
    badge: "Certified",
    image: "/aws-certificate.jpg"
  },
  {
    title: "VLSI SoC Design using Verilog HDL",
    issuer: "Maven Silicon",
    year: "2023",
    badge: "Certified",
    image: "/vlsi.png"
  }
];

export const ACADEMIC_REFERENCES: AcademicReference[] = [
  {
    name: "Prof. (Dr.) Binu Paul",
    title: "Professor, School of Engineering",
    department: "Electronics and Communication Engineering",
    institution: "Cochin University of Science and Technology",
    location: "Kochi – 682022, Kerala, India",
    email: "Binupaul@cusat.ac.in",
    phone: "+91 8547015950"
  },
  {
    name: "Prof. (Dr.) Deepa Sankar",
    title: "Professor",
    department: "Department of Electronic Engineering",
    institution: "Cochin University of Science and Technology",
    location: "Kochi – 682022, Kerala, India",
    email: "deepasankar@cusat.ac.in",
    phone: "+91 94474 32568"
  }
];
