A high-performance corporate web platform and client portal designed for DevCore Studios. This repository powers the core digital agency ecosystem, featuring an interactive service catalog, a client-side authentication workflow, real-time project progress telemetry, AI-driven meeting booking webhooks, and an integrated support ticket engine.

                                                                                                                          
                                      🚀 DevCore Studios Web Ecosystem & Client Hub                                       
                                                                                                                          
  A high-availability, production-ready web platform engineered for modern organizations, enterprises, and startups.      
  DevCore Studios delivers end-to-end frontend UI/UX, robust security-focused Java backend systems, dynamic full-stack    
  deployments, and custom software architecture with 3 months of seamless managed cloud infrastructure.                   
                                                                                                                          
  Optimised for lightweight static execution, sub-second load performance, and high-concurrency client environments,       
  leveraging native browser subsystems, GSAP micro-animations, and serverless background integrations.                   
                                                                                                                          
  --------                                                                                                                
                                                                                                                          
  ⚡ Core Engineering Highlights & Agency Offerings                                                                       
  Frontend UI/UX Engineering: Pixel-perfect, zero-bloat user interfaces built using HTML5, CSS3, Tailwind CSS, Vanilla JS,  
  and fluid GSAP micro-animations designed for high engagement and responsiveness across all viewports.                   
                                                                                                                          
  Enterprise-Grade Java Backend: High-security, low-latency API architectures engineered primarily in Java for maximum    
  data protection, role-based access security, and long-term enterprise stability.                                        
                                                                                                                          
  All-in-One Managed Full-Stack Deployments: End-to-end web system delivery featuring complete server setup, free domain  
  mapping (deSEC / custom DNS), zero-downtime SSL, and 3 months of hands-off maintenance (content changes & updates).     
                                                                                                                          
  Interactive Client Portal & Telemetry Hub: Real-time dashboard providing clients with monthly resource limit gauges,   
  daily development progress meters, developer task distributions, estimated delivery timelines, and event calendars.    
                                                                                                                          
  Agentic AI & Meeting Reservation Subsystem: Embedded AI assistance handling automated client inquiries, content update  
  guidance, and automated calendar meeting bookings parsed directly via email & dashboard webhooks.                       
                                                                                                                          
  --------                                                                                                                
                                                                                                                          
  🗂️ Architectural Directory Map                                                                                        
                                                                                                                          
    devcore-studios-platform/                                                                                             
    ├── 🌐 View Templates (HTML)                                                                                           
    │   ├── index.html               # Public Agency Homepage, Hero Core & Glass Navigation                             
    │   ├── services.html            # Service Tiers (Frontend, Java Backend, Full-Stack & Custom Software)                
    │   ├── templates.html           # Pre-Built UI Systems, Custom Portals & Demo Showcase                             
    │   ├── dashboard.html           # Authenticated Client Portal (Analytics, Progress Meters & Calendar)               
    │   ├── settings.html            # Profile Controls, Organization Config & OAuth Settings                           
    │   └── contact.html             # Project Scope Estimator & AI Meeting Reservation Hub                             
    │                                                                                                                     
    ├── ⚙️ Reactive Controllers (JavaScript)                                                                               
    │   ├── main.js                  # Global Router, GSAP Animation Engines & Interactive Handlers                      
    │   ├── auth.js                  # Authentication Subsystem (Google OAuth, Session Guards & Role Sync)                
    │   ├── dashboard.js             # Telemetry Engines (Progress Rates, Developer Hours & Gauge Renderers)             
    │   └── ai-assistant.js          # AI Meeting Booking Handler, Inbound Webhook Parser & Support Chat                 
    │                                                                                                                     
    └── 🎨 Stylesheet Specifications (CSS)                                                                                
        ├── style.css                # Global Glassmorphic Layout Engine, Theme Tokens & CSS Grid Mechanics             
        └── dashboard.css            # Telemetry Gauges, Analytics Layouts & Dark Mode Subsystems                       
                                                                                                                          
  --------                                                                                                                
                                                                                                                          
  💾 Native System & Telemetry Data Schema                                                                               
  The client portal maintains real-time relational telemetry inside the client environment using decoupled storage arrays:
                                                                                                                          
  1. The Global Client & Project Ledger ( devcoreClientDatabase ):                                                        
  Structured client record containing active service tiers, delivery metrics, team activity logs, and milestone states.    
                                                                                                                          
    [                                                                                                                     
      {                                                                                                                   
        "clientId": "client_883912",                                                                                      
        "organization": "Enterprise Client Inc.",                                                                         
        "serviceTier": "Full-Stack Managed Package (Java Backend)",                                                       
        "projectProgressToday": "API Route Hardening & UI Integration",                                                   
        "overallProgressRate": 85,                                                                                        
        "monthlyResourceGauge": "25% Limit Used",                                                                         
        "estimatedLiveDate": "2026-08-15T00:00:00.000Z",                                                                  
        "developerMetrics": {                                                                                             
          "leadEngineer": "Avinash Vyas",                                                                                 
          "hoursLogged": 42                                                                                               
        }                                                                                                                 
      }                                                                                                                   
    ]                                                                                                                     
                                                                                                                          
  2. The Active State Pass ( activeDevCoreSession ):                                                                      
  A secure token string literal holding active organizational context. Controls role-based viewport access to the          
  Client Dashboard and suppresses unauthenticated public guest routes.                                                    
                                                                                                                          
  --------                                                                                                                
                                                                                                                          
  🔄 Lifecycle Logic State Machine                                                                                        
                                                                                                                          
  The corporate interface executes strict data-flow checks on boot to enforce security and access routing:              
                                                                                                                          
        [ Platform Template Boot ]                                                                                        
                   │                                                                                                      
                   ▼                                                                                                      
        ( Fires DOMContentLoaded )                                                                                        
                   │                                                                                                      
                   ▼                                                                                                      
        [ Verify Client DB Health Check ] ──( Missing? )──► [ Initialise Enterprise Schema ]                              
                   │                                                                                                      
                   ▼                                                                                                      
        [ Query activeDevCoreSession Access Token ]                                                                       
                   │                                                                                                      
          ┌────────┴────────┐                                                                                             
       (Valid Token)     (Null / Unauthenticated)                                                                        
          │                 │                                                                                             
          ▼                 ▼                                                                                             
     ┌──────────────────────────┐      ┌──────────────────────────┐                                                       
     │   AUTHENTICATED CLIENT   │      │    PUBLIC GUEST VIEW     │                                                       
     ├──────────────────────────┤      ├──────────────────────────┤                                                       
     │ • Render Client Dashboard│      │ • Show Sign In / Register│                                                       
     │ • Load Telemetry Gauges  │      │ • Hide Telemetry Views   │                                                       
     │ • Display Event Calendar │      │ • Redirect Protected Hub │                                                       
     └──────────────────────────┘      └──────────────────────────┘                                                       
                                                                                                                          
  --------                                                                                                                
                                                                                                                          
  👥 Executive Leadership & Co-Founders                                                                                    
                                                                                                                          
  • Avinash Vyas   │ Founder & Chief Technology Officer (CTO)                                                             
                   │ System Architecture, Technical Specs, Infrastructure & Lead Web Engineering                         
                                                                                                                          
  • Piyush         │ Co-Founder & Chief Strategy Officer (CSO)                                                            
                   │ Business Strategy, Target Market Strategy & Functional Code Execution                                
                                                                                                                          
  • Prachi         │ Co-Founder & Chief Marketing Officer (CMO)                                                           
                   │ Brand Management, LinkedIn Operations & UI/UX Visual Design                                          
                                                                                                                          
  --------                                                                                                                
                                                                                                                          
  🛡️ Enterprise Security & Technical Note                                                                                
                                                                                                                          
  │ [!NOTE]                                                                                                               
  │ Architecture Status: Client-facing web portal frontend with asynchronous backend integrations.                       
  │ Security Standard: Production deployments isolate sensitive business logic and data processing within high-security   
  │ Java server runtimes hosted on Render, protected by SSL/TLS encryption and OAuth 2.0 validation.                     
                                                                                                                          
  --------                                                                                                                
                                                                                                                          
  Status: Active Commercial Production Build                                                                              
  Organisation: DevCore Studios (Web Systems & Software Agency)                                                           
  Compatibility Core: Modern Web Standard Compilers (Chrome V8, WebKit, Gecko, Java Virtual Machine, GSAP)
